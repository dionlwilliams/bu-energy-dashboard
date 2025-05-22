import { useMemo } from 'react';

export const useEnergyComparison = (buildingKWh, campusAverage) => {
  return useMemo(() => {
    if (!buildingKWh || !campusAverage) return null
    
    const percentage = ((campusAverage - buildingKWh) / campusAverage * 100).toFixed(1)
    const isBetter = buildingKWh < campusAverage
    const percentageDisplay = Math.abs(percentage)
    
    return {
      percentage: percentageDisplay,
      arrowDirection: isBetter ? 'down' : 'up',
      arrowColor: isBetter ? 'text-green-500' : 'text-red-500',
      comparisonText: isBetter ? ' better' : ' worse'
    }
  }, [buildingKWh, campusAverage])
}