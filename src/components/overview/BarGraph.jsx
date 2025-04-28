import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"


const BarGraph = ({data}) => {
    console.log(data)
    return(
        <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
        >
          <XAxis dataKey="building" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "14px",
              color: "#374151",
            }}
          />
          <Bar 
            dataKey="kWh" 
            fill="#6366F1"
            radius={[8, 8, 0, 0]} 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
        </div>
    ) 
}

export default BarGraph