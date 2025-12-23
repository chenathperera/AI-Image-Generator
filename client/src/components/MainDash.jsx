import React, { useState, useEffect, useContext } from 'react';
import { styleItems } from '../assets/stylesData';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const MainDash = ({ activeTab, selectedStyle, setSelectedStyle }) => {
    // Add this state at the top with your other useState hooks
    const [styles, setStyles] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);

    // Persist generated image through refresh
    const [generatedImg, setGeneratedImg] = useState(() => {
        return localStorage.getItem('lastGeneratedImg') || null;
    });

    const [isZoomed, setIsZoomed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        addToHistory,
        history,
        removeFromHistory,
        user,
        setShowLogin,
        backendUrl,
        token,
        setCredit,
        loadHistory
    } = useContext(AppContext);

    const fetchStyles = async () => {
        try {
            console.log("Attempting to fetch from:", backendUrl + '/api/style/all');
            const { data } = await axios.get(backendUrl + '/api/style/all');

            if (data.success) {
                console.log("Success! Data received:", data.styles);
                setStyles(data.styles);
            } else {
                console.log("Backend returned success:false", data.message);
            }
        } catch (error) {
            console.error("Axios Error:", error.message);
        }
    };

    useEffect(() => {
        fetchStyles();
    }, []);

    // Load saved style on mount
    useEffect(() => {
        const savedStyle = localStorage.getItem('selectedStyle');
        if (savedStyle && !selectedStyle) {
            setSelectedStyle(JSON.parse(savedStyle));
        }
    }, []);

    // Save generated image to local storage
    useEffect(() => {
        if (generatedImg) {
            localStorage.setItem('lastGeneratedImg', generatedImg);
        } else {
            localStorage.removeItem('lastGeneratedImg');
        }
    }, [generatedImg]);

    const handleStyleSelection = (item) => {
        if (!user) {
            setShowLogin(true);
            toast.info("Please login to use this style!");
        } else {
            setSelectedStyle(item);
            localStorage.setItem('selectedStyle', JSON.stringify(item));
        }
    };

    const handleGoBack = () => {
        setSelectedStyle(null);
        setGeneratedImg(null);
        localStorage.removeItem('selectedStyle');
        localStorage.removeItem('lastGeneratedImg');
    };

    // Replace your existing displayItems logic with this:
    const displayItems = (activeTab === 'Image to image' || activeTab === '')
        ? styles
        : styles.filter(item =>
            item.category?.toLowerCase() === activeTab?.toLowerCase()
        );
    // Inside MainDash.jsx -> handleDownload function

    const handleDownload = async (imgUrl) => {
    const urlToUse = imgUrl || generatedImg;
    if (!urlToUse) return;

    // 1. Trigger Browser Download
    const link = document.createElement('a');
    link.href = urlToUse;
    link.download = `AI-Gen-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Save to Database (Only if it's a new generation)
    if (urlToUse === generatedImg) {
        
        try {
            const { data } = await axios.post(backendUrl + '/api/user/add-history', 
                { 
                    userId: user._id, 
                    image: urlToUse, 
                    name: selectedStyle?.name || "AI Generated",
                    prompt: selectedStyle?.prompt 
                }, 
                { headers: { token } }
            );

            if (data.success) {
                toast.success("Saved to History");
                loadHistory(); // <--- Call the function from Context to refresh list from DB
            }
        } catch (error) {
           console.error(error);
        }
    }
};

    const handleGenerate = async () => {
        if (!mainImage) return toast.error("Please upload a photo first!");
        if (selectedStyle?.uploadType === 'double' && !secondImage) {
            return toast.error("This style requires a second photo!");
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            const response = await fetch(mainImage);
            const blob = await response.blob();
            const file = new File([blob], "input.png", { type: "image/png" });
            formData.append("files", file);

            if (selectedStyle.uploadType === 'double' && secondImage) {
                const response2 = await fetch(secondImage);
                const blob2 = await response2.blob();
                const file2 = new File([blob2], "partner.png", { type: "image/png" });
                formData.append("files", file2);
            }

            formData.append("prompt", selectedStyle.prompt);

            const { data } = await axios.post(backendUrl + '/api/image/img-to-img', formData, {
                headers: { token }
            });

            if (data.success) {
                setGeneratedImg(data.resultImageUrl);
                setCredit(data.creditBalance);
                toast.success("Image Generated!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setSecondImage(null);
        if (selectedStyle && selectedStyle.images && selectedStyle.images.length > 0) {
            setMainImage(selectedStyle.images[0]);
        }
    }, [selectedStyle, activeTab]);

    // --- HISTORY VIEW ---
    if (activeTab === 'History') {
        return (
            <div className='bg-[#F8F9FA] rounded-[32px] p-8 min-h-full'>
                <div className='flex items-center gap-3 mb-8'>
                    <h2 className='text-2xl font-semibold'>Your History</h2>
                    <span className='bg-black text-white text-[10px] px-3 py-1 rounded-full'>{history ? history.length : 0} Items</span>
                </div>
                {!history || history.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 text-gray-400'>
                        <span className='text-5xl mb-4'>🕒</span>
                        <p className='font-medium'>No history found.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {history.map((item) => (
                            <div key={item._id} className='bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 group relative'>
                                <img src={item.image} className='w-full h-52 object-cover rounded-[18px] mb-4 shadow-inner' alt="" />
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm font-bold text-gray-800'>{item.name}</p>
                                        <p className='text-[10px] text-gray-400'>{item.date}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button onClick={() => handleDownload(item.image)} className='p-2 bg-blue-50 text-blue-500 rounded-lg'>💾</button>
                                        <button onClick={() => removeFromHistory(item.id)} className='p-2 bg-red-50 text-red-500 rounded-lg'>🗑️</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // --- DETAIL VIEW ---
    if (selectedStyle) {
        return (
            <div className='bg-[#F8F9FA] rounded-[32px] p-8 min-h-full relative'>
                {isZoomed && (
                    <div className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/10 backdrop-blur-2xl' onClick={() => setIsZoomed(false)}>
                        <img src={generatedImg} className='max-w-[85vw] max-h-[80vh] rounded-[40px] shadow-2xl border-[12px] border-white' alt="" />
                    </div>
                )}

                <button onClick={handleGoBack} className='text-sm text-blue-600 mb-6 flex items-center gap-1 hover:underline'>← Back to styles</button>

                <div className='flex flex-col lg:flex-row gap-12'>
                    <div className='flex-1'>
                        <div className='flex items-center gap-4 mb-6'>
                            <h2 className='text-2xl font-semibold'>Explore Endless Creativity</h2>
                            <span className='bg-black text-white text-[10px] px-4 py-1.5 rounded-full font-medium'>{selectedStyle.category}</span>
                        </div>

                        <div className='flex flex-col-reverse md:flex-row gap-4'>
                            <div className='flex md:flex-col gap-3 md:w-[20%] overflow-x-auto'>
                                {selectedStyle.images.slice(0, 4).map((img, index) => (
                                    <img key={index} src={img} onClick={() => setMainImage(img)} className={`w-20 md:w-full rounded-xl cursor-pointer border-2 transition-all ${mainImage === img ? 'border-blue-600 shadow-md' : 'border-transparent'}`} alt="" />
                                ))}
                            </div>
                            <div className='flex-1'>
                                {mainImage && <img src={mainImage} className='w-full rounded-3xl shadow-sm border border-gray-100' alt="Current" />}
                            </div>
                        </div>

                        {/* RESTORED PROMPT BOX */}
                        <div className='mt-8 p-6 bg-white rounded-[24px] border border-gray-100 shadow-sm'>
                            <p className='text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-2'>Style Prompt</p>
                            <p className='text-gray-700 italic text-sm leading-relaxed'>"{selectedStyle.prompt}"</p>
                        </div>
                    </div>

                    <div className='lg:w-[40%]'>
                        <h2 className='text-xl font-semibold mb-6'>How to Generate</h2>
                        <div className='space-y-4 mb-8 text-sm text-gray-600'>
                            {selectedStyle.steps.map((step, idx) => (<p key={idx}>{step}</p>))}

                            <div className='border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center bg-white hover:border-blue-400 cursor-pointer' onClick={() => document.getElementById('file-1').click()}>
                                <span className='text-blue-500 font-medium'>Upload Primary Photo</span>
                                <input id="file-1" type="file" accept="image/*" className='hidden' onChange={(e) => setMainImage(URL.createObjectURL(e.target.files[0]))} />
                            </div>

                            {selectedStyle.uploadType === 'double' && (
                                <div className='border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center bg-white hover:border-purple-400 cursor-pointer' onClick={() => document.getElementById('file-2').click()}>
                                    <span className='text-purple-500 font-medium'>{secondImage ? "Partner Photo Added" : "Upload Partner/Celebrity Photo"}</span>
                                    <input id="file-2" type="file" accept="image/*" className='hidden' onChange={(e) => setSecondImage(URL.createObjectURL(e.target.files[0]))} />
                                </div>
                            )}
                        </div>

                        {!generatedImg ? (
                            <button onClick={handleGenerate} disabled={isLoading} className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-blue-600'} text-white py-4 rounded-2xl font-bold shadow-lg transition-all`}>
                                {isLoading ? 'Generating...' : 'Generate ⚡'}
                            </button>
                        ) : (
                            <div className='space-y-6'>
                                <img src={generatedImg} onClick={() => setIsZoomed(true)} className='w-full rounded-3xl shadow-2xl cursor-pointer border-4 border-white' alt="Generated" />
                                <div className='flex gap-4'>
                                    <button onClick={() => setGeneratedImg(null)} className='flex-1 bg-white border-2 border-black py-3 rounded-xl font-bold'>Try Again</button>
                                    <button onClick={() => handleDownload()} className='flex-1 bg-black text-white py-3 rounded-xl font-bold'>Download</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // --- GRID VIEW ---
    return (
        <div className='bg-[#F8F9FA] rounded-[32px] p-8 min-h-full'>
            <h2 className='text-2xl font-semibold mb-8'>Explore Endless Creativity</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                {displayItems.map((item) => (
                    <div key={item._id} onClick={() => handleStyleSelection(item)} className='cursor-pointer group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all'>
                        <img src={item.images[0]} className='w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700' alt="" />
                        <div className='absolute bottom-4 left-4'>
                            <span className='bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold'>{item.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainDash;