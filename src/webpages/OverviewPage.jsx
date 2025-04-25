import React from 'react'

const OverviewPage = () => {
  return (
    <div className='flex flex-col min-h-screen overflow-auto relative z-10'>
      {/* Heading Bar */}
      <div className='w-full mx-auto h-32 py-4 px-4 grid grid-cols-[2fr_1fr] gap-4'>
        {/* Title */}
        <div className='flex flex-col justify-center m-4'>
          <h1 className='text-4xl font-light text-neutral-800 tracking-wider'>Talbot Campus Energy Overview</h1>
          <p className='mt-2 font-light text-xl text-neutral-700 tracking-wide'>
            Measured in kWh per square meter (kWh/m²)
          </p>
        </div>
        {/* Time Toggle */}
        <div className='' />
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-8">
        {/* Energy Use Line Graph Left */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-light tracking-wide mb-4">Energy Use by Floor Area</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 m-8">
        {/* Campus Energy Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <h2 className="text-xl font-light tracking-wide mb-4 text-center">What Powers our Campus?</h2>
        </div>

        {/* Energy Use by Building */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-light tracking-wide mb-4">Energy Use by Building</h2>
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
  )
}

export default OverviewPage
