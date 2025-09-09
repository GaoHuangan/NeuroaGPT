import React, { useState, Suspense } from 'react'
import { useLocation, Routes, Route, Navigate } from 'react-router-dom'
import SiderBar from './components/SiderBar'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import Loading from './pages/Loading'
import Login from './pages/Login'            // <- ensure this exists
import { useAppContext } from './context/AppContext'
import { assets } from './assets/assets'
import './assets/prism.css'

const App = () => {
  const { user, theme } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Dedicated loading route
  if (pathname === '/loading') return <Loading />;

  return (
    <>
      {/* Mobile menu button */}
      {!isMenuOpen && user && (
        <img
          src={assets.menu_icon}
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-3 left-3 w-8 h-8 cursor-pointer md:hidden dark:invert z-50"
          alt="Open sidebar"
        />
      )}

      {/* Mobile overlay */}
      {isMenuOpen && user && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] md:hidden z-30"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* App shell */}
      <div
        className={[
          "min-h-dvh overflow-x-hidden transition-colors duration-300",
          theme === 'dark'
            ? "text-white bg-[#0b0b0c] bg-[radial-gradient(1200px_600px_at_-10%_-10%,#1e1b24_0%,transparent_60%),radial-gradient(800px_400px_at_110%_10%,#111827_0%,transparent_50%)]"
            : "text-slate-700 bg-[#f6f7fb] bg-[radial-gradient(1200px_600px_at_-10%_-10%,#e8efff_0%,transparent_60%),radial-gradient(800px_400px_at_110%_10%,#f1f5f9_0%,transparent_50%)]"
        ].join(' ')}
      >
        {/* When logged in: fixed sidebar + content */}
        {user ? (
          <>
            {/* Fixed sidebar */}
            <SiderBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Main content area */}
            <main className="md:ml-80">
              {/* Top spacing to breathe on mobile; max width container */}
              <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
                {/* Page transitions fallback while lazy routes load */}
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route path="/" element={<ChatBox />} />
                    <Route path="/credits" element={<Credits />} />
                    <Route path="/community" element={<Community />} />
                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </div>
            </main>
          </>
        ) : (
          // Logged out: center the login card and keep theme background
          <section className="min-h-dvh grid place-items-center px-4">
            <div className="w-full max-w-md">
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default App
