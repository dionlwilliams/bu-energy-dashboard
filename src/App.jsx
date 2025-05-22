import { useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import OverviewPage from './webpages/OverviewPage'
import MapPage from './webpages/MapPage'
import LeaderboardPage from './webpages/LeaderboardPage'
import Menu from './components/Menu'

function App({}) {
  return (
    <div className='flex h-screen z-0 text-stone-900 overflow-hidden bg-[#F9FAFB]'>
    {/*bg styling - come back to later*/}
    
    <Menu />
    <Routes>
      <Route path='/' element={<OverviewPage />} />
      <Route path='/map' element={<MapPage />} />
      <Route path='/leaderboard' element={<LeaderboardPage />} />
    </Routes>
    </div>
  );
}

export default App
