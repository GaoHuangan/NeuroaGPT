import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'

const SiderBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectChat, theme, setTheme, user, navigate } = useAppContext();
  const [search, setSearch] = useState('');

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-dvh w-80 p-5
        transition-transform duration-500 overflow-hidden
        ${theme === 'dark'
          ? 'bg-[#242124]/95 backdrop-blur-xl border-r border-[#80609F]/50'
          : 'bg-white/95 backdrop-blur-xl border-r border-gray-300'
        }
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      aria-label="Sidebar"
    >
      {/* Close button on mobile */}
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden dark:invert"
        alt="Close sidebar"
      />

      {/* Scrollable body: use min-h-0 so it can shrink in a flex column */}
      <div className="h-full flex flex-col">
        {/* Logo */}
        <img
          src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
          className="w-full max-w-48"
          alt="Logo"
        />

        {/* New Chat */}
        <button
          onClick={() => { navigate('/'); setSelectChat(null); setIsMenuOpen(false); }}
          className="flex justify-center items-center w-full py-2 mt-10 text-white
                     bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md"
        >
          <span className="mr-2 text-xl font-bold">+</span>New Chat
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
          <img src={assets.search_icon} className="w-4 not-dark:invert" alt="" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search Conversation"
            className="text-xs placeholder:text-gray-400 outline-none bg-transparent dark:text-white w-full"
          />
        </div>

        {/* Chats label */}
        {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}

        {/* Chats list (scrollable area) */}
        <div className="flex-1 min-h-0 overflow-y-auto mt-3 text-sm space-y-3 pr-1">
          {chats
            .filter((chat) =>
              chat.messages[0]
                ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase())
                : chat.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((chat) => (
              <div
                onClick={() => { navigate('/'); setSelectChat(chat); setIsMenuOpen(false); }}
                key={chat._id}
                className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15
                           rounded-md cursor-pointer flex justify-between group"
              >
                <div className="min-w-0">
                  <p className="truncate">{chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}</p>
                  <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">{moment(chat.updatedAt).fromNow()}</p>
                </div>
                <img
                  src={assets.bin_icon}
                  className="hidden group-hover:block w-4 cursor-pointer not-dark:invert"
                  alt="Delete chat"
                />
              </div>
            ))}
        </div>

        {/* Quick links */}
        <div
          onClick={() => { navigate('/community'); setIsMenuOpen(false); }}
          className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15
                     rounded-md cursor-pointer hover:scale-[1.03] transition-all"
        >
          <img src={assets.gallery_icon} className="w-[18px] not-dark:invert" alt="" />
          <div className="flex flex-col text-sm">
            <p>Community Images</p>
          </div>
        </div>

        <div
          onClick={() => { navigate('/credits'); setIsMenuOpen(false); }}
          className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15
                     rounded-md cursor-pointer hover:scale-[1.03] transition-all"
        >
          <img src={assets.diamond_icon} className="w-[18px] dark:invert" alt="" />
          <div className="flex flex-col text-sm">
            <p>Credits:{user?.credits}</p>
            <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">Purchase credits to use NeuroaGPT</p>
          </div>
        </div>

        {/* Sticky footer: theme toggle + user block */}
        <div className="sticky bottom-0 pt-4 pb-2 bg-transparent">
          {/* Dark mode toggle */}
          <div className="flex items-center justify-between gap-2 p-3 border border-gray-300 dark:border-white/15 rounded-md">
            <div className="flex items-center gap-2 text-sm">
              <img src={assets.theme_icon} className="w-4 not-dark:invert" alt="" />
              <p>Dark Mode</p>
            </div>
            <label className="relative inline-flex cursor-pointer">
              <input
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'dark'}
              />
              <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
            </label>
          </div>

          {/* User */}
          <div className="flex items-center gap-3 p-3 mt-3 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
            <img src={assets.user_icon} className="w-7 rounded-full" alt="" />
            <p className="flex-1 text-sm dark:text-primary truncate">
              {user ? user.name : 'Login to your account'}
            </p>
            {user && (
              <img
                src={assets.logout_icon}
                className="h-5 cursor-pointer hidden not-dark:invert group-hover:block"
                alt="Logout"
              />
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SiderBar
