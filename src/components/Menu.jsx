import React from 'react'
import { ChartNoAxesCombined, MapPinned, Info } from 'lucide-react';
import { MdOutlineLeaderboard } from "react-icons/md";
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const MENU_LIST = [
    {name:"Overview", icon:ChartNoAxesCombined, color:"#201d1d", path:"/"},
    {name:"Campus Map", icon:MapPinned, color:"#201d1d", path:"/map"},
    {name:"Leaderboard", icon:MdOutlineLeaderboard, color:"#201d1d", path:"/leaderboard"}
];

const Menu = () => {
  const { pathname } = useLocation()

  return (
      <div className='h-full bg-neutral-200 bg-opacity-50 p-4 flex flex-col w-20 md:w-100'>
        <div className='h-16 md:h-24 flex items-center md:pl-4'>
          <p className='hidden md:block text-2xl font-semibold'>
            BU Energy Dashboard
            </p>
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
                text-lg font-medium 
                rounded-lg 
                transition-colors duration-100
                ${isActive ? 'bg-neutral-400' : 'hover:bg-neutral-300'}
              `}>

                <Icon
                  size={ isActive ? 40 : 36 }
                  className='align-middle ml-0 md:ml-4'
                  style={{ color: item.color}}
                />

                <span
                  className={`
                    hidden md:inline-block
                    ml-4
                    ${isActive ? 'text-neutral-950' : 'text-neutral-500'}
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
          <hr />
          <motion.div 
            className='
            flex 
            items-center 
            justify-center md:justify-start
            mt-6
            h-16 md:h-20
            px-0 md:pl-10
            text-lg font-medium rounded-lg hover:bg-neutral-400'
            >
            <Info 
            size={36} color='#201d1d'
            />
            <p className='hidden md:inline ml-6'>About Metrics</p>
          </motion.div>
        </div>
      </div>
  )
}

export default Menu
