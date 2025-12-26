import React, { useState, useRef, useEffect, useMemo } from "react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { motion } from "framer-motion";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

const AiChat = () => {
  const ai = useMemo(
    () =>
      new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY2,
      }),
    []
  );

  const { incompleteTasks, loading: taskLoad } = useTask();
  const {user} =useAuth()

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);
  const hasWelcomedRef = useRef(false); // 🔐 prevents duplicate AI calls

  /* ------------------ AUTO SCROLL ------------------ */
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* -------- AI WELCOME (ONLY ONCE AFTER TASK LOAD) -------- */
  useEffect(() => {
    if (
      taskLoad ||
      !incompleteTasks?.length ||
      hasWelcomedRef.current
    )
      return;

    hasWelcomedRef.current = true;

    const taskTitles = incompleteTasks.map((t) => t.title).join(", ");

    const welcomeAI = async () => {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Say Welcome to ProTask & Hello How are you ${user.name}.
These are your tasks: ${taskTitles}.
Explain how to complete them efficiently in short bullet points.`,
        });

        setMessages([
          {
            role: "ai",
            text: response.text,
          },
        ]);
      } catch {
        setMessages([
          {
            role: "ai",
            text: "⚠️ Failed to load task guidance.",
          },
        ]);
      }
    };

    welcomeAI();
  }, [taskLoad, incompleteTasks, ai]);

  /* ------------------ SEND MESSAGE ------------------ */
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userText,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: response.text },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 shadow-md rounded-xl">
      {/* CHAT AREA */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 relative"
      >
        {messages.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <p className="text-xl font-semibold text-center">
              Ask about your tasks or anything ✨
            </p>
          </div>
        )}

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
                code({ inline, className, children }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline ? (
                    <SyntaxHighlighter language={match?.[1] || "javascript"}>
                      {String(children)}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-200 px-1 rounded">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </motion.div>
        ))}

        {loading && (
          <div className="bg-white p-3 w-fit rounded-xl shadow">
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-4 bg-white flex gap-2 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border rounded-xl px-4 py-2 outline-none"
          placeholder="Ask something..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiChat;
