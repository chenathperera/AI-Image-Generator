import React from 'react';

const StyleDetailView = ({ 
    selectedStyle, mainImage, setMainImage, secondImage, setSecondImage, 
    generatedImg, setGeneratedImg, isZoomed, setIsZoomed, isLoading, 
    handleGoBack, handleGenerate, handleDownload 
}) => (
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
                        {selectedStyle.images?.slice(0, 4).map((img, index) => (
                            <img key={index} src={img} onClick={() => setMainImage(img)} className={`w-20 md:w-full rounded-xl cursor-pointer border-2 transition-all ${mainImage === img ? 'border-blue-600 shadow-md' : 'border-transparent'}`} alt="" />
                        ))}
                    </div>
                    <div className='flex-1'>
                        {mainImage && <img src={mainImage} className='w-full rounded-3xl shadow-sm border border-gray-100' alt="Current" />}
                    </div>
                </div>

                <div className='mt-8 p-6 bg-white rounded-[24px] border border-gray-100 shadow-sm'>
                    <p className='text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-2'>Style Prompt</p>
                    <p className='text-gray-700 italic text-sm leading-relaxed'>"{selectedStyle.prompt}"</p>
                </div>
            </div>

            <div className='lg:w-[40%]'>
                <h2 className='text-xl font-semibold mb-6'>How to Generate</h2>
                <div className='space-y-4 mb-8 text-sm text-gray-600'>
                    {selectedStyle.steps?.map((step, idx) => (<p key={idx}>{step}</p>))}

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

export default StyleDetailView;