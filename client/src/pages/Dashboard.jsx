import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainDash from '../components/MainDash';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'Image to image';
  });
  
  const [selectedStyle, setSelectedStyle] = useState(() => {
    const saved = localStorage.getItem('selectedStyle');
    return saved ? JSON.parse(saved) : null;
  });

  // Save activeTab to localStorage
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // FIX: This function changes the tab AND clears the style so you go back to the grid
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedStyle(null);
    localStorage.removeItem('selectedStyle');
  };

  return (
    <div className='flex h-screen bg-white'>
      {/* Pass the new handleTabChange function to the Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
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