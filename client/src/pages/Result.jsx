import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Result = () => {

  const [image, setImage] = useState(assets.d1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (input) {
      setLoading(true); // This starts the blue bar animation immediately
      setIsImageLoaded(false); 

      const imageUrl = await generateImage(input);

      if (imageUrl) {
        setImage(imageUrl); // Set the URL; loading remains TRUE until the image finishes rendering
        setIsImageLoaded(true); 
      } else {
        setLoading(false); // Only turn off if the API fails entirely
      }
    }
  };

  const downloadImage = async () => {
    try {
      // 1. Create a canvas to draw the image
      const img = new Image();
      img.crossOrigin = "anonymous"; // Essential for CORS
      img.src = image;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // 2. Convert canvas to data URL and download
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `ai-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    } catch (error) {
      console.log("Download error:", error);
      window.open(image, "_blank"); // Fallback
    }
  };


  return (
    <motion.form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      

<div className='relative'>
  <div className='relative max-w-sm overflow-hidden rounded'>
    <img 
      key={image} 
      src={image} 
      alt="Generated"
      // Apply blur class if loading is true
      className={`w-full h-auto ${loading ? 'image-loading' : 'image-loaded'}`} 
      onLoad={() => setLoading(false)} 
    />
    
    {/* Your existing Blue Bar Animation */}
    <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-[10000ms] ${loading ? 'w-full' : 'w-0'}`} />
  </div>

  {/* Existing Loading Text */}
  <p className={`text-center mt-2 ${!loading ? 'hidden' : ''}`}>Generating Masterpiece...</p>
</div>

      {!isImageLoaded &&

        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
          <input onChange={e => setInput(e.target.value)} value={input} className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' type="text" placeholder='Describe what you want to genrate' />
          <button type="submit" className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
        </div>

      }

      {isImageLoaded &&

        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p onClick={() => { setIsImageLoaded(false) }} className='bg-transparent border  border-zinc-900 text-black px-8  py-3 rounded-full cursor-pointer'>Generate Another</p>
          <button
            type="button" // This prevents the form from re-submitting and costing a credit
            onClick={downloadImage}
            className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'
          >
            Download
          </button>   </div>

      }
    </motion.form>
  )
}

export default Result
