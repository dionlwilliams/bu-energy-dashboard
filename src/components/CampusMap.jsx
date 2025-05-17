import React, { use, useMemo, useState } from 'react'
import DeckGL from '@deck.gl/react'
import { Map } from 'react-map-gl/mapbox'
import { GeoJsonLayer, WebMercatorViewport} from 'deck.gl'
import { centroid } from '@turf/turf'
import 'mapbox-gl/dist/mapbox-gl.css'
import campusData from '../tempData/campusMapGeo.json'

const CampusMap = ({buildingData}) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const [hoveredInfo, setHoveredInfo] = useState(null)

  const COLOUR_SCALE = [
    [224, 225, 251, 255],
    [176, 178, 247, 255],
    [134, 137, 244, 255], 
    [99, 102, 241, 255]   
  ]

  
  const [viewport, setViewport] = useState({
        latitude: 50.742719,
        longitude: -1.895220,
        zoom: 17.5,
        bearing: 17
    })

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

      const energyValues = Object.values(energyLookup)
      const rawMin = Math.min(...energyValues)
      const rawMax = Math.max(...energyValues)

      const minEnergy = Math.floor(rawMin / 10) * 10
      const maxEnergy = Math.ceil(rawMax / 10) * 10
      const energyRange = maxEnergy - minEnergy

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
            if (info.object) {
              const center = centroid(info.object)
              const coords = center.geometry.coordinates
              
              const viewport = new WebMercatorViewport({
                width: window.innerWidth,
                height: window.innerHeight,
                ...info.viewState
              })

              const [x, y] = viewport.project(coords)

              setHoveredInfo({
                object: info.object, 
                x, 
                y })
            } else {
              setHoveredInfo(null)
            }
          },
          onClick: info => setSelectedBuilding(info.object),
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
      
    const renderTooltip = () => {
      const info = hoveredInfo?.object?.properties || selectedBuilding?.properties
      if (!info || !hoveredInfo) return null
      
      return (
        <div className='absolute z-10 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg px-2 text-sm py-2' 
        style={{ 
          left: hoveredInfo.x, 
          top: hoveredInfo.y,
          transform: 'translate(-50%, -100%)',
          pointerEvents: 'none',
          minWidth: '140px',
          }}
          >

          <div className='relative'> 
            <div className='text-gray-800 font-light'>{info.name}</div>
            <div className='text-gray-600 font-light'>{`${info.kWh?.toLocaleString()} kWh/m²`}</div>
          </div>

          <div className='absolute w-3 h-3 left-1/2 bg-white border-b border-r border-gray-200 transform rotate-45 top-full -mt-1.5
          '/>
      
        </div>
      )
    }

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
      (kWh/m² annually)
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
      )
    }
  
    return (
        <div className='w-full h-screen ' style={{ position: 'relative'}}>
          <DeckGL
          initialViewState={viewport}
          layers={layers}
          controller={true}
          >
        <Map 
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            style={{ width: '100%', height: '100%'}}
            mapStyle={'mapbox://styles/dionlou/cmae457b600qq01qyalrd3uof'}
        />
        </DeckGL>
        {renderTooltip()}
        {renderLegend()}
        </div>
  )
}

export default CampusMap
