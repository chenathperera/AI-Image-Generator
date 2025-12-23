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
        
        // Convert steps string to an array for the backend
        const stepsArray = steps.split(',').map(s => s.trim());
        formData.append("steps", JSON.stringify(stepsArray));

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
      <div>
        <p className='mb-2'>Upload Sample Style Images (Max 4)</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 cursor-pointer border-2 border-dashed p-2' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20 cursor-pointer border-2 border-dashed p-2' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20 cursor-pointer border-2 border-dashed p-2' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20 cursor-pointer border-2 border-dashed p-2' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Style Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='e.g. Cyberpunk Male' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>AI Prompt</p>
        <textarea onChange={(e) => setPrompt(e.target.value)} value={prompt} className='w-full max-w-[500px] px-3 py-2' placeholder='Write the prompt used for this style' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Steps (How to generate)</p>
        <textarea onChange={(e) => setSteps(e.target.value)} value={steps} className='w-full max-w-[500px] px-3 py-2' placeholder='Step 1: Upload photo... Step 2: Click gen...' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Child">Child</option>
            <option value="Couple">Couple</option>
            <option value="Celebrity">With Celebrity</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>User Upload Fields</p>
          <select onChange={(e) => setUploadType(e.target.value)} className='w-full px-3 py-2'>
            <option value="single">1 Photo (Self)</option>
            <option value="double">2 Photos (Self + Partner/Celeb)</option>
          </select>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Search Description (Keywords)</p>
        <input onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='e.g. realistic, 8k, blue eyes' />
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD STYLE</button>
    </form>
  )
}

export default Add