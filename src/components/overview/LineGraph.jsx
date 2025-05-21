import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip} from "recharts";

const formatDate = (monthYear) => {
  const [year, month] = monthYear.split('-');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month) - 1]} ${year.slice(-2)}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white bg-opacity-30 p-4 rounded-md shadow">
        <p className="text-sm font-normal text-neutral-900">{formatDate(label)}</p>
        <p className="text-base font-light text-neutral-600">{`Energy Used: ${payload[0].value} kWh/m²`}</p>
      </div>
    )
  }
  return null
}

const LineGraph = ({data}) => {

  return (
    <div className="w-full h-[33vh] min-h-[250px] relative">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart 
          data={data} 
          margin={{ top: 20, right: 15, left: 15, bottom: 15 }}
        >
          <defs>
            <linearGradient id="colourEnergy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.01}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey={"month"} 
            tick={{ 
              fill: "#6B7280", 
              fontSize: 11,
              dy: 3,
              dx: -2
            }} 
            stroke="#CECECE" 
            tickFormatter={formatDate}
            
          />
          <YAxis 
            tick={{ 
              fill: "#6B7280", 
              fontSize: 12 
            }} 
            stroke="#CECECE"
            width={35}
            tickCount={5}
            label = {{
              value: "kWh/m²",
              angle: -90,
              position: "left",
              offset: 5,
              style: {
                textAnchor: "middle",
                fontSize: 14,
                fill: "#4B5563"
              }
            }}
          />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ 
                stroke: '#6366F1', 
                strokeWidth: 0.5
              }}
              offset={5}
            />
              <Area 
                type={'monotone'}
                dataKey={'kWhPerSqm'}
                stroke="#6366F1"
                fill={"url(#colourEnergy)"}
                fillOpacity={1}
              />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineGraph

