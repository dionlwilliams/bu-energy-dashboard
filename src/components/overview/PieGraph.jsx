import { ResponsiveContainer,  PieChart, Pie, Cell, Tooltip, Legend} from "recharts"
import React from 'react'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white bg-opacity-30 p-4 rounded-md shadow">
          <p className="text-sm font-normal text-neutral-900">{payload[0].payload.name}</p>
          <p className="text-base font-light text-neutral-600">{`Energy Used: ${payload[0].value} kWh`}</p>
        </div>
      )
    }
    return null
  }

const COLOURS = ["#6366F1", "#F59E0B", "#10B981", "#9CA3AF"]

const groupEnergyData = (rawData) => {
    const grouped = {
        'Grid Electric': 0,
        'Natural Gas': 0,
        'Renewables': 0,
        'Other': 0
    }

    rawData.forEach(item => {
        if (item.type === 'Grid Electric') {
            grouped['Grid Electric'] += item.kWh
        } else if (item.type ==='Natural Gas') {
            grouped['Natural Gas'] += item.kWh
        } else if (['Solar PV', 'Solar Thermal', 'GSHP', 'ASHP', 'Biomass'].includes(item.type)) {
            grouped['Renewables'] += item.kWh
        } else {
            grouped['Other'] += item.kWh
        }
    })

    return Object.keys(grouped).map(key => ({
        name: key,
        value: grouped[key]
    }))
}

const PieGraph = ({data}) => {
    const groupedData = groupEnergyData(data)

    return ( 
        <div className="w-full h-80">
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                    <Pie
                        data={groupedData} 
                        dataKey={"value"} 
                        nameKey={"type"} 
                        cx={"50%"} 
                        cy={"50%"}
                        labelLine={false}
                        strokeWidth={3}
                        label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {data.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`} 
                            fill={COLOURS[index % COLOURS.length]}
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
            wrapperStyle={{ paddingTop: '20px' }}
          />
                </PieChart>
                </ResponsiveContainer>
                </div>
        
    )
}

export default PieGraph