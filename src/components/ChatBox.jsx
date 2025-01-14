// import React, { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

// const ChatBox = ({ messages, selectedOption }) => {
//   const messagesEndRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = 0;
//     }
//   }, [messages]);

//   const getRelationshipTitle = (option) => {
//     const titles = {
//       'significant-other': 'Partner',
//       'friend': 'Friend',
//       'family': 'Family Member',
//       'colleague': 'Colleague'
//     };
//     return titles[option] || option;
//   };

//   const messageVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -20 }
//   };

//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col h-[calc(100vh-12rem)]">
//       {/* Chat Header */}
//       <div className="border-b border-gray-200 p-4 md:p-6">
//         <h3 className="text-lg font-semibold text-gray-800">
//           Relaii's Conversation with your {getRelationshipTitle(selectedOption)}
//         </h3>
//         <p className="text-sm text-gray-500">Here's what your input looks like to them</p>
//       </div>

//       {/* Messages */}
//       <div 
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//       >
//         {messages.map((message, index) => (
//   <motion.div
//     key={index}
//     variants={messageVariants}
//     initial="initial"
//     animate="animate"
//     exit="exit"
//     transition={{ 
//       duration: 0.5, 
//       delay: index * 0.5,
//       ease: "easeOut" 
//     }}
//     className={`flex ${message.role === 'relaii' ? 'justify-start' : 'justify-end'}`}
//   >
//     <div className="relative max-w-[80%] pl-3">
//       {message.role === 'relaii' && (
//         <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
//           <span className="text-[10px] font-bold text-white">R</span>
//         </div>
//       )}
//       <div
//         className={`p-3 rounded-2xl ${
//           message.role === 'relaii'
//             ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
//             : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm'
//         }`}
//       >
//         <p className="text-[15px] leading-relaxed">{message.content}</p>
//       </div>
//     </div>
//   </motion.div>
// ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Footer */}
//       <div className="border-t border-gray-200 p-4 text-sm text-gray-500 text-center">
//         This chat is for illustrative purposes only.
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ChatBox = ({ messages, selectedOption }) => {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [messages]);

  const getRelationshipTitle = (option) => {
    const titles = {
      'significant-other': 'Significant Other',
      'friend': 'Friend',
      'mom': 'Mom',
      'dad': 'Dad',
      'sibling': 'Sibling',
      'boss': 'Boss',
      'coworker': 'Coworker',
      'teacher': 'Teacher'
    };
    return titles[option] || option;
  };

  const getMessageIcon = (role) => {
    const icons = {
      'relaii': 'R',
      'significant-other': 'S',
      'friend': 'F',
      'mom': 'M',
      'dad': 'D',
      'sibling': 'S',
      'boss': 'B',
      'coworker': 'C',
      'teacher': 'T',
    };
    return icons[role] || role.charAt(0).toUpperCase();
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col h-[calc(100vh-10rem)]">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Relaii's Conversation with your {getRelationshipTitle(selectedOption)}
        </h3>
        <p className="text-sm text-gray-500">Here's what your input looks like to them</p>
      </div>

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            variants={messageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ 
              duration: 0.5, 
              delay: index * 0.5,
              ease: "easeOut" 
            }}
            className={`flex ${message.role === 'relaii' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`relative max-w-[80%] ${message.role === 'relaii' ? 'pl-3' : 'pr-3'}`}>
              <div 
                className={`absolute ${
                  message.role === 'relaii' ? '-left-4' : '-right-4'
                } top-1/2 -translate-y-1/2 w-5 h-5 rounded-full ${
                  message.role === 'relaii' ? 'bg-indigo-600' : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                } flex items-center justify-center`}
              >
                <span className="text-[10px] font-bold text-white">
                  {getMessageIcon(message.role)}
                </span>
              </div>
              <div
                className={`p-3 rounded-2xl ${
                  message.role === 'relaii'
                    ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm'
                }`}
              >
                <p className="text-[15px] leading-relaxed">{message.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 text-sm text-gray-500 text-center">
        This chat is for illustrative purposes only.
      </div>
    </div>
  );
};

export default ChatBox;