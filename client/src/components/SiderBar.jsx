import React, { useState, useContext } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'

const SiderBar = ({ isMenuOpen, setIsMenuOpen }) => {
  // Extract necessary state and functions from the app context
  const { chats, setSelectChat, theme, setTheme, user, navigate } = useAppContext();
  // Local state for search functionality
  const [search, setSearch] = useState('');

  return (
    <div className={`flex flex-col h-screen w-80 p-5 transition-all duration-500 max-md:fixed max-md:top-0 max-md:left-0 max-md:z-50 ${theme === 'dark'
      ? 'bg-[#242124]/95 backdrop-blur-xl border-r border-[#80609F]/50'
      : 'bg-white/95 backdrop-blur-xl border-r border-gray-300'
      } ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
      {/* LOGO SECTION */}
      {/* Display different logo based on current theme (dark/light) */}
      <img
        src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
        className='w-full max-w-48'
        alt="Logo"
      />

      {/* NEW CHAT BUTTON */}
      {/* Button to start a new chat conversation */}
      <button className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer'>
        <span className='mr-2 text-xl font-bold'>+</span>New Chat
      </button>

      {/* SEARCH CONVERSATION INPUT */}
      {/* Search bar to filter through existing chats */}
      <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md'>
        <img src={assets.search_icon} className='w-4 not-dark:invert' alt="" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder='Search Conversation'
          className='text-xs placeholder:text-gray-400 outline-none bg-transparent dark:text-white'
        />
      </div>

      {/* RECENT CHATS SECTION HEADER */}
      {/* Only show "Recent Chats" label if there are chats available */}
      {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}

      {/* CHAT LIST CONTAINER */}
      {/* Scrollable container for displaying filtered chat list */}
      <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3'>
        {
          // Filter chats based on search input and map through results
          chats.filter((chat) =>
            // Search in first message content or chat name if no messages exist
            chat.messages[0]
              ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          ).map((chat) => (
            // Individual chat item
            <div onClick={() => { navigate('/'); setSelectChat(chat); setIsMenuOpen(false) }} key={chat._id} className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group'>
              {/* CHAT CONTENT */}
              <div>
                {/* Display first message preview or chat name (truncated to 32 characters) */}
                <p className='truncate w-full'>
                  {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                </p>
                {/* Display last updated timestamp */}
                <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              {/* DELETE BUTTON */}
              {/* Trash icon that appears on hover for deleting chats */}
              <img
                src={assets.bin_icon}
                className='hidden group-hover:block w-4 cursor-pointer not-dark:invert'
                alt="Delete chat"
              />
            </div>
          ))
        }
      </div>
      {/* Community Image */}
      <div onClick={() => { navigate('/community'); setIsMenuOpen(false) }} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
        <img src={assets.gallery_icon} className='w-4.5 not-dark:invert' alt="" />
        <div className='flex flex-col text-sm'>
          <p>Community Images</p>
        </div>
      </div>
      {/* Credit Purchase Option */}
      <div onClick={() => { navigate('/credits'); setIsMenuOpen(false) }} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
        <img src={assets.diamond_icon} className='w-4.5 dark:invert' alt="" />
        <div className='flex flex-col text-sm'>
          <p>Credits:{user?.credits}</p>
          <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>Purchase credits to use NeuroaGPT</p>
        </div>
      </div>

      {/* Dark mode toggle */}
      <div className='flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md'>
        <div className='flex items-center gap-2 text-sm'>
          <img src={assets.theme_icon} className='w-4 not-dark:invert' alt="" />
          <p>Dark Mode</p>
        </div>
        <label className='relative inline-flex cursor-pointer'>
          <input onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} type="checkbox" className="sr-only peer" checked={theme === 'dark'} />
          <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'>
          </div>
          <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
        </label>
      </div>

      {/* User Account */}
      <div className='flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group'>
        <img src={assets.user_icon} className='w-7 rounded-full' alt="" />
        <p className='flex-1 text-sm dark:text-primary truncate'>{user ? user.name : "Login to your account"}</p>
        {user && <img src={assets.logout_icon} className='h-5 cursor-pointer hidden not-dark:invert group-hover:block' alt="" />}
      </div>
      <img onClick={() => setIsMenuOpen(false)} src={assets.close_icon} className='absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden dark:invert' alt="" />
    </div>
  )
}

export default SiderBar