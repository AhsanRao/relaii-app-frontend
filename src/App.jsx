import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import StatementCarousel from "./components/StatementCarousel";
import ChatBox from "./components/ChatBox";
import ClosingPage from "./components/ClosingPage";
import { Instagram } from "lucide-react";

function App() {
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("significant-other");
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(true);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Form data for Join modal
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const relationshipOptions = [
    { value: "significant-other", label: "Significant Other" },
    { value: "friend", label: "Friend" },
    { value: "mom", label: "Mom" },
    { value: "dad", label: "Dad" },
    { value: "sibling", label: "Sibling" },
    { value: "boss", label: "Boss" },
    { value: "coworker", label: "Coworker" },
    { value: "teacher", label: "Teacher" },
  ];

  // Submit user message => mock some chat responses
  const handleSubmit = async () => {
    if (!message.trim()) return;

    const mockResponse = [
      { role: "assistant", content: "Hey, how's your day going?" },
      { role: "user", content: "It's been okay, just busy with work." },
      {
        role: "assistant",
        content:
          "That makes sense. Sometimes when we're busy, it's hard to express what's really on our mind. Have you been feeling that way?",
      },
      { role: "user", content: "Yeah, I guess I have..." },
      {
        role: "assistant",
        content:
          "It's natural. Often the things we want to say get buried under daily stress. What would you want them to know if you could share freely?",
      },
      {
        role: "user",
        content: "I just wish I could tell them how I really feel...",
      },
      {
        role: "assistant",
        content:
          "Those feelings are valid. Maybe start with small moments of honesty - they often lead to deeper understanding.",
      },
      { role: "user", content: "You're right. I should try that." },
      {
        role: "assistant",
        content: "Take your time. The right words will come when you're ready.",
      },
    ];

    try {
      setIsLoading(true);
      setMessages([]);
      const response = await fetch(`${apiBaseUrl}/chat/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          subject: selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate chat");
      }

      setIsLoading(false);

      const data = await response.json();
      setMessages(data.messages);
      setShowChat(true);
      setMessage("");
    } catch (error) {
      console.error("Error generating chat:", error);
      setIsLoading(false);
    }
  };

  // "Join" modal form submit
  const handleJoinSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiBaseUrl}/users/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to join");
      }

      setShowModal(false);
      setShowThankYou(true);
      setFormData({ name: "", email: "", phone: "" });

      // Hide thank you message after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    } catch (error) {
      console.error("Error joining:", error);
    }
  };

  // Auto-scroll to chat when it appears
  useEffect(() => {
    if (showChat) {
      setShowMoreInfo(true);
      // setShowFloatingButton(true);
    }
  }, [showChat]);
  useEffect(() => {
    const handleScroll = () => {
      const closingSection = document.getElementById("closing-section");
      if (closingSection) {
        const rect = closingSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setShowFloatingButton(true);
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-x-hidden background-image">
    <div
      className="min-h-screen w-screen overflow-x-hidden overlay-container"
      style={{
        backgroundImage: 'var(--background-image)',
        backgroundSize: 'var(--background-size)',
        backgroundPosition: 'var(--background-position)',
        backgroundRepeat: 'var(--background-repeat)',
        position: 'relative',
      }}
    > 
    {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="w-full max-w-[2000px] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-4xl md:text-5xl font-bold italic bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text cursor-pointer font-relaii"
          >
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

      {/* Thank You Notification */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3"
          >
            <div className="text-green-600 font-medium">
              Thanks for joining! Check your email for next steps.
            </div>
            <button
              onClick={() => setShowThankYou(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="w-full min-h-screen pt-[80px]">
        {/* Landing Section */}
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Left Side: Carousel + Form */}
          <div className="w-auto  flex flex-col justify-center py-8">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="pt-8 h-[250px]"
              >
                <StatementCarousel />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center"
                >
                {/* Say what's on your mind and hear what's on theirs—anonymously,
                thoughtfully, and effortlessly. */}
                We use AI to have the conversations you wish you could, for you.
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

                <div className="flex items-center space-x-4">
                  <label className="text-gray-700 text-lg font-medium">
                    To who:{" "}
                  </label>
                  <div className="relative flex-1">
                    <select
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="w-full p-3 md:p-4 bg-white/70 backdrop-blur-sm border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-700 text-lg shadow-lg appearance-none pr-12"
                    >
                      {relationshipOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 md:py-5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-xl font-medium transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <span className="ml-2">Relaiing</span>
                    </div>
                  ) : (
                    "Relaii it!"
                  )}
                </button>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Chat Section */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="w-full lg:w-1/2 flex items-center justify-center py-8"
              >
                <div className="w-full max-w-xl">
                  <ChatBox
                    messages={messages}
                    selectedOption={selectedOption}
                  />
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Instagram Icon */}
        {showFloatingButton && (
          <a
            href="https://www.instagram.com/relaii_it/"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            id="closing-section"
          >
            <Instagram className="w-6 h-6 text-pink-600" /> {/* Instagram icon */}
          </a>
        )}

        {/* Additional Info Section (ClosingPage) */}
        <AnimatePresence>
          {showMoreInfo && (
            <motion.div
              key="closing"
              id="closing-section"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="mt-8 px-4 md:px-8 max-w-[2000px] mx-auto"
            >
              <ClosingPage onJoinClick={() => setShowModal(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modal Section */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-xl z-50 p-6 md:p-8 mx-auto"
            >
              <div className="text-4xl md:text-5xl pb-2 font-bold italic bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text cursor-pointer text-center font-relaii">
                Relaii
              </div>
              {/* <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Join Relaii
              </h2> */}
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-indigo-600 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 bg-gray-50/50 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-600 placeholder:text-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-indigo-600 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 bg-gray-50/50 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-600 placeholder:text-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-indigo-600 mb-1"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
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
                    Join
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
