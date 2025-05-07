const EnergyStatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color = "text-emerald-500"}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col items-center text-center justify-between">
          <div className={`p-3 rounded-lg bg-opacity-10 ${color.replace('text', 'bg')}`}>
            <Icon className={`w-9 h-9 ${color}`} />
          </div>
          <div>
            <h3 className="text-base font-light tracking-wide text-stone-700 mb-1">{title}</h3>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        </div>
      </div>
    )
}

export default EnergyStatCard