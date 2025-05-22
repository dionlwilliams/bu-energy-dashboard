import { useMemo, useState, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { Map } from 'react-map-gl/mapbox'
import { GeoJsonLayer, WebMercatorViewport} from 'deck.gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import campusData from '../tempData/campusMapGeo.json'
import buildingDetailsData from '../tempData/yearlyBuildingDetails.json'
import { normaliseDataset } from '../utils/energyConversion'
import BuildingTooltip from './BuildingTooltip'
import { calculateEnvironmentalImpact } from '../utils/environmentalImpact'
import BuildingDetailsPanel from './buildingDetails/BuildingDetailsPanel'
import MapLegend from './map/MapLegend'

const CampusMap = ({buildingData}) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const [hoveredInfo, setHoveredInfo] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState(null)
  const [selectedTooltipPos, setSelectedTooltipPos] = useState(null)

  const [viewport, setViewport] = useState({
        latitude: 50.742719,
        longitude: -1.895220,
        zoom: 17.5,
        bearing: 17
    })

  const COLOUR_SCALE = [
    [200, 201, 225, 255],
    [150, 152, 215, 255],
    [100, 103, 205, 255],
    [70, 73, 195, 255]
  ]

  const buildingDetails = selectedBuilding
    ? buildingDetailsData.find(b => b.name === selectedBuilding.properties.name)
    : null

  const normalisedDetails = buildingDetails ? {
    ...buildingDetails,
    monthlyUsage: normaliseDataset(
      buildingDetails.monthlyUsage.map(item => ({...item, building: buildingDetails.name})),
      'building'
    ),
    energySources: normaliseDataset(
      buildingDetails.energySources.map(item => ({ ...item, building: buildingDetails.name})),
      'building'
    ),
    environmentalImpact: calculateEnvironmentalImpact(buildingDetails.energySources)
  } : null

  const energyLookup = useMemo(() => {
    if (!buildingData?.totals) {
      console.log(buildingData)
      return {}
    }

    return buildingData.totals.reduce((acc, item) => {
      acc[item.building] = item.kWhPerSqm
      return acc
    }, {})
  }, [buildingData])

  const processedCampusData = useMemo(() => {
    if (!campusData?.features) return null

    return {
      ...campusData,
      features: campusData.features.map(feature => {
        const buildingName = feature.properties.name
        const energyUsage = energyLookup[buildingName] || 0
          
        let colourIndex = 0
        if (energyUsage <= 150) colourIndex = 0
        else if (energyUsage <= 180) colourIndex = 1
        else if (energyUsage <= 210) colourIndex = 2
        else colourIndex = 3
        return {
          ...feature,
          properties: {
            ...feature.properties,
            kWh: energyUsage,
            color: COLOUR_SCALE[colourIndex]
          },
        }
      }),
    }
  }, [campusData, energyLookup])

  const campusAverage = useMemo(() => {
  if (!buildingData?.totals?.length) return 0;
  return buildingData.totals.reduce((sum, item) => sum + item.kWhPerSqm, 0) / 
         buildingData.totals.length;
}, [buildingData]);

  useEffect(() => {
  if (!selectedBuilding && hoveredInfo?.object) {
    const viewportInstance = new WebMercatorViewport({
      width: window.innerWidth,
      height: window.innerHeight,
      ...viewport
    })
    const [longitude, latitude] = hoveredInfo.object.properties.tooltipAnchor
    const [x, y] = viewportInstance.project([longitude, latitude])
    setTooltipPosition({ x, y })
  } else {
    setTooltipPosition(null)
  }
}, [hoveredInfo, viewport, selectedBuilding]) 

useEffect(() => {
  if (selectedBuilding) {
    const viewportInstance = new WebMercatorViewport({
      width: window.innerWidth,
      height: window.innerHeight,
      ...viewport
    })
    const [longitude, latitude] = selectedBuilding.properties.tooltipAnchor
    const [x, y] = viewportInstance.project([longitude, latitude])
    setSelectedTooltipPos({ x, y })
  } else {
    setSelectedTooltipPos(null);
  }
}, [selectedBuilding, viewport])

  const layers = [
      new GeoJsonLayer({
        id: 'buildings-fill',
        data: processedCampusData,
        filled: true,
        wireframe: false,
        getLineColor: [0, 0, 0, 0],
        getFillColor: d => d.properties.color,
        pickable: true,
        onHover: info => {
          if (!selectedBuilding) {
            setHoveredInfo(info.object ? info : null)
            } else {
              setHoveredInfo(null)
            }
          },
        onClick: info => {
          if (selectedBuilding?.properties.name === info.object?.properties.name) {
            setSelectedBuilding(null)
            setSelectedTooltipPos(null)
          } else {
            setSelectedBuilding(info.object)
          }
        },
      }),
      new GeoJsonLayer({
        id: 'selected-building-outline',
        data: selectedBuilding ? {type: 'FeatureCollection', features: [selectedBuilding]} : null,
        filled: false,
        stroked: true,
        getLineColor: d => {
          const [r, g, b] = d.properties.color
          return [r - 30, g - 30, b - 30]
        },
        lineWidthMinPixels: 1,
        pickable: false
      }),
    ]
      
  const renderLegend = () => {
    const rangeLabels = [
      '120-150',
      '151-180',
      '181-210',
      '211-250'
    ];

  return (
    <MapLegend colourScale={COLOUR_SCALE} labels={rangeLabels} />
  )}
  
  return (
      <div className='w-full h-screen' style={{ position: 'relative'}}>
        <DeckGL
        initialViewState={viewport}
        layers={layers}
        onViewStateChange={({ viewState }) => setViewport(viewState)}
        controller={true}
        >
      <Map 
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          style={{ width: '100%', height: '100%'}}
          mapStyle={'mapbox://styles/dionlou/cmae457b600qq01qyalrd3uof'}
      >
      </Map>
      </DeckGL>
      {tooltipPosition && !selectedBuilding && (
        <div 
          className='absolute pointer-events-none'
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            zIndex: 900
          }}
        >
          <BuildingTooltip building={hoveredInfo?.object} />
        </div>
      )}

      {selectedTooltipPos && selectedBuilding && (
        <div 
          className='absolute pointer-events-none'
          style={{
            left: `${selectedTooltipPos.x}px`,
            top: `${selectedTooltipPos.y}px`,
            zIndex: 900
          }}
        >
          <BuildingTooltip building={selectedBuilding} />
        </div>
      )}

        {renderLegend()}
        <BuildingDetailsPanel
        selectedBuilding={selectedBuilding}
        normalisedDetails={normalisedDetails}
        campusAverage={campusAverage}
        onClose={() => setSelectedBuilding(null)}
        colourScale={COLOUR_SCALE}
        />
      </div>
  )
}

export default CampusMap
