const MapLegend = ({ colourScale, labels }) => {
  return (
    <div className='absolute bottom-6 right-6 bg-white p-3 rounded-lg shadow-lg min-w-[300px]'>
      <div className='text-lg font-light text-gray-800 mb-1 text-center tracking-wide'>
        Energy Use Intensity
        <div className='text-sm text-gray-600 mt-1'>
          (kWh/m² annually)
        </div>
      </div>

      <div className='flex justify-between text-xs text-gray-500 font-light tracking-wider mb-1 px-0.5'>
        <span>Low</span>
        <span>High</span>
      </div>

      <div className='flex h-4 w-full rounded overflow-hidden'>
        {colourScale.map((colour, index) => (
          <div
            key={index}
            className='flex-1'
            style={{
              backgroundColor: `rgba(${colour.join(',')})`,
              width: `${100 / colourScale.length}%`
            }}
          />
        ))}
      </div>

      <div className='flex justify-between mt-2 text-xs text-gray-600 tracking-wide'>
        {labels.map((label, index) => (
          <span
            key={index}
            className='text-center'
            style={{ width: `${100 / labels.length}%` }}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;