import React from 'react'
import CampusMap from '../components/CampusMap'
import overallBuildingEnergy from '../tempData/overallBuildingEnergy.json'

const MapPage = () => {
  return (
    <CampusMap buildingData={overallBuildingEnergy.yearly}>
      
    </CampusMap>
  )
}

export default MapPage
