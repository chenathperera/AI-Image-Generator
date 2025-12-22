import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainDash from '../components/MainDash';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Image to image');
  const [selectedStyle, setSelectedStyle] = useState(null);

  // FIX: Reset selection when activeTab changes so the grid renders again
  useEffect(() => {
    setSelectedStyle(null);
  }, [activeTab]);

  return (
    <div className='flex h-screen bg-white'>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='flex-1 overflow-y-auto p-4 md:p-10'>
        <MainDash 
          activeTab={activeTab} 
          selectedStyle={selectedStyle} 
          setSelectedStyle={setSelectedStyle} 
        />
      </div>
    </div>
  );
};

export default Dashboard;