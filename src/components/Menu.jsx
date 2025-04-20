import React from 'react'
import { ChartNoAxesCombined, MapPinned, Info } from 'lucide-react';
import { MdOutlineLeaderboard } from "react-icons/md";
import { useState } from 'react';
import { AnimatePresence, color, motion } from 'motion/react'
import { Link } from 'react-router-dom'

const MENU_LIST = [
    {name:"Overview", icon:ChartNoAxesCombined, color:"#201d1d", path:"/"},
    {name:"Campus Map", icon:MapPinned, color:"#201d1d", path:"/map"},
    {name:"Leaderboard", icon:MdOutlineLeaderboard, color:"#201d1d", path:"/leaderboard"}
];

const Menu = () => {
  return (
      <div className='h-full bg-neutral-200 bg-opacity-50 p-4 flex flex-col w-100'>
        <div className='h-1/9 pl-4 content-center'>
          <p className='text-2xl font-semibold'>BU Energy Dashboard</p>
        </div>
        <nav className='mt-6 flex-grow'>
          {MENU_LIST.map((item) => (
            <Link key={item.path} to={item.path}>
            <motion.div className='flex items-center pl-10 w-75 h-35 text-lg font-medium rounded-lg hover:bg-neutral-400'>
              <item.icon size={50} className='align-middle' style={{color: item.color}} />
                <span className='ml-6'>
                  {item.name}
                </span>
            </motion.div>
            </Link>
          ))}

        </nav>  
        <div className='bottom-8'>
          <hr />
          <motion.div className='flex items-center pl-10 p-10 text-lg font-medium rounded-lg'>
            <Info size={50} color="#201d1d"/>
            <p className='ml-6'>About Metrics</p>
          </motion.div>
        </div>
      
      </div>
  );
};

export default Menu;
