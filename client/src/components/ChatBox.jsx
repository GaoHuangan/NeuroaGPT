import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

  const { selectChat, theme } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (selectChat) {
      setMessages(selectChat.messages);
    }
  }, [selectChat]);

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>

      {/* Messages Container */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
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

      {/* prompt input box */}
      <form onSubmit={() => { }} className='p-3'>
        <input type="text" placeholder='Ask anything...' className='w-full p-2 border border-gray-300 dark:border-white/15 rounded-md' />
      </form>
      <div className='p-3 border-t border-gray-300 dark:border-white/15'></div>
    </div>
  )
}

export default ChatBox