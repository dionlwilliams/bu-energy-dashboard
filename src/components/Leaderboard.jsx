import { Trophy, Crown } from "lucide-react"

const Leaderboard = ({buildingData}) => {
    const topThree = buildingData.slice(0, 3)
    const remainingBuildings = buildingData.slice(3)

    return(
    <div className='flex-1 flex flex-col overflow-auto relative z-10'>
      {/* Header */}
      <div className='w-full mx-auto h-26 py-4 px-4 grid grid-cols-[2fr_1fr] gap-4'>
        <div className='flex flex-col justify-center m-4'>
          <h1 className='text-3xl text-gray-800 tracking-wider'>Yearly Leaderboard</h1>
          <p className='m-2 font-light text-xl text-gray-600 tracking-wide'>
            Ranked by kWh per square meter (kWh/m²)
          </p>
        </div>
      </div>

      <div className='flex-1 flex flex-col p-4 h-full ml-4 mr-4 mb-4'>
        {/* Podium */}
        <div className='grid md:grid-cols-3 gap-6 mt-14 mb-10 items-end'>
          {/* 2nd */}
          <div className='order-1 md:order-1 flex flex-col items-center bg-white border-2 border-[#CBD5E1] rounded-lg p-5 shadow h-52 justify-end relative'>
            <Trophy className='text-[#b7bcc2] mb-2' size={45} />
            <p className='text-lg'>2nd</p>
            <p className='mt-1 font-medium tracking-wider'>{topThree[1].building}</p>
            <p className='font-bold text-lg text-[#84878a]'>{topThree[1].kWhPerSqm}</p>
          </div>

          {/* 1st */}
          <div className='order-2 md:order-2 flex flex-col items-center border-2 border-[#FDE68A] bg-white rounded-lg p-6 shadow h-65 justify-end relative'>
            <div className='absolute -top-16 '>
                <Crown className='text-[#f3c409] scale-x-125' size={55} />
            </div>
            <div className='absolute -top-5 text-3xl' />
            <Trophy className='text-[#e6ce70] mb-6' size={55} />
            <p className='text-xl'>1st</p>
            <p className='mt-2 font-semibold text-lg tracking-wider'>{topThree[0].building}</p>
            <p className='text-2xl font-bold text-[#bea74a]'>{topThree[0].kWhPerSqm}</p>
          </div>

          {/* 3rd */}
          <div className='order-3 md:order-3 flex flex-col items-center border-2 border-[#E0A66B] bg-white rounded-lg p-5 shadow h-42 justify-end relative'>
            <Trophy className='text-[#c98b4e] mb-2' size={35} />
            <p className='text-lg'>3rd</p>
            <p className='mt-1 font-medium tracking-wider'>{topThree[2].building}</p>
            <p className='font-bold text-lg text-[#9b562c]'>{topThree[2].kWhPerSqm}</p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>
            
            <div className='flex items-center justify-between pb-3 mb-2 border-b border-gray-200'>
                <div className='flex items-center w-full'>
                    <div className='w-16 pl-2'>
                        <span className='text-xs font-semibold text-gray-500 tracking-widest'>Rank</span>
                    </div>
      
                    <div className='flex-1 ml-4'>
                        <span className='text-xs font-semibold text-gray-500 tracking-widest'>Building Name</span>
                    </div>
    
                    <div className='w-48 pr-4 text-right'>
                        <span className='text-xs font-semibold text-gray-500 tracking-widest'>Energy Usage</span>
                    </div>
                </div>
            </div>

            <div className='flex-1 min-h-0 overflow-y-auto'>
            <div className='space-y-3'>
                {remainingBuildings.map((b, i) => (
                    <div 
                        key={b.building} 
                        className='flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100'
                    >
                        <div className='flex items-center space-x-4'>
                            <div className='w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center'>
                                <span className='text-indigo-600 font-semibold text-sm'>#{i + 4}</span>
                            </div>
          
                            <div className='flex-1 ml-4 min-w-0'>
                                <h4 className='text-base font-normal tracking-wide text-gray-800'>{b.building}</h4>
                            </div>
                        </div>

                        <div className='w-48 flex-shrink-0 pr-4 text-right'>
                            <p className='text-md font-normal text-gray-700'>
                                <span className='text-lg font-bold'>{b.kWhPerSqm}</span> kWh/m²</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
      </div>
    </div>
    )
}

export default Leaderboard