import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [state, setState] = useState('Login')
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            if (state === 'Login') {

                const {data} = await axios.post(backendUrl + '/api/user/login', { email, password });
                if (data.success) {

                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                    navigate('/dash') // Change this to your dashboard path
                    toast.success("Welcome back!")
                    

                } else {
                    toast.error(data.message)

                }

            }else{

                
                const {data} = await axios.post(backendUrl + '/api/user/register', { name,email, password });
                if (data.success) {

                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)

                } else {
                    toast.error(data.message)

                }
            }

        } catch (error) {

             toast.error(error.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4'>

            {/* Main Container */}
            <div className='relative bg-white rounded-xl flex flex-col md:flex-row overflow-hidden max-w-[800px] w-full shadow-2xl'>

                {/* Left Side: Image */}
                {/* Left Side: Image with Text Overlay */}
                <div className='hidden md:block md:w-1/2 relative'>

                    <img
                        src={assets.side_image}
                        alt="Landscape"
                        className='h-full w-full object-cover'
                    />

                    {/* Dark Overlay */}
                    <div className='absolute inset-0 bg-black/40'></div>

                    {/* White Text */}
                    <div className='absolute bottom-10 left-8 right-8 text-white'>
                        <h2 className='text-2xl font-semibold leading-tight drop-shadow-lg'>
                            Capture Moments <br /> That Matter
                        </h2>
                        <p className='text-sm mt-2 opacity-90 drop-shadow'>
                            Store, share & relive your memories
                        </p>
                    </div>
                </div>


                {/* Right Side: Form Content */}
                {/* Removed justify-center to fix the top margin issue */}
                <form onSubmit={onSubmitHandler} className='p-10 md:p-12 text-slate-500 w-full md:w-1/2 flex flex-col'>

                    {/* Logo: Centered */}
                    <div className='flex justify-center items-center gap-2 mb-8'>
                        <img src={assets.logo} alt="PairPix Logo" className='w-28' />
                    </div>

                    {/* Title and Subtitle: Centered */}
                    <div className='text-center'>
                        <h1 className='text-2xl text-neutral-700 font-semibold mb-1'>{state === 'Login' ? 'Login' : 'Sign Up'}</h1>
                        <p className='text-xs mb-6'>Welcome back! Please {state === 'Login' ? 'Login' : 'Sign Up'} to continue</p>
                    </div>

                    {state !== 'Login' && (
                        <div className='border px-5 py-2 flex items-center gap-2 rounded-full mt-4'>
                            <img src={assets.pro} width={16} alt="" />
                            <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm w-full' type='text' placeholder='Full Name' required />
                        </div>
                    )}

                    <div className='border px-5 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <img src={assets.email} width={18} alt="" />
                        <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm w-full' type='email' placeholder='Email id' required />
                    </div>

                    <div className='border px-5 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <img src={assets.pw} width={18} alt="" />
                        <input onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm w-full' type='password' placeholder='Password' required />
                    </div>

                    <p className='text-xs text-blue-600 my-4 cursor-pointer w-fit'>Forgot Password</p>

                    <button className='bg-black w-full text-white py-2.5 rounded-full font-medium hover:bg-neutral-800 transition-all'>
                        {state === 'Login' ? 'Login' : 'Create Account'}
                    </button>

                    {state === 'Login' ?
                        <p className='mt-6 text-sm text-center'>
                            Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span>
                        </p>
                        :
                        <p className='mt-6 text-sm text-center'>
                            Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span>
                        </p>
                    }

                    {/* Close Button */}
                    <img
                        onClick={() => setShowLogin(false)}
                        className='absolute top-5 right-5 cursor-pointer opacity-40 hover:opacity-100 transition-opacity'
                        src={assets.cross}
                        width={12}
                        alt="close"
                    />
                </form>
            </div>
        </div>
    )
}

export default Login