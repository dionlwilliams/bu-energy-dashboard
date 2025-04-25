import { useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import OverviewPage from './webpages/OverviewPage'
import MapPage from './webpages/MapPage'
import LeaderboardPage from './webpages/LeaderboardPage'
import Menu from './components/Menu'

function App({}) {
  return (
    <div className='flex h-screen text-stone-900 overflow-hidden relative before:content-[""] before:absolute before:inset-0 before:bg-neutral-50 before:opacity-60 before:pointer-events-none'>
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
