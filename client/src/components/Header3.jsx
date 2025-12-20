import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateSection = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) { navigate('/result') } 
    else { setShowLogin(true) }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='flex flex-col lg:flex-row items-stretch justify-between bg-gray-100/80 rounded-[30px] overflow-hidden my-20 h-auto lg:h-[450px] relative'
    >
      <div className='flex-1 py-12 px-10 lg:pl-20 lg:pr-10 text-left z-10 flex flex-col justify-center'>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className='text-3xl sm:text-4xl font-semibold text-zinc-900 leading-tight mb-4'
        >
          Transform Your Photos Instantly
        </motion.h2>
        
        <div className='text-gray-600 max-w-md space-y-3 text-base leading-relaxed'>
          <p>With PairPix, you can upload your own photos and watch them transform into stunning AI-edited images.</p>
          <p>No need to write any prompts—simply choose from our curated styles and sample images, and your photos are automatically generated in the selected style.</p>
          <p>Turn ordinary pictures into celebrity-inspired edits, couple photos, or stylish visuals in seconds!</p>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          onClick={onClickHandler}
          className='mt-8 w-fit bg-black text-white px-8 py-3 rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300 cursor-pointer'
        >
          Try Now Free
        </motion.button>
      </div>

      <div className='flex-1 flex h-[350px] lg:h-full w-full relative'>
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='flex flex-col gap-2 w-1/2 h-full items-end pr-1'
        >
          <div className='bg-blue-600 h-[25%] w-[60%] shadow-lg overflow-hidden'>
             <img src={assets.a1} alt="" className='w-full h-full object-cover' />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} className='bg-blue-600 h-[50%] w-[120%] shadow-lg overflow-hidden relative z-20'>
             <img src={assets.a2} alt="" className='w-full h-full object-cover' />
          </motion.div>
          <div className='bg-blue-600 h-[25%] w-[85%] shadow-lg overflow-hidden'>
             <img src={assets.a3} alt="" className='w-full h-full object-cover' />
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='flex flex-col gap-2 w-1/2 h-full ml-1'
        >
          <div className='bg-blue-500 h-1/2 w-full shadow-lg overflow-hidden'>
             <img src={assets.f1} alt="" className='w-full h-full object-cover' />
          </div>
          <div className='bg-blue-600 h-1/2 w-full shadow-lg overflow-hidden'>
             <img src={assets.f2} alt="" className='w-full h-full object-cover' />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
export default GenerateSection