import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Result from '../pages/Result';

// Import the new sub-components
import HistoryView from './dash/HistoryView';
import StyleDetailView from './dash/StyleDetailView';
import StyleGridView from './dash/StyleGridView';

const MainDash = ({ activeTab, selectedStyle, setSelectedStyle }) => {
    const [styles, setStyles] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [generatedImg, setGeneratedImg] = useState(() => {
        return localStorage.getItem('lastGeneratedImg') || null;
    });

    const navigate = useNavigate();

    const {
        loadCreditsData,
        history,
        removeFromHistory,
        user,
        setShowLogin,
        backendUrl,
        token,
        setCredit,
        loadHistory
    } = useContext(AppContext);

    // --- LOGIC (KEEPING AS IS) ---
    const fetchStyles = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/style/all');
            if (data.success) setStyles(data.styles);
        } catch (error) {
            console.error("Axios Error:", error.message);
        }
    };

    useEffect(() => { fetchStyles(); }, []);

    useEffect(() => {
        const savedStyle = localStorage.getItem('selectedStyle');
        if (savedStyle && !selectedStyle) setSelectedStyle(JSON.parse(savedStyle));
    }, []);

    useEffect(() => {
        if (generatedImg) localStorage.setItem('lastGeneratedImg', generatedImg);
        else localStorage.removeItem('lastGeneratedImg');
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

    const handleDownload = async (imgUrl) => {
        const urlToUse = imgUrl || generatedImg;
        if (!urlToUse) return;

        const link = document.createElement('a');
        link.href = urlToUse;
        link.download = `AI-Gen-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (urlToUse === generatedImg) {
            try {
                const { data } = await axios.post(backendUrl + '/api/user/add-history',
                    { userId: user._id, image: urlToUse, name: selectedStyle?.name || "AI Generated", prompt: selectedStyle?.prompt },
                    { headers: { token } }
                );
                if (data.success) {
                    toast.success("Saved to History");
                    loadHistory();
                }
            } catch (error) { console.error(error); }
        }
    };

    const handleGenerate = async () => {
        if (!mainImage) return toast.error("Please upload a photo first!");
        if (selectedStyle?.uploadType === 'double' && !secondImage) return toast.error("This style requires a second photo!");

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

            const { data } = await axios.post(backendUrl + '/api/image/img-to-img', formData, { headers: { token } });
            if (data.success) {
                setGeneratedImg(data.resultImageUrl);
                setCredit(data.creditBalance);
                toast.success("Image Generated!");
            } else {
                toast.error(data.message);
                if (data.creditBalance == 0 || data.message.toLowerCase().includes('credit')) {

                    // Use a small delay or ensure loadCreditsData exists
                    if (loadCreditsData) loadCreditsData();

                    console.log("Redirecting to buy page...");
                    navigate('/buy');
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally { setIsLoading(false); }
    };

    useEffect(() => {
        setSecondImage(null);
        if (selectedStyle && selectedStyle.images?.length > 0) setMainImage(selectedStyle.images[0]);
    }, [selectedStyle, activeTab]);

    const displayItems = (activeTab === 'Image to image' || activeTab === '')
        ? styles
        : styles.filter(item => item.category?.toLowerCase() === activeTab?.toLowerCase());

    // --- RENDERING LOGIC ---
    if (activeTab === 'History') {
        return <HistoryView history={history} handleDownload={handleDownload} removeFromHistory={removeFromHistory} />;
    }

    // 2. Text to Image View (ADD THIS)
    if (activeTab === 'Text to Image') {
        return <Result />; 
    }

    if (selectedStyle) {
        return (
            <StyleDetailView
                selectedStyle={selectedStyle}
                mainImage={mainImage}
                setMainImage={setMainImage}
                secondImage={secondImage}
                setSecondImage={setSecondImage}
                generatedImg={generatedImg}
                setGeneratedImg={setGeneratedImg}
                isZoomed={isZoomed}
                setIsZoomed={setIsZoomed}
                isLoading={isLoading}
                handleGoBack={handleGoBack}
                handleGenerate={handleGenerate}
                handleDownload={handleDownload}
            />
        );
    }

    return <StyleGridView displayItems={displayItems} handleStyleSelection={handleStyleSelection} />;
};

export default MainDash;