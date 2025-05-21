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
import { Zap, PieChart, Cloud, Home } from 'lucide-react'

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
        headerContent={
          normalisedDetails && (
            <div className='flex items-start justify-between gap-4 flex-1'>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-3'>
                  <span className='
                    flex items-center justify-center 
                    w-10 h-10 rounded-full 
                  bg-indigo-300 text-indigo-800
                    text-base font-semibold
                    '>
                      A+
                  </span>  
                  <h2 className='text-xl font-light tracking-wide text-stone-700'>
                    {selectedBuilding?.properties?.name}
                  </h2>
              </div>
              <p className='text-sm text-gray-500 tracking-wider'>
                Based on annual energy usage (kWh/m²)
              </p>
            </div>
          </div>
          ) 
        }
        >
        
        {normalisedDetails && (
          <div className='flex flex-col gap-6 text-gray-800 text-sm'>
            
            <div className='bg-gray-50 rounded-lg p-2 shadow-sm flex flex-col items-center'>
              <div className='flex items-center gap-2 mb-2 align-middle'>
                <Zap size={25} className='text-yellow-400' />
                <h3 className="text-md font-light text-xl tracking-wide mb-2">Yearly Energy Usage</h3>
              </div>
              
              <LineGraph data={normalisedDetails.monthlyUsage} />

              <div className='w-full mt-2 flex justify-center'>
                <div className='relative h-5 w-6/8 bg-gray-200 rounded-full overflow-hidden mx-auto'>
                  <div 
                  className='absolute h-full bg-yellow-400 rounded-full transition-all duration-300' 
                  style={{ width: '7%'}}
                  />
                </div>
              </div>
    
              <p className='mt-2 text-gray-600 text-lg'>
                <span className='font-medium text-gray-800 '>X%</span> less than campus average
              </p>
            </div>

           

            <div className='bg-gray-50 rounded-lg p-2 shadow-sm flex flex-col items-center'>
              <div className='flex items-center gap-2 mb-2'>
                <PieChart size={25} className='text-indigo-500' />
                <h3 className='text-md font-light text-xl tracking-wide mb-2'>Energy Breakdown</h3>
              </div>

              <PieGraph data={normalisedDetails.energySources} />
            </div>

              <div className='grid grid-cols-2 gap-4 w-full'>
                <div className='bg-gray-50 rounded-lg p-3 flex flex-col items-center shadow-sm'>
                  <Cloud className='text-gray-400 mb-1' size={22} />
                  <p className='font-bold text-base text-gray-700'>X kg</p>
                  <p className='text-gray-500 text-[11px]'>CO₂ / year</p>
                </div>
                <div className='bg-gray-50 rounded-lg p-3 flex flex-col items-center shadow-sm'>
                  <Home className='text-gray-400 mb-1' size={22} />
                  <p className='font-bold text-base text-gray-700'>27</p>
                  <p className='text-gray-500 text-[11px]'>UK homes / year</p>
                </div>
              </div>
            </div>
          
        )}
        </SlidePanel>
      </div>
  )
}

export default CampusMap
