import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { motion } from "framer-motion";

const AiChat = () => {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const [messages, setMessages] = useState([]); // {role: "user"|"ai", text: "..."}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
      });

      const aiMessage = { role: "ai", text: response.text };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "⚠️ Error: Something went wrong. Try again later.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 shadow-md rounded-xl ">
      {/* CHAT AREA */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 relative"
      >
        <div className="opacity-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <p className="text-center text-xl font-semibold">
            Hello There, Ask About Your Task & Anything
          </p>
        </div>

        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`max-w-[80%] p-3 rounded-xl ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-white shadow"
            }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  return !inline ? (
                    <SyntaxHighlighter language={match?.[1] || "javascript"}>
                      {String(children)}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-200 px-1 rounded">{children}</code>
                  );
                },
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </motion.div>
        ))}

        {/* Typing animation */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-3 w-fit rounded-xl shadow"
          >
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-500"></div>
            </div>
          </motion.div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-4 bg-white flex gap-2 items-center border-t">
        <input
          type="text"
          className="flex-1 border rounded-xl px-4 py-2 outline-none"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiChat;
