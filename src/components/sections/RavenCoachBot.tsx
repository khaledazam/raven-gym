"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Dumbbell, Sparkles, User, Bot, HelpCircle } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

// Structured mock database of gym answers in Arabic and English
const FITNESS_DATABASE: { keywords: string[]; response: string }[] = [
  {
    keywords: ["chest", "صدر", "بنش", "بنج"],
    response: `🏋️ **Raven Chest Workout Plan:**
1. **Incline Dumbbell Press:** 4 sets x 8-10 reps (Focus on upper chest).
2. **Flat Barbell Bench Press:** 3 sets x 6-8 reps (Strength builder).
3. **Weighted Dips:** 3 sets x 8-12 reps (Lower chest/triceps).
4. **Cable Crossover (High to Low):** 3 sets x 12-15 reps (Peak contraction).

💡 *Tip: Squeeze your shoulder blades together and keep your elbows at a 45-degree angle to protect your joints.*`
  },
  {
    keywords: ["back", "ضهر", "ظهر"],
    response: `✈️ **Raven Back Workout Plan:**
1. **Deadlifts:** 3 sets x 5 reps (Overall power).
2. **Pull-Ups / Lat Pulldown:** 4 sets x 8-12 reps (Width).
3. **Bent-Over Barbell Rows:** 3 sets x 8-10 reps (Thickness).
4. **Seated Cable Row:** 3 sets x 12 reps (Mid-back stretch).

💡 *Tip: Pull with your elbows, not your hands, to fully engage the latissimus dorsi.*`
  },
  {
    keywords: ["squat", "اسكوات", "رجل", "legs", "فخذ"],
    response: `🦵 **Raven Legs Workout Plan:**
1. **Barbell Back Squats:** 4 sets x 6-8 reps (Leg builder).
2. **Romanian Deadlifts:** 3 sets x 8-10 reps (Hamstrings/glutes).
3. **Leg Press:** 3 sets x 10-12 reps (Quad focus).
4. **Standing Calf Raises:** 4 sets x 15 reps.

💡 *Tip: Keep your feet flat on the ground. Drive through your heels on the way up.*`
  },
  {
    keywords: ["split", "جدول", "تقسيم", "3 days", "3 ايام"],
    response: `📅 **Premium 3-Day Push/Pull/Legs Split:**
* **Day 1: Push** (Chest, Shoulders, Triceps)
* **Day 2: Pull** (Back, Biceps, Rear Delts)
* **Day 3: Legs & Core** (Quads, Hamstrings, Calves, Abs)

This split allows for maximum recovery and high-frequency training when repeated.`
  },
  {
    keywords: ["diet", "دايت", "اكل", "تغذية", "nutrition", "كالوري", "سعرات"],
    response: `🍎 **Raven Nutrition Rulebook:**
* **Protein:** Aim for 1.6 to 2.2g of protein per kg of bodyweight.
* **Carbs:** Fuel your workouts with complex carbs (Oats, Sweet Potato, Brown Rice).
* **Fats:** Keep healthy fats (Nuts, Olive oil, Avocado) for hormone health.

👉 Use our **Raven AI Coach Calculator** on the website to compute your precise daily calorie and protein requirements based on your metrics!`
  },
  {
    keywords: ["hi", "hello", "مرحب", "سلام", "اهلا"],
    response: `👋 Welcome to Raven Gym! I am your AI Coach. How can I help you build your dream physique today? Ask me about chest/back/leg workouts, nutrition, or try one of the quick options below!`
  }
];

export default function RavenCoachBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Welcome to Raven Gym! I am your AI Fitness Coach. Ask me any question about exercises, workouts, splits, or diet!",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking and reply
    setTimeout(() => {
      let botResponse = `💪 That's a great question! For custom exercises and coaching, we highly recommend speaking directly to one of our head trainers at Raven Gym. 

To help you get started immediately, try asking me specifically about:
- **"Chest workout"** or **"Back workout"**
- **"Legs workout"**
- **"3-Day split"**
- **"Diet and nutrition"**`;

      const normalizedText = textToSend.toLowerCase();
      for (const item of FITNESS_DATABASE) {
        if (item.keywords.some((kw) => normalizedText.includes(kw))) {
          botResponse = item.response;
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: botResponse,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[360px] md:w-[400px] h-[520px] rounded-2xl border border-[#d4af37]/30 bg-black/85 backdrop-blur-xl shadow-[0_10px_50px_rgba(212,175,55,0.15)] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-black via-[#111] to-[#1a1505] border-b border-[#d4af37]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#aa8410] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <Dumbbell className="w-5 h-5 text-black" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
                    Raven AI Coach
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                  </h3>
                  <p className="text-[#d4af37] text-xs font-semibold">Active Fitness Guide</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-[#d4af37]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-[#d4af37] text-black font-semibold rounded-tr-none shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                        : "bg-zinc-950 border border-zinc-800 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800 text-gray-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce delay-200" />
                    <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 bg-black/40 border-t border-zinc-900 flex flex-wrap gap-2">
              <button
                onClick={() => handleSend("Chest workout")}
                className="text-xs px-2.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#d4af37]/30 text-gray-300 hover:text-white transition-all flex items-center gap-1"
              >
                Chest workout 🏋️
              </button>
              <button
                onClick={() => handleSend("3-Day split")}
                className="text-xs px-2.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#d4af37]/30 text-gray-300 hover:text-white transition-all flex items-center gap-1"
              >
                3-Day split 📅
              </button>
              <button
                onClick={() => handleSend("Squat form")}
                className="text-xs px-2.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#d4af37]/30 text-gray-300 hover:text-white transition-all flex items-center gap-1"
              >
                Squat form 🦵
              </button>
            </div>

            {/* Message Input */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-900 flex gap-2">
              <input
                type="text"
                placeholder="Ask about workouts, exercises..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(inputText);
                }}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
              />
              <button
                onClick={() => handleSend(inputText)}
                className="bg-gradient-to-r from-[#d4af37] to-[#aa8410] hover:from-[#aa8410] hover:to-[#d4af37] text-black font-bold p-2.5 rounded-xl transition-all shadow-[0_0_10px_rgba(212,175,55,0.2)] flex items-center justify-center shrink-0 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#aa8410] hover:from-[#aa8410] hover:to-[#d4af37] flex items-center justify-center shadow-[0_5px_25px_rgba(212,175,55,0.4)] text-black relative focus:outline-none cursor-pointer group"
      >
        <span className="absolute inset-0 rounded-full bg-[#d4af37] opacity-20 group-hover:scale-125 transition-transform duration-500 animate-ping" />
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <MessageSquare className="w-6 h-6 stroke-[2.5]" />
        )}
      </motion.button>
    </div>
  );
}
