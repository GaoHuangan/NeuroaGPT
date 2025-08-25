import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { dummyUserData } from '../assets/assets';
import { dummyChats } from '../assets/assets';
import { useEffect } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectChat, setSelectChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const fetchUser = async () => {
        try {
            setUser(dummyUserData)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUserChats = async () => {
        try {
            setChats(dummyChats)
            setSelectChat(dummyChats[0])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme])

    useEffect(() => {
        if (user) {
            fetchUserChats();
        } else {
            setChats([]);
            setSelectChat(null);
        }
    }, [user])

    useEffect(() => {
        fetchUser();
    }, [])

    const value = {
        navigate,
        user,
        setUser,
        chats,
        setChats,
        selectChat,
        setSelectChat,
        theme,
        setTheme
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}
