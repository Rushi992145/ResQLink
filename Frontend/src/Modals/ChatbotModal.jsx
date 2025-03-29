import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Groq from "groq-sdk";

const ChatbotModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    // Initial system message to set context
    {
      role: "system",
      content:
        "You are a helpful AI learning assistant. Provide clear, concise, and informative responses. Remember the context of our previous conversation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatMessage = (text) => {
    // Split the text by newline characters and create paragraphs
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
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

    // Add user message to conversation history
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Prepare messages for API call (limit to last 5 to prevent context overflow)
      const contextMessages = updatedMessages.slice(-6);

      const completion = await groq.chat.completions.create({
        messages: contextMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        model: "llama-3.3-70b-versatile",
        max_tokens: 500, // Limit response length
      });

      const res = completion.choices[0].message.content;

      // Add AI response to conversation history
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-[700px] h-[700px] bg-white rounded-xl shadow-2xl border border-green-200 flex flex-col overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b border-green-200 flex-shrink-0">
            <h2 className="text-xl font-semibold text-green-800">
              AI Learning Assistant
            </h2>
            <button
              onClick={onClose}
              className="text-green-600 hover:text-green-800"
            >
              Close
            </button>
          </div>

          {/* Chat Messages - Scrollable Container */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {messages
              .filter((msg) => msg.role !== "system") // Hide system message
              .map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-green-200 ml-auto"
                      : "bg-green-100 mr-auto"
                  }`}
                >
                  {msg.role === "assistant"
                    ? formatMessage(msg.content)
                    : msg.content}
                </div>
              ))}
            {isLoading && (
              <div className="p-3 bg-green-100 rounded-lg">
                Generating response...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-green-200 flex items-center flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && clickHandler()}
              placeholder="Ask about your learning journey..."
              className="flex-grow p-2 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={clickHandler}
              disabled={isLoading}
              className="ml-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatbotModal;
