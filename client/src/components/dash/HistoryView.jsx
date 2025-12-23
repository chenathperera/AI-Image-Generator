import React from 'react';

const HistoryView = ({ history, handleDownload, removeFromHistory }) => (
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
                                <button onClick={() => removeFromHistory(item._id)} className='p-2 bg-red-50 text-red-500 rounded-lg'>🗑️</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default HistoryView;