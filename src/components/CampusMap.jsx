import React, { useState, useMemo } from 'react'
import DeckGL from '@deck.gl/react'
import { Map } from 'react-map-gl/mapbox'
import { GeoJsonLayer, TextLayer } from 'deck.gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const tempBuilding = {
    type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Kimmeridge House",
        color: [200, 50, 80, 200]
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-1.8964653295543314, 50.7436429232109],
            [-1.896518983722359, 50.74352490774697],
            [-1.8963765799431371, 50.743498448112575],
            [-1.896404686944436, 50.74343943153846],
            [-1.8963579218031157, 50.743451228835966],
            [-1.8963592756495302, 50.74341040377939],
            [-1.8962505832874967, 50.7434272447596],
            [-1.896124374261234, 50.74328831811937],
            [-1.8960871669551125, 50.7433034188214],
            [-1.8959901578504628, 50.74327797505282],
            [-1.8958070410007792, 50.74333835672488],
            [-1.8958481103325084, 50.74336844496199],
            [-1.8958230155265596, 50.7434264058017],
            [-1.8958803833653235, 50.74343891223154],
            [-1.8958540875229346, 50.74349371396855],
            [-1.8958910545125889, 50.7435019627319],
            [-1.8958738887763218, 50.743536064899644],
            [-1.8964653295543314, 50.7436429232109]
          ]
        ]
      }
    }
  ]
}


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
          data: tempBuilding,
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
          controller={true}
          layers={layers}
          >
        <Map 
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            initialViewState={viewport}
            style={{ width: '100%', height: '100%'}}
            mapStyle={"mapbox://styles/mapbox/light-v11"}
            >
        </Map>
        </DeckGL>
        </div>
  )
}

export default CampusMap
