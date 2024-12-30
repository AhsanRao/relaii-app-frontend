import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Split statements into static and dynamic parts
const statements = [
  { static: "Tell your partner what you're really thinking", dynamic: "without the argument." },
  { static: "Ask for the raise you deserve", dynamic: "no uncomfortable conversations required." },
  { static: "Let your friend know their posts are cringe-worthy", dynamic: "without making it awkward." },
  { static: "Help a loved one feel appreciated", dynamic: "with words that truly land." },
  { static: "Tell your sibling how proud you are", dynamic: "without overcomplicating it." },
  { static: "Get your roommate to clean up", dynamic: "no passive-aggressive notes needed." },
  { static: "Get your coworker back on track", dynamic: "without creating tension." },
  { static: "Reconnect with an old friend", dynamic: "in a way that feels natural." },
  { static: "Share your concerns about their habits", dynamic: "without causing defensiveness." },
  { static: "Ask for more quality time together", dynamic: "and actually get it." },
  { static: "Let your parent know you're struggling", dynamic: "without breaking their heart." },
  { static: "Disagree with their argument", dynamic: "and keep the peace." },
  { static: "Tell your crush how you feel", dynamic: "without risking what you already have." },
  { static: "End the relationship you've outgrown", dynamic: "with clarity and kindness." },
  { static: "Help a friend realize their job is breaking them", dynamic: "without breaking them." },
  { static: "Ask your boss for freedom from micromanagement", dynamic: "in a way they'll respect." },
  { static: "Let your partner know you need space", dynamic: "without making it a big deal." },
  { static: "Let them know you miss them", dynamic: "in a way that brings you closer." },
  { static: "Say their jokes miss the mark", dynamic: "without embarrassing anyone." },
  { static: "Set boundaries in your relationship", dynamic: "and make them stick." },
  { static: "Tell your partner they're working too hard", dynamic: "without piling on more pressure." },
  { static: "NNN", dynamic: "Never Nag Again." },
  { static: "Tell them how much you care", dynamic: "without feeling vulnerable." },
  { static: "Get the help you need from your team", dynamic: "while still looking strong." },
  { static: "Let them know they've changed", dynamic: "without starting a fight." },
  { static: "Be honest about your feelings", dynamic: "and feel heard." },
  { static: "Ask them to stay", dynamic: "without making it all about you." },
  { static: "Encourage them to slow down", dynamic: "without adding more stress." },
  { static: "Let them know they've hurt you", dynamic: "while keeping the connection intact." },
  { static: "Turn your shower thoughts", dynamic: "into reality." }
];

const TypingEffect = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
  
    useEffect(() => {
      setDisplayText('');
      setIsTyping(true);
      setIsComplete(false);
    }, [text]);
  
    useEffect(() => {
      if (!isTyping) return;
  
      if (displayText.length < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
      }
    }, [displayText, text, isTyping]);
  
    return (
      <span className="text-indigo-600">
        {displayText}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
            className="ml-1 inline-block"
          >
            |
          </motion.span>
        )}
      </span>
    );
  };
  
  const StatementCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(
      Math.floor(Math.random() * statements.length)
    );
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % statements.length);
      }, 6000); // Increased time to account for typing animation
  
      return () => clearInterval(timer);
    }, []);
  
    const goToPrevious = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? statements.length - 1 : prevIndex - 1
      );
    };
  
    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % statements.length);
    };
  
    return (
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goToPrevious}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow hover:shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 text-indigo-600" />
          </button>
  
          <div className="relative overflow-hidden flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  <span className="text-gray-800">{statements[currentIndex].static} - </span>
                  <TypingEffect text={statements[currentIndex].dynamic} />
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>
  
          <button
            onClick={goToNext}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow hover:shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      </div>
    );
  };
  
  export default StatementCarousel;