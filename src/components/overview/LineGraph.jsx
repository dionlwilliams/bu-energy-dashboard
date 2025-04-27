import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip} from "recharts";
import { motion } from "framer-motion";
import React from 'react'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white bg-opacity-30 p-4 rounded-md shadow">
        <p className="text-sm font-normal text-neutral-900">{label}</p>
        <p className="text-base font-light text-neutral-600">{`Energy Used: ${payload[0].value} kWh`}</p>
      </div>
    );
  }
  return null;
};

const LineGraph = ({data}) => {
  return (
    <div className="h-65">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colourEnergy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.01}/>
            </linearGradient>
          </defs>
          <XAxis dataKey={"month"} tick={{ fill: "#6B7280", fontSize: 12 }} stroke="#CECECE" />
          <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} stroke="#CECECE"/>
            <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#6366F1', strokeWidth: 0.5 }}
            />
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

