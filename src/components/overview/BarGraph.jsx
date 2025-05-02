import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white bg-opacity-30 p-4 rounded-md shadow">
        <p className="text-sm font-normal text-neutral-900">{payload[0].payload.fullName}</p>
        <p className="text-base font-light text-neutral-600">{`Energy Used: ${payload[0].value} kWh`}</p>
      </div>
    )
  }
  return null
};

const buildingNameMap = {
  "Christchurch House": "Christchurch",
  "Dorset House": "Dorset",
  "Fusion Building": "Fusion",
  "Kimmeridge House": "Kimmeridge",
  "Poole Gateway": "Poole Gateway",
  "Poole House": "Poole House",
  "SMCL": "SMCL",
  "Student Centre": "Student Centre",
  "Weymouth House": "Weymouth",
}  

const BarGraph = ({data}) => {
  
  const chartData = data.map((item) => ({
    ...item,
    building: buildingNameMap[item.building],
    fullName: item.building,
  }))

    return(
        <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset={"5%"} stopColor="#6366F1" stopOpacity={0.8}/>
              <stop offset={"95%"} stopColor="#6366F1" stopOpacity={0.65}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="building" 
            tick={{ fontSize: 12, fill: "#6B7280", angle: -30, textAnchor: "end"}} 
            stroke="#CECECE" 
            interval={0}
          />
          <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} stroke="#CECECE"/>
          <Tooltip
            content={CustomTooltip}
          />
          <Bar 
            dataKey="kWh" 
            fill="url(#barGradient)"
            radius={[6, 6, 0, 0]} 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
        </div>
    ) 
}

export default BarGraph