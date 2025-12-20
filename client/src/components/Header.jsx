import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) { navigate('/result') } 
    else { setShowLogin(true) }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='flex flex-col lg:flex-row items-center justify-between gap-10 py-10 px-8 lg:px-16 bg-gray-100/80 rounded-[30px] mt-5 min-h-[80vh]'
    >
      <div className='flex-1 text-center lg:text-left'>
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className='text-5xl sm:text-7xl font-semibold text-zinc-900 leading-tight'
        >
          Turn Your Photos <br /> Into <span className='text-blue-600'>Viral AI Edits</span>
        </motion.h1 >
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className='mt-6 text-gray-600 max-w-md mx-auto lg:mx-0 text-lg leading-relaxed'
        >
          Generate eye-catching couple edits, celebrity-style photos, and creative AI visuals using smart prompts. 
          PairPix lets you transform ordinary images into stunning creations in seconds.
        </motion.p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClickHandler}
          className='mt-10 bg-black text-white px-12 py-4 rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300 cursor-pointer'
        >
          Try Now Free
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className='flex-1 grid grid-cols-3 gap-3 w-full max-w-[600px]'
      >
        <div className='flex flex-col gap-3'>
            <img src={assets.c1} alt="" className='rounded-xl h-37 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.c2} alt="" className='rounded-xl h-37 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.c3} alt="" className='rounded-xl h-37 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.c4} alt="" className='rounded-xl h-37 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
        </div>
        <div className='flex flex-col gap-3 pt-6'>
            <img src={assets.b1} alt="" className='rounded-xl h-46 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.b2} alt="" className='rounded-xl h-46 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.b3} alt="" className='rounded-xl h-46 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
        </div>
        <div className='flex flex-col gap-3'>
            <img src={assets.e1} alt="" className='rounded-xl h-50 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.e2} alt="" className='rounded-xl h-50 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
            <img src={assets.e3} alt="" className='rounded-xl h-49 w-full object-cover shadow-sm hover:scale-[1.02] transition-all' />
        </div>
      </motion.div>
    </motion.div>
  )
}
export default Header