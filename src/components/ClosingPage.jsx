import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sliders, MessageCircle } from 'lucide-react';

const ClosingPage = ({ onJoinClick }) => {
  return (
    <div className="min-h-screen w-full bg-transparent from-indigo-50 via-white to-purple-50">
      <main className="w-full max-w-[2000px] mx-auto px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Value Proposition Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
            >
              <Shield className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Private & Secure</h3>
              <p className="text-gray-600">Every interaction is private and secure—your thoughts are shared, but your identity never is.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
            >
              <Sliders className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Customizable Options</h3>
              <p className="text-gray-600">Control tone, urgency, and style to reflect real-life communication.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
            >
              <MessageCircle className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Seamless Interaction</h3>
              <p className="text-gray-600">Relaii integrates your inputs into thoughtful, natural conversations that feel real.</p>
            </motion.div>
          </div>

          {/* Trust Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Privacy is our priority—Relaii will never reveal your identity or share your data.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <button
              onClick={onJoinClick}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90 transform hover:-translate-y-0.5"
            >
              Sign up now and start your journey with Relaii
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ClosingPage;