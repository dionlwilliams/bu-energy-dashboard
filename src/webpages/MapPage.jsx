import React from 'react'
import CampusMap from '../components/CampusMap'
import overallBuildingEnergy from '../tempData/overallBuildingEnergy.json'
import { normaliseEnergyData } from '../utils/energyConversion'

const processedBuildingEnergy = {
  yearly: {
    totals: overallBuildingEnergy.yearly.totals.map(building =>
      normaliseEnergyData(building, 'building'))
  }
}

const MapPage = () => {
  return (
    <CampusMap buildingData={processedBuildingEnergy.yearly}>
      
    </CampusMap>
  )
}

export default MapPage
