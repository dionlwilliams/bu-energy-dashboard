import SlidePanel from "../SlidePanel"
import { Zap, PieChart, Cloud, CarFront } from 'lucide-react'
import LineGraph from "../overview/LineGraph"
import PieGraph from "../overview/PieGraph"
import EfficiencyBadge from "./EfficiencyBadge"
import EnergyComparisonDisplay from "./AverageComparison"

const BuildingDetailsPanel = ({
  selectedBuilding,
  normalisedDetails,
  campusAverage,
  onClose,
  colourScale
}) => {
  if (!selectedBuilding || !normalisedDetails) return null

  return (
    <SlidePanel
      isOpen={!!selectedBuilding}
      onClose={onClose}
      headerContent={
        <div className='flex items-start justify-between gap-4 flex-1'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-3'>
              <EfficiencyBadge 
                kWh={selectedBuilding?.properties?.kWh}
                COLOUR_SCALE={colourScale}
              />
              <h2 className='text-xl font-light tracking-wide text-stone-700'>
                {selectedBuilding?.properties?.name}
              </h2>
            </div>
            <p className='text-sm text-gray-500 tracking-wider'>
              Based on annual energy usage (kWh/m²)
            </p>
          </div>
        </div>
      }
    >
      <div className='flex flex-col gap-6 text-gray-800 text-sm'>
        
        <div className='bg-gray-50 rounded-lg p-2 shadow-sm flex flex-col items-center'>
          <div className='flex items-center gap-2 mb-2 align-middle'>
            <Zap size={25} className='text-yellow-400' />
            <h3 className="text-md font-light text-xl tracking-wide mb-2">
              Yearly Energy Usage
            </h3>
          </div>
          
          <LineGraph data={normalisedDetails.monthlyUsage} />

          {selectedBuilding?.properties?.kWh && (
            <EnergyComparisonDisplay 
              buildingKWh={selectedBuilding.properties.kWh}
              campusAverage={campusAverage}
            />
          )}
        </div>

        <div className='bg-gray-50 rounded-lg p-2 shadow-sm flex flex-col items-center'>
          <div className='flex items-center gap-2 mb-2'>
            <PieChart size={25} className='text-indigo-500' />
            <h3 className='text-md font-light text-xl tracking-wide mb-2'>
              Energy Breakdown
            </h3>
          </div>
          <PieGraph data={normalisedDetails.energySources} />
        </div>

        <div className='grid grid-cols-2 gap-4 w-full'>
          <div className='bg-gray-50 rounded-lg p-3 flex flex-col items-center shadow-sm'>
            <Cloud className='text-gray-400 mb-1' size={22} />
            <p className='font-bold text-base text-gray-700'>
              {normalisedDetails.environmentalImpact.co2Emissions} kg
            </p>
            <p className='text-gray-500 text-[11px]'>CO₂ / year</p>
          </div>
          <div className='bg-gray-50 rounded-lg p-3 flex flex-col items-center text-center shadow-sm'>
            <CarFront className='text-gray-400 mb-1' size={22} /> 
            <p className='text-gray-500 text-xs'>
              Equivalent to driving <br/>
              <span className='font-bold text-base text-gray-700'>
                {normalisedDetails.environmentalImpact.carEquivalents}
              </span> cars for 1 year
            </p>
          </div>
        </div>
      </div>
    </SlidePanel>
  )
}

export default BuildingDetailsPanel