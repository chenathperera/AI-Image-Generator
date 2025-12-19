import React from 'react'
import { assets } from '../assets/assets'

const GenerateSection = () => {
  return (
    <div className='flex flex-col lg:flex-row items-stretch justify-between bg-gray-100/80 rounded-[30px] overflow-hidden my-20 h-auto lg:h-[450px] relative'>
      
      {/* --- Left Side: Text Content --- */}
      <div className='flex-1 py-12 px-10 lg:pl-20 lg:pr-10 text-left z-10 flex flex-col justify-center'>
        <h2 className='text-3xl sm:text-4xl font-semibold text-zinc-900 leading-tight mb-4'>
          Transform Your Photos Instantly
        </h2>
        
        <div className='text-gray-600 max-w-md space-y-3 text-base leading-relaxed'>
          <p>
            With PairPix, you can upload your own photos and watch them transform into stunning AI-edited images.
          </p>
          <p>
            No need to write any prompts—simply choose from our curated styles and sample images, and your photos are automatically generated in the selected style.
          </p>
          <p>
            Turn ordinary pictures into celebrity-inspired edits, couple photos, or stylish visuals in seconds!
          </p>
        </div>

        <button className='mt-8 w-fit bg-black text-white px-8 py-3 rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300'>
          Try Now Free
        </button>
      </div>

      {/* --- Right Side: Custom Staggered Grid --- */}
      <div className='flex-1 flex h-[350px] lg:h-full w-full relative'>
        
        {/* Column 1: Variable Widths & Staggered Position */}
        <div className='flex flex-col gap-2 w-1/2 h-full items-end pr-1'>
          {/* Top Box (Smallest width) */}
          <div className='bg-blue-600 h-[25%] w-[60%] shadow-lg overflow-hidden'>
             <img src={assets.a1} alt="" className='w-full h-full object-cover' />
          </div>
          {/* Middle Box (Widest - pushes into text area) */}
          <div className='bg-blue-600 h-[50%] w-[120%] shadow-lg overflow-hidden relative z-20'>
             <img src={assets.a2} alt="" className='w-full h-full object-cover' />
          </div>
          {/* Bottom Box (Medium width) */}
          <div className='bg-blue-600 h-[25%] w-[85%] shadow-lg overflow-hidden'>
             <img src={assets.a3} alt="" className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Column 2: Standard Flush Column */}
        <div className='flex flex-col gap-2 w-1/2 h-full ml-1'>
          <div className='bg-blue-500 h-1/2 w-full shadow-lg overflow-hidden'>
             <img src={assets.f1} alt="" className='w-full h-full object-cover' />
          </div>
          <div className='bg-blue-600 h-1/2 w-full shadow-lg overflow-hidden'>
             <img src={assets.f2} alt="" className='w-full h-full object-cover' />
          </div>
        </div>

      </div>

    </div>
  )
}

export default GenerateSection