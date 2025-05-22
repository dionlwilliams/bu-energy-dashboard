import { ArrowDown, ArrowUp } from 'lucide-react'
import { useEnergyComparison } from '../../hooks/useEnergyComparison'

const EnergyComparisonDisplay = ({ buildingKWh, campusAverage }) => {
  const comparison = useEnergyComparison(buildingKWh, campusAverage)

  if (!comparison) return null;

  return (
    <p className='mt-2 mb-2 text-gray-700 text-sm flex items-center gap-1 justify-center'>
      {comparison.arrowDirection === 'down' ? (
        <ArrowDown className={`${comparison.arrowColor} w-5 h-5`} />
      ) : (
        <ArrowUp className={`${comparison.arrowColor} w-5 h-5`} />
      )}
      <span className='font-light text-base tracking-wide'>
        <span className='font-semibold text-gray-800'>
          {comparison.percentage}% 
        </span> 
        {comparison.comparisonText} than campus average
      </span>
    </p>
  )
}

export default EnergyComparisonDisplay;