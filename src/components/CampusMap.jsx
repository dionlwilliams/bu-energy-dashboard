import React, { useState, useMemo } from 'react'
import DeckGL from '@deck.gl/react'
import { Map } from 'react-map-gl/mapbox'
import { GeoJsonLayer, TextLayer } from 'deck.gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import campusData from '../tempData/campusMapGeo.json'

const CampusMap = () => {
    const [viewport, setViewport] = useState({
        latitude: 50.742719,
        longitude: -1.895220,
        zoom: 18,
        bearing: 17
    })

    const layers = useMemo(() => [
        new GeoJsonLayer({
          id: 'temp-building',
          data: campusData,
          filled: true,
          wireframe: false,
          getFillColor: d => d.properties.color,
          getLineColor: [0, 0, 0, 0],
          pickable: true,
          material: {
            ambient: 0.4, 
            diffuse: 0.6
          },
          transitions: {
            getFillColor: 1000
          }
        })
      ], []);
  
    return (
        <div className='w-full h-screen'>
          <DeckGL
          initialViewState={viewport}
          layers={layers}
          controller={true}
          >
        <Map 
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            style={{ width: '100%', height: '100%'}}
            mapStyle={"mapbox://styles/mapbox/light-v11"}
            >
        </Map>
        </DeckGL>
        </div>
  )
}

export default CampusMap
