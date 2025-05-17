import buildingGIA from '../tempData/buildingGIA.json'

export const normaliseEnergyData = (data, context = 'campus') => {
    const gia = context === 'campus'
    ? buildingGIA.campus['Talbot Campus']
    : buildingGIA.buildings[data.building] || 1

    return {
        ...data,
        kWhPerSqm: Math.floor(data.kWh / gia)

    }
}

export const normaliseDataset = (dataset, context = 'campus') => {
    return dataset.map(item => normaliseEnergyData(item, context))
}