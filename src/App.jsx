import { useState } from 'react'
import { Routes } from 'react-router-dom'

function App({}) {
  console.log()

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>

    <Routes>
      <Route path='/' element={<OverviewPage />} />
      <Route path='/map' element={<MapPage />} />
      <Route path='/leaderboard' element={<LeaderboardPage />} />

    </Routes>
    </div>
  )
}

export default App
