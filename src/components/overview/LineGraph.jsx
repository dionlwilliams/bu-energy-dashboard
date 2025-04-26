import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip} from "recharts";
import { motion } from "framer-motion";
import overallEnergyData from '../../tempData/overallEnergy.json';
import React from 'react'

const LineGraph = () => {
  return (
    <div className="h-80 ">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart data={overallEnergyData.yearly}>
          <defs>
            <linearGradient id="colourEnergy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#8884d8" stopOpacity={0.6}/>
            <stop offset="90%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey={"month"} tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip/>
              <Area 
                type={'monotone'}
                dataKey={'kWh'}
                stroke="#6366F1"
                fill={"url(#colourEnergy"}
                fillOpacity={1}
              />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineGraph

