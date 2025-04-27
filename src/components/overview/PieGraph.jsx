import { ResponsiveContainer,  PieChart, Pie} from "recharts"
import React from 'react'

const PieGraph = ({data}) => {
    return ( 
            <ResponsiveContainer>
            <PieChart width={730} height={250}>
                <Pie data={data} dataKey={"kWh"} nameKey={"type"} cx={"50%"} cy={"50%"}/>
            </PieChart>
            </ResponsiveContainer>
    )
}

export default PieGraph