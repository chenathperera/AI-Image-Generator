import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(false)
    const [history, setHistory] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCreditsData = async () => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/credits', {}, { headers: { token } });
            if (data.success) {

                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    const generateImage = async (prompt) => {

        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token } });
            console.log("Backend Response:", data); // Check this in Browser Console (F12)

            if (data.success) {
                loadCreditsData();
                // Ensure the key name matches exactly what the backend sends (resultImageUrl)
                return data.resultImageUrl;
            } else {
                toast.error(data.message)
                loadCreditsData()

                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    // Inside your Context file (AppContext.jsx)
    const addToHistory = (image, name, prompt) => {
        const newItem = {
            id: Date.now(), // Unique ID for React keys
            image: image,
            name: name,
            prompt: prompt,
            date: new Date().toLocaleDateString()
        };

        // Use the functional update to ensure React sees the change
        setHistory(prevHistory => [newItem, ...prevHistory]);
    };

    const removeFromHistory = (id) => {
        setHistory(prev => prev.filter(item => item.id !== id));
    };


    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
        navigate('/');
    }

    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken,
        credit, setCredit, loadCreditsData, logout, generateImage, history, setHistory, removeFromHistory, addToHistory
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider