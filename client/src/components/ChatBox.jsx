import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'


const ChatBox = () => {

  const containerRef = useRef(null);

  const { selectChat, theme } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [mode, setMode] = useState("text");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  }

  useEffect(() => {
    if (selectChat) {
      setMessages(selectChat.messages);
    }
  }, [selectChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages]);
  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>

      {/* Messages Container */}
      <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full text-primary'>
            <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="" className='w-full max-w-56 sm:max-w-68' />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-slate-800 dark:text-slate-200'>
              You can ask anything!
            </p>
          </div>
        )}
        {messages.map((message, index) => {
          return <Message key={index} message={message} />
        })}
      </div>
      {/* Three dot loading */}
      {loading && <div className='loader flex items-center gap-1.5'>
        <div className='w-5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
        <div className='w-5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
        <div className='w-5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
      </div>}


      {mode === "image" && (
        <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
          <p className='text-xs'>Publish Generated Image to Community</p>
          <input type="checkbox" className='cursor-pointer' checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        </label>
      )}
      {/* prompt input box */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
      >
        {/* Mode Select */}
        <select
          name="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        {/* Prompt Input */}
        <input
          type="text"
          placeholder="Ask anything..."
          className="flex-1 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />

        {/* Send / Stop Button */}
        <button
          disabled={loading}
          className={`p-2 rounded-full transition ${loading
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            alt=""
            className="w-5 h-5 invert"
          />
        </button>
      </form>
      <div className='p-3 border-t border-gray-300 dark:border-white/15'></div>
    </div>
  )
}

export default ChatBox