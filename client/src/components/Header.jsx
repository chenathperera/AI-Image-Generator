import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    // Main Container with Gray Background and Rounded Corners
    <div className='flex flex-col lg:flex-row items-center justify-between gap-10 py-10 px-8 lg:px-16 bg-gray-100/80 rounded-[30px] mt-10 min-h-[80vh]'>
      
      {/* --- Left Side: Content --- */}
      <div className='flex-1 text-center lg:text-left'>
        <h1 className='text-5xl sm:text-7xl font-semibold text-zinc-900 leading-tight'>
          Turn Your Photos <br /> Into <span className='text-blue-600'>Viral AI Edits</span>
        </h1>
        
        <p className='mt-6 text-gray-600 max-w-md mx-auto lg:mx-0 text-lg leading-relaxed'>
          Generate eye-catching couple edits, celebrity-style photos, and creative AI visuals using smart prompts. 
          PairPix lets you transform ordinary images into stunning creations in seconds.
        </p>

        <button className='mt-10 bg-black text-white px-12 py-4 rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300 cursor-pointer'>
          Try Now Free
        </button>
      </div>

      {/* --- Right Side: Image Grid --- */}
      <div className='flex-1 grid grid-cols-3 gap-3 w-full max-w-[600px]'>
        
        {/* Column 1: 4 Square-ish Images */}
       <div className='flex flex-col gap-3'>
            <img src={assets.c1} alt="" className='rounded-xl h-37 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.c2} alt="" className='rounded-xl h-37 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.c3} alt="" className='rounded-xl h-37 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.c4} alt="" className='rounded-xl h-37 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
        </div>

        {/* Column 2: 3 Rectangle/Taller Images */}
        <div className='flex flex-col gap-3 pt-6'>
            <img src={assets.b1} alt="" className='rounded-xl h-46 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.b2} alt="" className='rounded-xl h-46 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.b3} alt="" className='rounded-xl h-46 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
        </div>

        {/* Column 3: 3 Tallest Images (2:3 Ratio) */}
        <div className='flex flex-col gap-3'>
            <img src={assets.e1} alt="" className='rounded-xl h-50 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.e2} alt="" className='rounded-xl h-50 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.e3} alt="" className='rounded-xl h-49 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
        </div>
      </div>

    </div>
  )
}

export default Header