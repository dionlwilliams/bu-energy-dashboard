import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import OverviewPage from './webpages/OverviewPage'
import MapPage from './webpages/MapPage'
import LeaderboardPage from './webpages/LeaderboardPage'
import Menu from './components/Menu'

function App({}) {
  return (
    <div className='flex h-screen text-stone-800 overflow-hidden'>
    {/*bg styling - come back to later*/}
    <div className='fixed inset-0 z-0'>
      <div className='absolute inset-0 bg-neutral-50 opacity-80' />
    </div>

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
