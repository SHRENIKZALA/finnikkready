"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Search } from "lucide-react";
import { CHATBOT_QA_DATABASE } from "@/content/chatbot-qa";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "👋 Hello! I'm FinniKK's AI Assistant. I can help you with questions about our services, tax compliance, GST, ROC requirements, and much more. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (userQuery: string): string | null => {
    const query = userQuery.toLowerCase().trim();
    if (query.length < 2) return null;

    let bestMatch = null;
    let bestScore = 0;

    for (const qa of CHATBOT_QA_DATABASE) {
      let score = 0;

      // Exact match in question
      if (qa.question.toLowerCase().includes(query)) {
        score += 100;
      }

      // Keyword matches
      for (const keyword of qa.keywords) {
        if (query.includes(keyword.toLowerCase())) {
          score += 50;
        }
        if (keyword.toLowerCase().includes(query)) {
          score += 30;
        }
      }

      // Category match
      if (qa.category.toLowerCase().includes(query)) {
        score += 20;
      }

      // Partial word match in question
      const questionWords = qa.question.toLowerCase().split(" ");
      for (const word of questionWords) {
        if (word.includes(query) || query.includes(word)) {
          score += 10;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = qa.answer;
      }
    }

    return bestScore > 0 ? bestMatch : null;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsSearching(true);

    // Simulate thinking time
    setTimeout(() => {
      const answer = findBestMatch(inputValue);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content:
          answer ||
          "I'm not sure about that. Could you please rephrase your question or contact us directly at +91 74360 06208 for more specific assistance?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsSearching(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSuggestedQuestions = () => {
    const categories = ["Contact", "Services", "GST & Indirect Taxation", "Direct Taxation"];
    const suggested = [];

    for (const category of categories) {
      const qa = CHATBOT_QA_DATABASE.find((q) => q.category === category);
      if (qa) {
        suggested.push(qa.question);
      }
    }

    return suggested.slice(0, 4);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Open chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl flex flex-col max-h-[600px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">FinniKK Assistant</h3>
              <p className="text-sm text-blue-100">Instant answers to your questions</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-800 p-1 rounded transition"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "user" ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isSearching && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-white">
              <p className="text-xs font-semibold text-gray-600 mb-2">Suggested Questions:</p>
              <div className="space-y-2">
                {getSuggestedQuestions().map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputValue(question);
                    }}
                    className="w-full text-left text-xs p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded transition truncate"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about our services..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isSearching}
              />
              <button
                onClick={handleSendMessage}
                disabled={isSearching || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Ask about services, tax compliance, GST, ROC requirements, or contact us directly.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
