// src/components/TypeEffect.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TypeEffect = ({ staticText, dynamicTexts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = dynamicTexts[currentTextIndex]
    let timer

    if (isTyping && !isDeleting) {
      // Typing effect
      if (displayText.length < text.length) {
        timer = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1))
        }, 50)
      } else {
        // Wait at the end of typing
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
      }
    } else if (isDeleting) {
      // Deleting effect
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length - 1))
        }, 30)
      } else {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isTyping, isDeleting, currentTextIndex, dynamicTexts])

  return (
    <div className="flex flex-col gap-6 mb-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 text-transparent bg-clip-text">
        {staticText}
      </h1>
      <div className="min-h-[80px] relative">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 text-transparent bg-clip-text absolute">
        {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
            className="ml-1 inline-block"
          >
            |
          </motion.span>
        </div>
      </div>
    </div>
  )
}

export default TypeEffect