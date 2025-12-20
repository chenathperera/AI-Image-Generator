import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Showcase = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) { navigate('/result') } 
    else { setShowLogin(true) }
  }

  const showcaseData = [
    {
      image: assets.e2,
      prompt: "Photorealistic 4k image of standing on a bright, green football pitch, taking a close selfie with Cristiano Ronaldo and Lionel Messi. He is holding a smartphone with one hand, smiling naturally..."
    },
    {
      image: assets.e3, 
      prompt: "Take a picture with a Polaroid camera. The photo should look like a normal photo, without any clear subjects or props. The photo should have a slight blur effect and a consistent light source, such..."
    },
    {
      image: assets.g1,
      prompt: "A REALISTIC SELFIE OF A YOUNG INDIAN MAN (BASED ON THE REFERENCE IMAGE) TAKING A SELFIE ON A LUXURIOUS STREET IN MUMBAI. STANDING BESIDE HIM IS BOLLYWOOD SUPERSTAR SHAH RUKH KHAN, WEARING A STYLISH..."
    },
    {
      image: assets.g2,
      prompt: "The photo should look like an ordinary photograph, without an explicit subject or property. The photo should have a slight blur and a consistent light source, like a flash from a dark room, scattered..."
    }
  ]

  return (
    <div className='flex flex-col items-center justify-center my-24 p-6'>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='text-center max-w-3xl mb-12'
      >
        <h1 className='text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight mb-6'>
          Upload Your Photo. <span className='text-blue-600'>Get <br className='hidden sm:block'/> Stunning AI Edits Instantly.</span>
        </h1>
        <p className='text-gray-600 text-lg'>
          Choose from 1000+ ready-made AI prompts with sample edits. Just select a 
          style you like, upload your photo, and PairPix automatically generates your 
          edit — no prompts needed.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
        {showcaseData.map((card, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className='bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col'
          >
            <div className='h-64 w-full overflow-hidden'>
              <img src={card.image} alt={`Sample ${index + 1}`} className='w-full h-full object-cover hover:scale-110 transition-transform duration-500' />
            </div>
            <div className='p-5 flex flex-col flex-grow bg-gray-50/50'>
              <p className='text-xs text-gray-700 leading-relaxed mb-6'>
                <span className='font-bold text-blue-600'>Prompt - </span> "{card.prompt}"
              </p>
              <button 
                onClick={onClickHandler}
                className='mt-auto w-full bg-black text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-95 text-sm'
              >
                Try <span className='text-[10px]'>💎</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
export default Showcase