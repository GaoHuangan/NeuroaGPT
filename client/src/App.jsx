import React from 'react'
import SiderBar from './components/SiderBar'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { Routes, Route } from 'react-router-dom'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { theme } = useAppContext();
  
  // 添加这行调试
  console.log('App component theme:', theme);

  return (
    <>
      <div className={`min-h-screen transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-[#242124] to-[#000000] text-white' 
          : 'bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] text-slate-700'
      }`}>
        {/* 添加这行来显示当前主题 */}
        <div className="fixed top-0 right-0 p-2 bg-red-500 text-white z-50">
          Current theme: {theme}
        </div>
        
        <div className='flex h-screen w-screen'>
          <SiderBar />
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