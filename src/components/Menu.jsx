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
      <div className='h-full bg-neutral-200 bg-opacity-50 p-4 flex flex-col w-1/7'>
        <div className='h-1/9 pl-4 content-center'>
          <p className='text-2xl font-semibold'>BU Energy Dashboard</p>
        </div>
        <nav className='mt-6 flex-grow'>
          {MENU_LIST.map((item) => (
            <Link key={item.path} to={item.path} className='block w-full mb-2'>
              <div className={`flex items-center mb-5 pl-10 w-full h-20 text-lg font-medium rounded-lg transition-colors duration-100
              ${pathname === item.path ? 'bg-neutral-400' : 'hover:bg-neutral-300'}
              `}>
                <item.icon size={50} className='align-middle' style={{color: item.color}} />
                  <span className={`ml-6 ${pathname === item.path ? 'text-neutral-950' : 'text-neutral-500'}`}>
                    {item.name}
                  </span>
              </div>
            </Link>
          ))}

        </nav>  
        <div className='bottom-8 mt-6'>
          <hr />
          <motion.div className='flex items-center pl-10 p-10 text-lg font-medium rounded-lg hover:bg-neutral-400'>
            <Info size={50} color="#201d1d"/>
            <p className='ml-6'>About Metrics</p>
          </motion.div>
        </div>
      
      </div>
  );
};

export default Menu;
