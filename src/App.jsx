// src/App.jsx
import { useState } from 'react'
import TypeEffect from './components/TypeEffect'
import ChatBox from './components/ChatBox'
import { motion, AnimatePresence } from 'framer-motion'

const staticText = "Tell your partner what you're really thinking - "

const dynamicPrompts = [
  "without saying a word.",
  "and let them understand.",
  "when words feel heavy.",
  "and bridge the silence.",
  "through expression.",
  "with complete honesty.",
  "and see what happens.",
  "in your own unique way.",
  "when timing isn't right.",
  "before it's too late."
]

// Shuffle array function for random prompts
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Get randomized prompts on component mount
const randomizedPrompts = shuffleArray([...dynamicPrompts])

function App() {
  const [message, setMessage] = useState('')
  const [selectedOption, setSelectedOption] = useState('significant-other')
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleSubmit = () => {
    if (!message.trim()) return;
    
    const mockResponse = [
      { role: 'user', content: message },
      { role: 'assistant', content: "I appreciate you sharing that with me. What made you decide to open up about this now?" },
      { role: 'user', content: "I've been keeping this to myself for a while..." },
      { role: 'assistant', content: "That must have been difficult. How do you feel now that you've shared it?" },
      { role: 'user', content: "It's actually quite relieving to finally say it." },
      { role: 'assistant', content: "I'm glad you felt comfortable enough to share. Would you like to talk more about it?" },
      { role: 'user', content: "Yes, I think I would..." },
      { role: 'assistant', content: "Take your time. I'm here to listen without judgment." }
    ]
    
    setMessages(mockResponse)
    setShowChat(true)
    setMessage('')
  }

  const handleJoinSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setShowModal(false)
    setFormData({ name: '', email: '', phone: '' })
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-x-hidden">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="w-full max-w-[2000px] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="text-3xl md:text-4xl font-bold italic bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Relaii
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full hover:opacity-90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Join
          </button>
        </nav>
      </header>

      <main className="w-full min-h-screen pt-20 flex items-center justify-center">
        <div className="w-full max-w-[2000px] h-full px-4 md:px-8 flex flex-col lg:flex-row items-center justify-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full lg:w-1/2 flex flex-col justify-center py-8"
          >
            <div className="max-w-2xl mx-auto lg:mx-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-24 h-32"
              >
                <TypeEffect staticText={staticText} dynamicTexts={randomizedPrompts} />
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12"
              >
                Say what's on your mind and hear what's on theirs - anonymously,
                thoughtfully, and effortlessly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's something you wish you could share, but wouldn't? (good or bad, sweet or salty)"
                  className="w-full p-4 md:p-6 bg-white/70 backdrop-blur-sm border-2 border-indigo-100 rounded-xl min-h-[120px] resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-700 text-lg shadow-lg placeholder-gray-400"
                />

                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-full p-3 md:p-4 bg-white/70 backdrop-blur-sm border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-700 text-lg shadow-lg"
                >
                  <option value="significant-other">Significant Other</option>
                  <option value="friend">Friend</option>
                  <option value="family">Family Member</option>
                  <option value="colleague">Colleague</option>
                </select>

                <button
                  onClick={handleSubmit}
                  disabled={!message.trim()}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 md:py-5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-xl font-medium transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  Relaii it!
                </button>
              </motion.div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {showChat && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                className="w-full lg:w-1/2 flex items-center justify-center py-8"
              >
                <div className="w-full max-w-xl">
                  <ChatBox messages={messages} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Join Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md mx-auto bg-white rounded-2xl shadow-xl z-50 p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Join Relaii</h2>
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-indigo-600 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-gray-50/50 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-600 placeholder:text-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-indigo-600 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 bg-gray-50/50 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-600 placeholder:text-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-indigo-600 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 bg-gray-50/50 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-600 placeholder:text-gray-400"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
          
        </div>
      </main>
    </div>
  )
}

export default App