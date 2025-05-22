import Leaderboard from "../components/Leaderboard"
import {  normaliseEnergyData } from '../utils/energyConversion'
import overallBuildingEnergy from '../tempData/overallBuildingEnergy.json'

const LeaderboardPage = () => {
  
const processedBuildingEnergy = {
  yearly: {
    totals: overallBuildingEnergy.yearly.totals.map(building =>
      normaliseEnergyData(building, 'building'))
  }
}

  return (
    <div className='flex-1'>
    <Leaderboard 
    buildingData={[...processedBuildingEnergy.yearly.totals].sort((a, b) => a.kWhPerSqm - b.kWhPerSqm)}/>
  
    </div>
  )
}

export default LeaderboardPage
