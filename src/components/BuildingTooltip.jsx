import { MapPin, MousePointerClick } from 'lucide-react'

const BuildingTooltip = ({ building }) => {
  if (!building || !building.properties) {
      return null
    }

  return (
  
    <div className='relative'>
      <div 
        className='absolute bottom-full left-1/2 bg-white border border-gray-100 rounded-lg shadow-lg'
        style={{
          transform: 'translateX(-50%)',
          width: '180px',
        }}
      >
          <div className='bg-indigo-50 px-3 py-1.75 rounded-t-lg'>
            <h3 className='text-sm font-semibold text-indigo-700 flex items-center tracking-wide'>
              <MapPin className='w-4.5 h-4.5 mr-2' />
              {building.properties.name}
            </h3>
          </div>

          <div className='p-3'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-500'>Usage:</span>
              <span className='text-base font-medium text-gray-800'>
                {building.properties.kWh} 
                <span className='text-xs font-normal ml-0.5 text-gray-500'> kWh/m²</span>
              </span>
          </div>
          
          <div className='flex items-center mt-2 pt-2 border-t border-gray-100'>
            <MousePointerClick className='w-4 h-4 text-gray-400 mr-1.5' />
            <span className='text-xs text-gray-500 font-medium'>
              Click for more details
            </span>
          </div>
        </div>

        <div 
        className='absolute w-3 h-3 left-1/2 bg-white border-b border-r border-gray-100 transform rotate-45 top-full -mt-1.5'
        />
      </div>
    </div>
  );
};

export default BuildingTooltip