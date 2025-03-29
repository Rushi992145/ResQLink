import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatbotInterface from "./ChatbotInterface";
import { motion, AnimatePresence } from "framer-motion";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-0 bg-white text-green-600 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Need Help?
        </span>
      </motion.button>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && <ChatbotInterface onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default ChatbotButton;
