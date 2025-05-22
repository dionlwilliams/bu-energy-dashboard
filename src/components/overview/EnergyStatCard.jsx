const EnergyStatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color = 'text-emerald-500',
    className = ''
  }) => {
    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full ${className}`}>
        <div className='flex flex-col items-center text-center justify-center h-full gap-2'>
          <div className={`p-2 rounded-lg bg-opacity-10 ${color.replace('text', 'bg')}`}>
            <Icon className={`w-9 h-9 ${color}`} />
          </div>
          <div className='flex flex-col justify-center text-center'>
            <h3 className='text-base font-light tracking-wide text-stone-700 mb-1'>{title}</h3>
            <p className='text-xl font-semibold'>{value}</p>
          </div>
        </div>
      </div>
    )
}

export default EnergyStatCard