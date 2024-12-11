// src/components/ChatBox.jsx
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

const ChatBox = ({ messages }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 border border-indigo-100 h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0, 
              x: message.role === 'user' ? 40 : -40,
              y: 20,
              scale: 0.9
            }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: 0,
              scale: 1
            }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.3,
              ease: [0.23, 1, 0.32, 1] // Custom easing for smooth animation
            }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.2,
                delay: index * 0.3 + 0.3,
                ease: "easeOut"
              }}
              className={`max-w-[85%] p-3 md:p-4 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-lg'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-md'
              } text-base md:text-lg transform-gpu`}
            >
              {message.content}
            </motion.div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </motion.div>
  )
}

export default ChatBox