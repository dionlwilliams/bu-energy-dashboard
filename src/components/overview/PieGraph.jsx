import { ResponsiveContainer,  PieChart, Pie, Cell, Tooltip, Legend} from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white bg-opacity-30 p-4 rounded-md shadow">
          <p className="text-sm font-normal text-neutral-900">{payload[0].payload.name}</p>
          <p className="text-base font-light text-neutral-600">{`Energy Used: ${payload[0].value} kWh/m²`}</p>
        </div>
      )
    }
    return null
  }

const COLOUR_MAP = {
    'Grid Electric': '#6366F1', 
    'Natural Gas': '#F59E0B', 
    'Renewables': '#10B981',
    'Other': '#9CA3AF'
}

const groupEnergyData = (rawData) => {
    const grouped = {
        'Grid Electric': 0,
        'Natural Gas': 0,
        'Renewables': 0,
        'Other': 0
    }

    rawData.forEach(item => {
        if (item.type === 'Grid Electric') {
            grouped['Grid Electric'] += item.kWhPerSqm
        } else if (item.type ==='Natural Gas') {
            grouped['Natural Gas'] += item.kWhPerSqm
        } else if (['Solar PV', 'Solar Thermal', 'GSHP', 'ASHP', 'Biomass'].includes(item.type)) {
            grouped['Renewables'] += item.kWhPerSqm
        } else {
            grouped['Other'] += item.kWhPerSqm
        }
    })

    return Object.entries(grouped).map(([name, value]) => ({
        name,
        value,
        color: COLOUR_MAP[name] || '9CA3AF'
    }))
}

const PieGraph = ({data}) => {
    const groupedData = groupEnergyData(data)
    const total = groupedData.reduce((sum, item) => sum + item.value, 0)

    return ( 
        <div className="w-full h-[28vh] min-h-[250px] relative">
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart margin={{ top: 5, right: 15, left: 10, bottom: 20 }}>
                    <Pie
                        data={groupedData} 
                        dataKey={"value"} 
                        nameKey={"name"} 
                        cx={"50%"} 
                        cy={"50%"}
                        outerRadius={"80%"}
                        labelLine={false}
                        strokeWidth={3}
                        label={({ percent }) => {
                            const percentage = percent * 100
                            return percentage >= 1 ? `${(percent * 100).toFixed(0)}%` : ''
                        }}
                    >
                        {groupedData.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            style={{outline: 'none'}}
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} 
                    />
                    <Legend 
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ 
                        paddingTop: '10px',
                        bottom: '10px',
                        fontSize: '0.9rem'
                    }}
                    iconSize={12}
                    payload={groupedData.filter(item => {
                        const percentage = (item.value / total) * 100
                        return percentage >= 1
                    }).map(item => ({
                        id: item.name,
                        value: item.name,
                        color: item.color
                    }))}
                    formatter={(value) => (
                        <span className="text-lg font-normal">{value}</span>
                    )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>     
    )
}

export default PieGraph