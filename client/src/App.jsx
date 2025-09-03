import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import SiderBar from './components/SiderBar'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { Routes, Route } from 'react-router-dom'
import { useAppContext } from './context/AppContext'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'

const App = () => {
  const { theme } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if (pathname === '/loading') return <Loading />;

  return (
    <>
      {!isMenuOpen && <img src={assets.menu_icon} onClick={() => setIsMenuOpen(true)}
        className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden dark:invert' />}
      <div className={`min-h-screen transition-all duration-300 ${theme === 'dark'
        ? 'bg-gradient-to-b from-[#242124] to-[#000000] text-white'
        : 'bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] text-slate-700'
        }`}>

        <div className='flex h-screen w-screen'>
          <SiderBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App