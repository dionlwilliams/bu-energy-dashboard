export const calculateRenewablePercentage = (energyData) => {
    const renewableTypes = ["Solar PV", "Biomass", "GSHP", "ASHP", "Solar Thermal"]
    const energyTotal = energyData.reduce((sum, item) => sum + item.kWh, 0)
    const renewableTotal = energyData
        .filter(item => renewableTypes.includes(item.type))
        .reduce((sum, item) => sum + item.kWh, 0)
    console.log((renewableTotal / energyTotal) * 100)
    return (renewableTotal / energyTotal) * 100
}