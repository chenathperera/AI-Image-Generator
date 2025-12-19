import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>

      {/* NAVBAR (Kept same styling) */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        
        <Navbar />
        
      </div>
      <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradiant-to-b from-teal-50 to-orange-50'>
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Result />} />
          <Route path='/buy' element={<BuyCredit />} />




        </Routes>
      </div>
      <Footer />

    </div>
  )
}

export default App
