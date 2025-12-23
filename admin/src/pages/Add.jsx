import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  // State for images
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  // State for text fields
  const [name, setName] = useState("")
  const [prompt, setPrompt] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [uploadType, setUploadType] = useState("single") // single or double
  const [steps, setSteps] = useState("")

  const stepOptions = {
        single: ["Step 1: Upload your image", "Step 2: Click Generate"],
        double: ["Step 1: Upload your image", "Step 2: Upload celebrity/partner/other person image", "Step 3: Click Generate"]
    }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();

        // Add text fields
        formData.append("name", name);
        formData.append("prompt", prompt);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("uploadType", uploadType);
        
        // Automatically send the correct steps based on uploadType
            formData.append("steps", JSON.stringify(stepOptions[uploadType]));
        // Add images (only if they exist)
        image1 && formData.append("image1", image1);
        image2 && formData.append("image2", image2);
        image3 && formData.append("image3", image3);
        image4 && formData.append("image4", image4);

        const response = await axios.post(backendUrl + '/api/style/add', formData, { headers: { token } });

        if (response.data.success) {
            toast.success(response.data.message);
            // Clear form
            setName('');
            setPrompt('');
            setSteps('');
            setImage1(false);
            setImage2(false);
            setImage3(false);
            setImage4(false);
        } else {
            toast.error(response.data.message);
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

  return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            {/* Images Upload Section */}
            <div>
                <p className='mb-2'>Upload Sample Style Images (Max 4)</p>
                <div className='flex gap-2'>
                    {[image1, image2, image3, image4].map((img, index) => (
                        <label key={index} htmlFor={`image${index + 1}`}>
                            <img className='w-20 h-20 object-cover cursor-pointer border-2 border-dashed p-2' 
                                 src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" />
                            <input onChange={(e) => {
                                if(index === 0) setImage1(e.target.files[0])
                                if(index === 1) setImage2(e.target.files[0])
                                if(index === 2) setImage3(e.target.files[0])
                                if(index === 3) setImage4(e.target.files[0])
                            }} type="file" id={`image${index + 1}`} hidden />
                        </label>
                    ))}
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Style Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='e.g. Cyberpunk Male' required />
            </div>

            <div className='w-full'>
                <p className='mb-2'>AI Prompt</p>
                <textarea onChange={(e) => setPrompt(e.target.value)} value={prompt} className='w-full max-w-[500px] px-3 py-2 border' placeholder='Write the prompt' required />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 border'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Child">Child</option>
                        <option value="Couple">Couple</option>
                        <option value="Celebrity">With Celebrity</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>User Upload Type (Auto-sets Steps)</p>
                    <select value={uploadType} onChange={(e) => setUploadType(e.target.value)} className='w-full px-3 py-2 border'>
                        <option value="single">1 Photo (Standard Steps)</option>
                        <option value="double">2 Photos (Partner/Celeb Steps)</option>
                    </select>
                </div>
            </div>

            {/* Displaying what steps will be saved */}
            <div className='w-full max-w-[500px] bg-gray-50 p-3 rounded border'>
                <p className='text-xs font-bold uppercase text-gray-500 mb-1'>Generated Steps for User:</p>
                <ul className='text-sm text-gray-600 list-disc ml-4'>
                    {stepOptions[uploadType].map((step, i) => <li key={i}>{step}</li>)}
                </ul>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Search Description</p>
                <input onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Keywords...' />
            </div>

            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD STYLE</button>
        </form>
    )
}

export default Add