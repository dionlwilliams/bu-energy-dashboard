export const calculateEnvironmentalImpact = (energyData) => {

    const RENEWABLE__TYPES = ["Solar PV", "Biomass", "GSHP", "ASHP", "Solar Thermal"]
    const NON_RENEWABLE_TYPES = {
        "Grid Electric": 0.23,
        "Natural Gas": 0.18,
        "LPG": 0.21
    }

    const TREE_CO2_SEQUESTRATION = 22

    const CAR_CO2_PER_YEAR = 1400

    let renewableEnergy = 0
    let nonRenewableEmissions = 0
    let totalEnergy = 0

    energyData.forEach(item => {
        totalEnergy += item.kWh
        if (RENEWABLE__TYPES.includes(item.type)) {
            renewableEnergy += item.kWh
        } else if (NON_RENEWABLE_TYPES[item.type]) {
            nonRenewableEmissions += item.kWh * NON_RENEWABLE_TYPES[item.type]
        }
    })

    const co2Saved = renewableEnergy * 0.23

    return {
        renewablePercentage: (renewableEnergy / totalEnergy * 100).toFixed(0),
        co2Saved: Math.round(co2Saved).toLocaleString(),
        treeEquivalents: Math.round(co2Saved / TREE_CO2_SEQUESTRATION).toLocaleString(),
        co2Emissions : Math.round(nonRenewableEmissions).toLocaleString(),
        carEquivalents: Math.round(nonRenewableEmissions / CAR_CO2_PER_YEAR)
    }
}