const ENERGY_COSTS = {
    "Grid Electric": 0.25,
    "Natural Gas": 0.07,
    "LPG": 0.07,
    "Solar PV": 0.03,
    "Biomass": 0.1,
    "GSHP": 0.24,
    "ASHP": 0.24,
    "Solar Thermal": 0.03
}

export const calculateEnergyConsumption = (buildingData, energyTypeData) => {
    
    const yearlyEnergy = buildingData.totals.reduce(
        (sum, item) => sum + item.kWhPerSqm, 0
    )

    const averagePerBuilding = yearlyEnergy / buildingData.totals.length

    const estimatedCost = energyTypeData.reduce((sum, item) => {
        const rate = ENERGY_COSTS[item.type] || 0
        return sum + (item.kWh * rate)
    }, 0)

    return {
        yearlyEnergy: `${(yearlyEnergy).toLocaleString()} kWh/m²`,
        averagePerBuilding: `${Math.round(averagePerBuilding).toLocaleString()} kWh/m²`,
        estimatedCost: `£${Math.round(estimatedCost).toLocaleString()}`
    }
}