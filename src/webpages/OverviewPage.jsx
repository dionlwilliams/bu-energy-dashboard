import React from 'react'
import LineGraph from '../components/overview/LineGraph'
import PieGraph from '../components/overview/PieGraph'
import BarGraph from '../components/overview/BarGraph'
import overallEnergy from '../tempData/overallEnergy.json'
import overallEnergyTypes from '../tempData/overallEnergyTypes.json';
import overallBuildingEnergy from '../tempData/overallBuildingEnergy.json'
import { calculateEnvironmentalImpact } from '../utils/environmentalImpact'
import { calculateEnergyConsumption } from '../utils/energyConsumption'
import EnvironmentalImpactCard from '../components/overview/EnvironmentalImpactCard'
import EnergyStatCard from '../components/overview/EnergyStatCard'
import { Zap, School, Coins } from 'lucide-react'
import { normaliseDataset, normaliseEnergyData } from '../utils/energyConversion'

const processedEnergyData = {
  yearly: normaliseDataset(overallEnergy.yearly, 'campus')
}

const processedEnergyTypes = {
  yearly: normaliseDataset(overallEnergyTypes.yearly, 'campus')
}

const processedBuildingEnergy = {
  yearly: {
    totals: overallBuildingEnergy.yearly.totals.map(building =>
      normaliseEnergyData(building, 'building'))
  }
}

const environmentalImpact = calculateEnvironmentalImpact(overallEnergyTypes.yearly)
const energyStats = calculateEnergyConsumption(processedBuildingEnergy.yearly, processedEnergyTypes.yearly)

const OverviewPage = () => {
  console.log(processedEnergyData)
  console.log(processedBuildingEnergy)
  console.log(processedEnergyTypes)
  return (
    <div className='flex-1 flex flex-col overflow-auto relative z-10'>
      {/* Heading Bar */}
      <div className='w-full mx-auto h-32 py-4 px-4 grid grid-cols-[2fr_1fr] gap-4'>
        {/* Title */}
        <div className='flex flex-col justify-center m-4'> 
          <h1 className='text-4xl font-light text-neutral-800 tracking-wider'>Talbot Campus Energy Overview</h1>
          <p className='m-2 font-light text-xl text-neutral-700 tracking-wide'>
            Measured in kWh per square meter (kWh/m²)
          </p>
        </div>
        {/* Time Toggle */}
        <div className='' />
      </div>


      <div className='flex-grow flex flex-col p-4 h-full'>
      {/* Top Row */}
      <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 pl-8 pb-4 pr-8 pt-4'>
        {/* Energy Use Line Graph Left */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow ">
          <h2 className="text-xl font-light tracking-wide mb-4 ml-2">Total Energy Use</h2>
          <div className='flex-1 min-h-0 relative'>
          <LineGraph data={processedEnergyData.yearly}/>
          </div>
        </div>

        {/* Environmental Impact Stats Right */}
        
        <EnvironmentalImpactCard environmentalImpact={environmentalImpact} />
      </div>
      {/* Bottom Row */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-8 pl-8 pb-4 pr-8 pt-4">
        {/* Campus Energy Pie Chart */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow flex flex-col">
          <h2 className="text-xl font-light tracking-wide mb-4 text-center">What Powers our Campus?</h2>
          <div className='flex-1 min-h-0 relative'>
          <PieGraph data={processedEnergyTypes.yearly}/>
          </div>
        </div>

        {/* Energy Use by Building */}
        <div className="md:col-span-3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-light tracking-wide mb-4 ml-2">Energy Use by Building</h2>
          <BarGraph data={
            [...processedBuildingEnergy.yearly.totals].sort((a, b) => b.kWhPerSqm - a.kWhPerSqm)
            }/>        
        </div>

      {/* Overall Stats */}
      <div className="space-y-4 flex flex-col">
          <EnergyStatCard
            title="Energy Used This Year"
            value={energyStats.yearlyEnergy}
            icon={Zap}
            color={"text-yellow-300"}
          />
          <EnergyStatCard
            title="Average Energy Use Per Building"
            value={energyStats.averagePerBuilding}
            icon={School}
            color={"text-indigo-500"}
          />
          <EnergyStatCard
            title="Estimated Energy Cost This Year"
            value={energyStats.estimatedCost}
            icon={Coins}
            color={"text-emerald-500"}
            />
        </div>
      </div>
    </div>
  </div>

  )
}

export default OverviewPage
