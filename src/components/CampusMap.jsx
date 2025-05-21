import { useMemo, useState, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { Map } from 'react-map-gl/mapbox'
import { GeoJsonLayer, WebMercatorViewport} from 'deck.gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import campusData from '../tempData/campusMapGeo.json'
import buildingDetailsData from '../tempData/yearlyBuildingDetails.json'
import { SlidePanel } from './SlidePanel'
import LineGraph from '../components/overview/LineGraph'
import PieGraph from '../components/overview/PieGraph'
import { normaliseDataset } from '../utils/energyConversion'
import BuildingTooltip from './BuildingTooltip'

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
    )
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
    
  useEffect(() => {
  if (!selectedBuilding && hoveredInfo?.object) {
    const viewportInstance = new WebMercatorViewport({
      width: window.innerWidth,
      height: window.innerHeight,
      ...viewport
    })
    const [longitude, latitude] = hoveredInfo.object.properties.tooltipAnchor
    const [x, y] = viewportInstance.project([longitude, latitude])
    setTooltipPosition({ x, y });
  } else {
    setTooltipPosition(null);
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
    <div className='absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg min-w-[300px]'>
      <div className='text-lg font-light text-gray-800 mb-2 text-center tracking-wide'>
        Energy Use Intensity
        <div className='text-sm text-gray-600 mt-1'>
            kWh/m² annually)
        </div>
      </div>

      <div className='flex h-4 w-full rounded overflow-hidden'>
        {COLOUR_SCALE.map((color, index) => (
          <div
            key={index}
            className='flex-1'
            style={{
              backgroundColor: `rgba(${color.join(',')})`,
              width: `${100 / COLOUR_SCALE.length}%`
            }}
          />
        ))}
      </div>
        
      <div className='flex justify-between mt-2 text-xs text-gray-600 tracking-wide'>
        {rangeLabels.map((label, index) => (
          <span
          key={index}
          className='text-center'
          style={{
            width: `${100 / COLOUR_SCALE.length}%`}}>
            {label}
          </span>
        ))}
      </div>
  </div>
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
        <SlidePanel
        isOpen={!!selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
        >
          {normalisedDetails && (
            <div className='space-y-6'>
              <div className='flex items-center gap-2'>
                <span className='inline-block px-3 py-1 text-xs font-normal bg-green-100 text-green-700 rounded-full'>
                  Efficient
                </span>
                <span className='text-sm text-gray-500'>
                  Based on kWh/m²
                </span>
              </div>

              <LineGraph data={normalisedDetails.monthlyUsage} />
              <PieGraph data={normalisedDetails.energySources} />
            <div/>
            </div>
          )}
        </SlidePanel>
        </div>
  )
}

export default CampusMap
