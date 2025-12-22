import React from 'react';
import { assets } from '../assets/assets';

const Sidebar = ({ activeTab, setActiveTab, logout }) => {
    // Added 'Image to image' into the menuItems array with an icon
    const menuItems = [
        { name: 'Image to image', icon: '📷', type: 'category' },
        { name: 'Men', icon: '👤', type: 'category' },
        { name: 'Women', icon: '👤', type: 'category' },
        { name: 'Child', icon: '👶', type: 'category' },
        { name: 'Couple', icon: '❤️', type: 'category' },
        { name: 'With Celebrities', icon: '⭐', type: 'category' },
        { name: 'Text to Image', icon: '📝', type: 'nav' },
        { name: 'History', icon: '🕒', type: 'nav' },
    ];

    return (
        <div className='w-64 min-h-[90vh] flex flex-col justify-between border-r border-gray-100 pr-4 p-6'>
            <div>
                <nav className='flex flex-col gap-1'>
                    
                    
                    <ul className='space-y-1'>
                        {menuItems.map((item) => (
                            <li 
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-300 
                                    ${activeTab === item.name 
                                        ? 'bg-black text-white shadow-md shadow-gray-400' 
                                        : 'text-gray-500 hover:bg-gray-100 hover:text-black hover:pl-6'
                                    }`}
                            >
                                <span className='text-lg'>{item.icon}</span>
                                <span className='text-sm font-medium'>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* UPGRADE PRO CARD */}
            <div className='mt-10'>
                <div className='bg-[#F2F2F2] p-6 rounded-[25px] text-center border border-transparent hover:border-gray-300 transition-all'>
                    <div className='flex items-center justify-center gap-2 mb-2'>
                        <div className='w-7 h-7 bg-black rounded-full flex items-center justify-center'>
                            <span className='text-white text-xs'>↺</span>
                        </div>
                        <h3 className='font-bold text-lg text-gray-800 tracking-tight'>Upgrate to Pro</h3>
                    </div>
                    <p className='text-[10px] text-gray-400 leading-tight mb-4 px-2'>
                        unclo sdnvsnvnn ksdnvsn dvni oknv kdnndovddodon ndkm onon
                    </p>
                    <button className='w-full bg-[#4000FF] text-white py-3 rounded-[15px] font-bold text-sm shadow-lg hover:bg-[#3300CC] hover:shadow-[#4000FF]/30 transition-all active:scale-95'>
                        Upgrate Now
                    </button>
                </div>

                {/* Log Out Button */}
                <button 
                    onClick={logout} 
                    className='flex items-center gap-3 mt-8 px-4 text-gray-800 font-bold text-sm hover:text-red-600 transition-colors group'
                >
                    <span className='text-lg group-hover'><img src={assets.logout} width={20} /></span>
                    <span className=' cursor-pointer'>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;