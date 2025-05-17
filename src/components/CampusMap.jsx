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
      const minEnergy = Math.min(...energyValues)
      const maxEnergy = Math.max(...energyValues)
      const energyRange = maxEnergy - minEnergy

      return {
        ...campusData,
        features: campusData.features.map(feature => {
          const buildingName = feature.properties.name
          const energyUsage = energyLookup[buildingName] || 0
          
          let colourIndex = 0
          if (energyRange > 0) {
            const ratio = (energyUsage - minEnergy) / energyRange
            colourIndex = Math.floor(ratio * 3)
            colourIndex = Math.min(3, Math.max(0, colourIndex))
          }
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
      const energyValues = Object.values(energyLookup)
      const minEnergy = Math.min(...energyValues)
      const maxEnergy = Math.max(...energyValues)

      return (
        <div className='absolute bottom-4 right-4'
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
            mapStyle={"mapbox://styles/dionlou/cmae457b600qq01qyalrd3uof"}
        />
        </DeckGL>
        {renderTooltip()}
        </div>
  )
}

export default CampusMap
