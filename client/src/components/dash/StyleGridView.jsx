import React from 'react';

const StyleGridView = ({ displayItems, handleStyleSelection }) => (
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

export default StyleGridView;