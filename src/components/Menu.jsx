import { ChartNoAxesCombined, MapPinned, Info } from 'lucide-react'
import { MdOutlineLeaderboard } from "react-icons/md"
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import greenview_logo from '../assets/greenview_logo.png'

const MENU_LIST = [
    {name:"Overview", icon:ChartNoAxesCombined, color:"#9CA3AF", path:"/"},
    {name:"Campus Map", icon:MapPinned, color:"#201d1d", path:"/map"},
    {name:"Leaderboard", icon:MdOutlineLeaderboard, color:"#201d1d", path:"/leaderboard"}
];

const Menu = () => {
  const { pathname } = useLocation()

  return (
      <div className='h-full bg-[#E5E7EB] bg-opacity-50 p-4 flex flex-col w-20 md:w-100 z-950'>
        <div className='h-16 md:h-24 flex items-center md:pl-4 gap-3'>
          <img
            src={greenview_logo}
            alt='GreenView Logo'
            style={{ width: '100px', height: '60px'}}
          />
          <div className='hidden md:flex flex-col'>
            <h1 className='text-3xl tracking-widest text-[#49685C] leading-none'>
              GreenView
            </h1>
            <span className='text-sm tracking-wider text-[#6C8B80] text-center'>BU Energy Dashboard</span>
          </div>
        </div>

        <nav className='mt-6 flex-grow'>
          {MENU_LIST.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon
            return (
              <Link key={item.path} to={item.path} className='block w-full mb-2'>
              <div 
              className={`
                flex
                items-center 
                justify-center md:justify-start
                mb-5 
                h-16 md:h-20
                w-full
                text-xl tracking-wide 
                rounded-lg 
                transition-colors duration-100
                ${isActive ? 'bg-[#D1D5DB]' : 'hover:bg-[#CBD5E1]'}
                group
              `}>

                <Icon
                  size={ isActive ? 40 : 36 }
                  className='align-middle ml-0 md:ml-4 group-hover:text-gray-700'
                  style={{ 
                    color: isActive ? '#527A6C' : '#6B7280',          
                    transition: 'color 120ms ease-in-out'
                  }}
                />

                <span
                  className={`
                    hidden md:inline-block
                    ml-4
                    ${isActive ? 'text-[#1F2937]' : 'text-[#9CA3AF]'}
                    `}
                  >
                    {item.name}
                  </span>
              </div>
            </Link>
          )
        })}
        </nav>  

        <div className=' mt-6'>
          <hr className='text-[#6B7280]'/>
          <motion.div 
            className='
            flex 
            items-center 
            justify-center md:justify-start
            mt-6
            h-16 md:h-20
            px-0 md:pl-10
            text-xl text-[#9CA3AF] font-menu rounded-lg hover:bg-[#CBD5E1]'
            >
            <Info 
            size={36} color='#6B7280'
            />
            <p className='hidden md:inline ml-6'>About Metrics</p>
          </motion.div>
        </div>
      </div>
  )
}

export default Menu
