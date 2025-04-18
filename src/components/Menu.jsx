import React from 'react'
import { ChartNoAxesCombined, MapPinned } from 'lucide-react';
import { MdOutlineLeaderboard } from "react-icons/md";
import { useState } from 'react';
import { motion} from 'motion/react'
import { Link } from 'react-router-dom'

const MENU_ITEMS = [
    {name:"Overview", icon:ChartNoAxesCombined, color:"#4E342E", path:"/"},
    {name:"Campus Map", icon:MapPinned, color:"#4E342E", path:"/map"},
    {name:"Leaderboard", icon:MdOutlineLeaderboard, color:"#4E342E", path:"/leaderboard"}
];

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
      <div className='h-full bg-orange-200 bg-opacity-50 p-4 flex flex-col w-100'>
        <nav className='mt-8 flex-grow'>
          {MENU_ITEMS.map((item, index) => (
            <Link key={item.path} to={item.path}>
            <motion.div className='flex items-stretch p-6 w-48 h-48 text-sm font-medium rounded-lg'>
              <item.icon size={50} style={{color: item.color}} />
            </motion.div>
            </Link>
          ))}

        </nav>
      </div>
  );
};

export default Menu;
