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
// Structured mock database of gym answers in Arabic
const FITNESS_DATABASE: { keywords: string[]; response: string }[] = [
  {
    keywords: ["chest", "صدر", "بنش", "بنج"],
    response: `🏋️ **جدول تدريب الصدر في Raven:**
1. **تجميع دمبل عالي (Incline DB Press):** 4 مجموعات × 8-10 تكرارات (تركيز على الصدر العلوي).
2. **بنش بار مستوي (Flat Barbell Bench):** 3 مجموعات × 6-8 تكرارات (لبناء القوة والكتلة).
3. **متوازي / غطس بوزن (Weighted Dips):** 3 مجموعات × 8-12 تكرار (للصدر السفلي والترايسبس).
4. **كابل كروس أوفر (Cable Crossover):** 3 مجموعات × 12-15 تكرار (عصر عضلي كامل).

💡 *نصيحة: ضم لوحي الكتف للخلف وحافظ على زاوية كوعك عند 45 درجة لحماية مفصل الكتف.*`
  },
  {
    keywords: ["back", "ضهر", "ظهر"],
    response: `✈️ **جدول تدريب الظهر في Raven:**
1. **ديدليفت (Deadlifts):** 3 مجموعات × 5 تكرارات (للقوة العامة وكثافة الظهر).
2. **سحب عالي / عقلة (Lat Pulldown):** 4 مجموعات × 8-12 تكرار (لعرض الظهر والمجنص).
3. **تجديف بالبار (Barbell Rows):** 3 مجموعات × 8-10 تكرارات (لسماكة الظهر).
4. **سحب أرضي بالكابل (Seated Cable Row):** 3 مجموعات × 12 تكرار.

💡 *نصيحة: اسحب بكوعك للخلف وليس بقبضة يدك لتركيز التفعيل على عضلات الظهر.*`
  },
  {
    keywords: ["squat", "اسكوات", "سكوات", "رجل", "legs", "فخذ"],
    response: `🦵 **جدول تدريب الأرجل في Raven:**
1. **باربل باك سكوات (Barbell Squats):** 4 مجموعات × 6-8 تكرارات (لبناء عضلات الفخذ).
2. **ديدليفت روماني (Romanian Deadlifts):** 3 مجموعات × 8-10 تكرارات (للخلفيات والجلوتس).
3. **جهاز دفع الأرجل (Leg Press):** 3 مجموعات × 10-12 تكرار.
4. **سمانة واقف (Standing Calf Raises):** 4 مجموعات × 15 تكرار.

💡 *نصيحة: حافظ على ثبات كعب قدمك على الأرض وادفع من خلاله أثناء الصعود.*`
  },
  {
    keywords: ["split", "جدول", "تقسيم", "3 days", "3 ايام", "نظام"],
    response: `📅 **جدول Push/Pull/Legs الاحترافي (3 أيام):**
* **اليوم 1: Push (دفع)** - صدر، أكتاف أمامية وجانبية، ترايسبس.
* **اليوم 2: Pull (سحب)** - ظهر كامل، بايسبس، كتف خلفي.
* **اليوم 3: Legs (أرجل)** - كوادز، خلفيات، سمانة، بطن.

يمنحك هذا النظام وقتاً كافياً للاستشفاء مع تحقيق أعلى معدل نمو عضلي.`
  },
  {
    keywords: ["diet", "دايت", "اكل", "تغذية", "nutrition", "كالوري", "سعرات", "بروتين"],
    response: `🍎 **قواعد التغذية الرياضية في Raven:**
* **البروتين:** احرص على تناول 1.6 إلى 2.2 جرام بروتين لكل كيلوجرام من وزن جسمك.
* **الكاربوهيدرات:** وقود تمرينك الأساسي (شوفان، بطاطا، أرز، بطاطس).
* **الدهون الصحية:** مهمة جداً لصحة الهرمونات (مكسرات، زيت زيتون، أفوكادو).

👉 يمكنك تجربة **حاسبة Raven للتغذية** في الصفحة لحساب سعراتك والماكروز بدقة!`
  },
  {
    keywords: ["مواعيد", "فتح", "شغال", "ساعة", "وقت", "ساعه", "hours", "open", "time"],
    response: `🕒 **مواعيد العمل في Raven Gym:**
جيم Raven Gym مفتوح **24 ساعة طوال أيام الأسبوع (24/7)** على مدار اليوم، لتتمرن في أي وقت يناسب يومك بدون قيود!`
  },
  {
    keywords: ["hi", "hello", "مرحب", "سلام", "اهلا", "صباح", "مساء"],
    response: `👋 أهلاً بك في Raven Gym! أنا مدربك الرياضي المساعد. كيف أساعدك اليوم في رحلتك البدنية؟ اسألني عن تمارين الصدر، الظهر، الأرجل، التغذية، أو اختر من الاقتراحات السريعة بالأسفل!`
  }
];

export default function RavenCoachBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 أهلاً بك في Raven Gym! أنا مدربك ومساعدك التدريبي. اسألني أي سؤال عن التمارين، الجداول، أو التغذية الرياضية!",
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
      let botResponse = `💪 سؤال رائع ومهم! للتمارين والبرامج المصممة خصيصاً لجسمك، يسعدنا تواصلك مع مدربي Raven Gym في الجيم.

يمكنك أن تسألني فوراً عن:
- **"تمرین صدر"** أو **"تمرین ظهر"**
- **"تمرین أرجل"**
- **"جدول 3 أيام"**
- **"التغذية والدايت"**`;

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
    <div className="fixed bottom-6 right-6 z-50 font-sans" dir="rtl">
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
                  <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                    Raven Coach
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                  </h3>
                  <p className="text-[#d4af37] text-xs font-semibold">دليلك التدريبي المباشر</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="إغلاق المحادثة"
                className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-start flex-row-reverse" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-[#d4af37]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-[#d4af37] text-black font-semibold rounded-tl-none shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                        : "bg-zinc-950 border border-zinc-800 text-gray-200 rounded-tr-none"
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
                  <div className="bg-zinc-950 border border-zinc-800 text-gray-200 p-3 rounded-2xl rounded-tr-none flex items-center gap-1">
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
                onClick={() => handleSend("تمرین صدر")}
                className="text-xs px-2.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#d4af37]/30 text-gray-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              >
                تمرین الصدر 🏋️
              </button>
              <button
                onClick={() => handleSend("جدول 3 ايام")}
                className="text-xs px-2.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#d4af37]/30 text-gray-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              >
                جدول 3 أيام 📅
              </button>
              <button
                onClick={() => handleSend("تكنيك الاسكوات")}
                className="text-xs px-2.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#d4af37]/30 text-gray-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              >
                تكنيك الاسكوات 🦵
              </button>
            </div>

            {/* Message Input */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-900 flex gap-2">
              <input
                type="text"
                placeholder="اسأل عن التمارين، الجداول، التغذية..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(inputText);
                }}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
              />
              <button
                onClick={() => handleSend(inputText)}
                aria-label="إرسال رسالة"
                className="bg-gradient-to-r from-[#d4af37] to-[#aa8410] hover:from-[#aa8410] hover:to-[#d4af37] text-black font-bold p-2.5 rounded-xl transition-all shadow-[0_0_10px_rgba(212,175,55,0.2)] flex items-center justify-center shrink-0 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="فتح المساعد الذكي Raven Coach"
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
