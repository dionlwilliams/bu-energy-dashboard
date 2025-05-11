import React, { useState } from 'react'
import DeckGL from '@deck.gl/react'
import { Map } from 'react-map-gl/mapbox'
import { GeoJsonLayer} from 'deck.gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import campusData from '../tempData/campusMapGeo.json'


const CampusMap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const [hoveredInfo, setHoveredInfo] = useState(null)
  
  const [viewport, setViewport] = useState({
        latitude: 50.742719,
        longitude: -1.895220,
        zoom: 18,
        bearing: 17
    })

    const layers = [
        new GeoJsonLayer({
          id: 'buildings-fill',
          data: campusData,
          filled: true,
          wireframe: false,
          getFillColor: d => d.properties.color,
          getLineColor: [0, 0, 0, 0],
          pickable: true,
          onHover: info => setHoveredInfo(info),
          onClick: info => setSelectedBuilding(info.object),
        }),
        new GeoJsonLayer({
          id: 'selected-building-outline',
          data: selectedBuilding ? {type: 'FeatureCollection', features: [selectedBuilding]} : null,
          filled: false,
          stroked: true,
          getLineColor: [153, 0, 0],
          lineWidthMinPixels: 1,
          pickable: false
        }),
      ]
      
    const renderTooltip = () => {
      const info = hoveredInfo?.object?.properties || selectedBuilding
      if (!info || !hoveredInfo) return null
      
      return (
        <div className='absolute z-10 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg px-2 text-sm py-2' 
        style={{ 
          left: hoveredInfo.x + 10, 
          top: hoveredInfo.y + 10,
          pointerEvents: 'none',
          minWidth: '140px',
          }}
          >

          <div className='relative'> 
            <div className='text-gray-800 font-light'>{info.name}</div>
            <div className='text-gray-600 font-light'>placeholder</div>
          </div>

          <div className='absolute w-3 h-3 left-1/2 bg-white border-b border-r border-gray-200 transform rotate-45 top-full -mt-1.5
          '/>
      
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
            mapStyle={"mapbox://styles/dionlou/cmae457b600qq01qyalrd3uof"}
        />
        </DeckGL>
        {renderTooltip()}
        </div>
  )
}

export default CampusMap
