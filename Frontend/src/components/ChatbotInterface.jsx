import React, { useState, useEffect, useRef } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Groq from "groq-sdk";

const ChatbotInterface = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a helpful AI learning assistant. Provide clear, concise, and informative responses. Remember the context of our previous conversation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessage = (text) => {
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-2 last:mb-0 text-sm">
        {line}
      </p>
    ));
  };

  const clickHandler = async () => {
    if (!input.trim()) return;

    const groq = new Groq({
      apiKey: import.meta.env.VITE_API_KEY_GROQ,
      dangerouslyAllowBrowser: true,
    });

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const contextMessages = updatedMessages.slice(-6);

      const completion = await groq.chat.completions.create({
        messages: contextMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        model: "llama-3.3-70b-versatile",
        max_tokens: 500,
      });

      const res = completion.choices[0].message.content;
      const aiMessage = { role: "assistant", content: res };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage = {
        role: "assistant",
        content:
          "Sorry, there was an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-40"
      />

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-green-200 flex flex-col overflow-hidden z-50"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-green-50 border-b border-green-200">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-base font-semibold text-green-800">
              AI Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages
            .filter((msg) => msg.role !== "system")
            .map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-2.5 rounded-xl text-sm ${
                    msg.role === "user"
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-green-100 text-green-800 rounded-bl-none"
                  }`}
                >
                  {msg.role === "assistant"
                    ? formatMessage(msg.content)
                    : msg.content}
                </div>
              </motion.div>
            ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-green-100 text-green-800 p-2.5 rounded-xl rounded-bl-none">
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-green-200 bg-white">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && clickHandler()}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg bg-green-50 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clickHandler}
              disabled={isLoading}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              <Send size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatbotInterface;
