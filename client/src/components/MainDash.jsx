import React, { useState, useEffect, useContext } from 'react';
import { styleItems } from '../assets/stylesData';
import { AppContext } from '../context/AppContext';

const MainDash = ({ activeTab, selectedStyle, setSelectedStyle }) => {
    const [mainImage, setMainImage] = useState('');
    const [generatedImg, setGeneratedImg] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    
    // Extracting history functions from AppContext
    const { addToHistory, history, removeFromHistory } = useContext(AppContext);

    const displayItems = activeTab === 'Image to image'
        ? styleItems
        : styleItems.filter(item => item.category === activeTab);

    // DOWNLOAD LOGIC: Saves to PC and adds to App History state
    const handleDownload = () => {
        if (!generatedImg) return;

        const link = document.createElement('a');
        link.href = generatedImg;
        link.download = `PairPix-${selectedStyle.name || 'AI-Image'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Add to history context
        addToHistory(generatedImg, selectedStyle.name || selectedStyle.category);
    };

    // Reset generated image when switching items or tabs
    useEffect(() => {
        setGeneratedImg(null);
        if (selectedStyle && selectedStyle.images.length > 0) {
            setMainImage(selectedStyle.images[0]);
        }
    }, [selectedStyle, activeTab]);

    // --- STEP 3: HISTORY VIEW ---
    if (activeTab === 'History') {
        return (
            <div className='bg-[#F8F9FA] rounded-[32px] p-8 min-h-full'>
                <div className='flex items-center gap-3 mb-8'>
                    <h2 className='text-2xl font-semibold'>Your History</h2>
                    <span className='bg-black text-white text-[10px] px-3 py-1 rounded-full'>
                        {history ? history.length : 0} Items
                    </span>
                </div>

                {!history || history.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 text-gray-400'>
                        <span className='text-5xl mb-4'>🕒</span>
                        <p className='font-medium'>No history found. Start generating!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {history.map((item) => (
                            <div key={item.id} className='bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 group relative'>
                                <img 
                                    src={item.image} 
                                    className='w-full h-52 object-cover rounded-[18px] mb-4 shadow-inner' 
                                    alt="History Entry" 
                                />
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm font-bold text-gray-800'>{item.name}</p>
                                        <p className='text-[10px] text-gray-400'>{item.date}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        {/* Save Icon (Re-download) */}
                                        <button 
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.href = item.image;
                                                link.download = 'PairPix-Saved.png';
                                                link.click();
                                            }}
                                            className='p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all'
                                            title="Download Again"
                                        >
                                            💾
                                        </button>
                                        {/* Delete Bin Icon */}
                                        <button 
                                            onClick={() => removeFromHistory(item.id)}
                                            className='p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all'
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // --- ITEM DETAIL VIEW ---
    if (selectedStyle) {
        return (
            <div className='bg-[#F8F9FA] rounded-[32px] p-8 min-h-full relative'>
                {/* LIGHTBOX MODAL */}
                {isZoomed && (
                    <div className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/10 backdrop-blur-2xl animate-in fade-in duration-300'>
                        <button
                            onClick={() => setIsZoomed(false)}
                            className='absolute top-10 left-10 bg-white text-black px-8 py-2 rounded-full font-bold shadow-xl border border-black hover:bg-black hover:text-white transition-all'
                        >
                            ← Back
                        </button>
                        <img
                            src={generatedImg}
                            className='max-w-[85vw] max-h-[80vh] rounded-[40px] shadow-2xl border-[12px] border-white object-contain'
                            alt="Zoomed Result"
                        />
                    </div>
                )}

                <button
                    onClick={() => setSelectedStyle(null)}
                    className='text-sm text-blue-600 mb-6 flex items-center gap-1 hover:underline'
                >
                    ← Back to styles
                </button>

                <div className='flex flex-col lg:flex-row gap-12'>
                    <div className='flex-1'>
                        <div className='flex items-center gap-4 mb-6'>
                            <h2 className='text-2xl font-semibold'>Explore Endless Creativity</h2>
                            <span className='bg-black text-white text-[10px] px-4 py-1.5 rounded-full font-medium'>
                                {selectedStyle.category}
                            </span>
                        </div>

                        <div className='flex flex-col-reverse md:flex-row gap-4'>
                            <div className='flex md:flex-col gap-3 md:w-[20%] overflow-x-auto'>
                                {selectedStyle.images.slice(0, 4).map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        onClick={() => setMainImage(img)}
                                        className={`w-20 md:w-full rounded-xl cursor-pointer border-2 transition-all ${mainImage === img ? 'border-blue-600 shadow-md' : 'border-transparent'}`}
                                        alt=""
                                    />
                                ))}
                            </div>
                            <div className='flex-1'>
                                <img src={mainImage} className='w-full rounded-3xl shadow-sm border border-gray-100' alt="" />
                            </div>
                        </div>

                        <div className='mt-10'>
                            <h3 className='text-blue-700 font-bold text-xl'>Prompt</h3>
                            <p className='text-gray-500 mt-2 text-sm leading-relaxed italic'>"{selectedStyle.prompt}"</p>
                        </div>
                    </div>

                    <div className='lg:w-[40%]'>
                        <h2 className='text-xl font-semibold mb-6'>How to Generate</h2>
                        <div className='space-y-4 mb-8 text-sm text-gray-600'>
                            <p>1. Upload your photo</p>
                            <div className='border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center bg-white hover:border-blue-400 transition-colors cursor-pointer'>
                                <span className='text-blue-500 font-medium'>Click here to upload photo</span>
                                <p className='text-[10px] text-gray-400 mt-1'>Image size must be less than 5 MB</p>
                            </div>
                            <p>2. Click generate button</p>
                        </div>

                        {!generatedImg ? (
                            <button
                                onClick={() => setGeneratedImg(mainImage)} 
                                className='w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all'
                            >
                                Generate ⚡
                            </button>
                        ) : (
                            <div className='space-y-6 animate-in slide-in-from-bottom-4 duration-500'>
                                <img
                                    src={generatedImg}
                                    onClick={() => setIsZoomed(true)}
                                    className='w-full rounded-3xl shadow-2xl cursor-pointer border-4 border-white hover:scale-[1.01] transition-transform'
                                    alt="Generated Result"
                                />
                                <div className='flex gap-4'>
                                    <button
                                        onClick={() => setGeneratedImg(null)}
                                        className='flex-1 bg-white border-2 border-black text-black py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors'
                                    >
                                        Try Again
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className='flex-1 bg-black text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity'
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // --- GRID VIEW (DEFAULT) ---
    return (
        <div className='bg-[#F8F9FA] rounded-[32px] p-8 min-h-full'>
            <h2 className='text-2xl font-semibold mb-8'>Explore Endless Creativity</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                {displayItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedStyle(item)}
                        className='cursor-pointer group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all'
                    >
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