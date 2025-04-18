import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import OverviewPage from './webpages/OverviewPage'
import MapPage from './webpages/MapPage'
import LeaderboardPage from './webpages/LeaderboardPage'

function App({}) {
  console.log()

  return (
    <div className='flex h-screen bg-orange-50 text-stone-800 overflow-hidden'>

    <Routes>
      <Route path='/' element={<OverviewPage />} />
      <Route path='/map' element={<MapPage />} />
      <Route path='/leaderboard' element={<LeaderboardPage />} />
    </Routes>
    </div>
  )
}

export default App
