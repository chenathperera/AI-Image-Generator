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
    // Removed min-h-[90vh] to make it fit inside the MainDash padding
    <motion.form 
      onSubmit={onSubmitHandler} 
      className='flex flex-col justify-center items-center w-full py-10'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='relative'>
        <div className='relative max-w-sm overflow-hidden rounded-xl shadow-lg border border-gray-100'>
          <img 
            key={image} 
            src={image} 
            alt="Generated"
            className={`w-full h-auto transition-all duration-500 ${loading ? 'blur-sm grayscale' : 'blur-0 grayscale-0'}`} 
            onLoad={() => setLoading(false)} 
          />
          
          {/* Progress Bar */}
          <span className={`absolute bottom-0 left-0 h-1.5 bg-blue-600 transition-all duration-[10000ms] ease-out ${loading ? 'w-full' : 'w-0'}`} />
        </div>

        <p className={`text-center font-medium text-gray-500 mt-4 ${!loading ? 'hidden' : 'animate-pulse'}`}>
          Generating your masterpiece...
        </p>
      </div>

      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-gray-100 p-1 mt-12 rounded-full border border-gray-200 shadow-inner'>
          <input 
            onChange={e => setInput(e.target.value)} 
            value={input} 
            className='flex-1 bg-transparent outline-none ml-6 text-gray-700 placeholder:text-gray-400' 
            type="text" 
            placeholder='Describe what you want to generate...' 
          />
          <button type="submit" className='bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all'>
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className='flex gap-4 flex-wrap justify-center mt-12'>
          <button 
            type="button"
            onClick={() => setIsImageLoaded(false)} 
            className='bg-white border border-black text-black px-10 py-3 rounded-full hover:bg-gray-50 transition-all'
          >
            Generate Another
          </button>
          <button
            type="button" 
            onClick={downloadImage}
            className='bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800 transition-all shadow-md'
          >
            Download
          </button>
        </div>
      )}
    </motion.form>
  )
}

export default Result