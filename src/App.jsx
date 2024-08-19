import React from 'react'
import Home from './Components/Home'
import Classic from './Components/Classic'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { assets } from './assets/assets'
import Quote from './Components/Quote'

const App = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat flex justify-center pt-10 overflow-auto' style={{ backgroundImage: `url(${assets.aotBackground})` }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classic" element={<Classic />} />
        <Route path="/quote" element={<Quote/>}/>
      </Routes>
    </div>
  )
}

export default App