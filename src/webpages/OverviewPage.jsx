import React from 'react'
import LineGraph from '../components/overview/LineGraph'
import PieGraph from '../components/overview/PieGraph'
import BarGraph from '../components/overview/BarGraph'
import overallEnergy from '../tempData/overallEnergy.json'
import overallEnergyTypes from '../tempData/overallEnergyTypes.json';
import overallBuildingEnergy from '../tempData/overallBuildingEnergy.json';

const OverviewPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
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


      <div className='flex-1 flex flex-col p-4'>
      {/* Top Row */}
      <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 pl-8 pb-4 pr-8 pt-4'>
        {/* Energy Use Line Graph Left */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-light tracking-wide mb-4">Total Energy Use</h2>
          <LineGraph data={overallEnergy.yearly}/>
        </div>

        {/* Environmental Impact Stats Right */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-light tracking-wide mb-4 text-center">Our Environmental Impact</h2>
          <div className="space-y-4 flex flex-col items-center">
            <div className="h-12 bg-gray-300 rounded w-3/4"></div> {/* Renewable Energy & Bar */}
            <div className="h-12 bg-gray-300 rounded w-3/4"></div> {/* CO2 Saved */}
            <div className="h-12 bg-gray-300 rounded w-3/4"></div> {/* Tree Equivalent */}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-8 pl-8 pb-4 pr-8 pt-4">
        {/* Campus Energy Pie Chart */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow flex flex-col">
          <h2 className="text-xl font-light tracking-wide mb-4 text-center">What Powers our Campus?</h2>
          <PieGraph data={overallEnergyTypes.yearly}/>
        </div>

        {/* Energy Use by Building */}
        <div className="md:col-span-3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-light tracking-wide mb-4">Energy Use by Building</h2>
          <BarGraph data={
            [...overallBuildingEnergy.yearly.totals].sort((a, b) => b.kWh - a.kWh)
            }/>        
        </div>

      {/* Overall Stats */}
      <div className="space-y-6">
          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className="text-lg font-light tracking-wide">Energy Used This Week</h3>
            <p className="text-gray-600 font-bold">x kWh</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className="text-lg font-light tracking-wide">Average per Building</h3>
            <p className="text-gray-600 font-bold">x kWh/m²</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className="text-lg font-light tracking-wide">Change from Last Week</h3>
            <p className="text-gray-600 font-bold">x% decrease</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default OverviewPage
