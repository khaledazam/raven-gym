"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Clock, Sparkles, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

const TOTAL_PROMO_DAYS = 30;
const PROMO_STORAGE_KEY = "raven_launch_countdown_v1";

export default function CountdownPromo() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get or initialize target date (30 days from first set)
    let targetTime: number;
    try {
      const stored = localStorage.getItem(PROMO_STORAGE_KEY);
      if (stored) {
        targetTime = parseInt(stored, 10);
      } else {
        targetTime = Date.now() + TOTAL_PROMO_DAYS * 24 * 60 * 60 * 1000;
        localStorage.setItem(PROMO_STORAGE_KEY, targetTime.toString());
      }
    } catch {
      targetTime = Date.now() + TOTAL_PROMO_DAYS * 24 * 60 * 60 * 1000;
    }

    const updateTimer = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, totalMs: diff });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // When expired or before client mounting, disappear completely
  if (!mounted || isExpired || !timeLeft) {
    return null;
  }

  // Calculate percentage of remaining time out of 30 days
  const totalDurationMs = TOTAL_PROMO_DAYS * 24 * 60 * 60 * 1000;
  const progressPercent = Math.min(100, Math.max(0, (timeLeft.totalMs / totalDurationMs) * 100));

  const timeUnits = [
    { label: "يوم", value: String(timeLeft.days).padStart(2, "0") },
    { label: "ساعة", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "دقيقة", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "ثانية", value: String(timeLeft.seconds).padStart(2, "0"), highlight: true },
  ];

  return (
    <AnimatePresence>
      {!isExpired && (
        <motion.section
          id="countdown-promo"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, overflow: "hidden", transition: { duration: 0.8 } }}
          className="relative w-full bg-gradient-to-b from-black via-[#0c0903] to-black py-20 px-4 md:px-8 border-y border-[#d4af37]/20 overflow-hidden font-sans"
          dir="rtl"
        >
          {/* Intense Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4af37]/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[350px] h-[200px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            
            {/* Top Suspense Badge */}
            <div className="flex flex-col items-center text-center mb-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-red-500/15 via-[#d4af37]/20 to-red-500/15 border border-[#d4af37]/40 text-[#f5d77f] text-xs sm:text-sm font-bold tracking-wider mb-5 shadow-[0_0_25px_rgba(212,175,55,0.2)] animate-pulse"
              >
                <Flame className="w-4 h-4 text-red-400 animate-bounce" />
                <span>عرض الافتتاح والاشتراك الحصري | مهلة 30 يوماً فقط</span>
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
              </motion.div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white mb-4">
                العد التنازلي <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff1be] to-[#aa8410]">لإغلاق باب العرض</span>
              </h2>

              <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                ينتهي هذا العرض الاستثنائي تلقائياً وتعود الاشتراكات لسعرها الطبيعي فور انتهاء العداد أو اكتمال المقاعد.
              </p>
            </div>

            {/* Countdown Digits Grid */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-6 my-8">
              {timeUnits.map((unit, index) => (
                <React.Fragment key={unit.label}>
                  <div className="flex flex-col items-center">
                    {/* Glowing Digit Box */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/20 to-transparent rounded-2xl md:rounded-3xl blur-md group-hover:blur-lg transition-all" />
                      
                      <div className="relative w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-40 rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#18150a] via-[#0d0d0d] to-[#050505] border border-[#d4af37]/40 flex flex-col items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.9)] overflow-hidden">
                        
                        {/* Horizontal Cutout Line (Vintage flip-clock feel) */}
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.05)] z-10" />

                        {/* Top Light Reflection */}
                        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                        {/* The Number */}
                        <span className={`text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-tight select-none z-0 ${
                          unit.highlight ? "text-[#f5d77f] drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" : "text-white"
                        }`}>
                          {unit.value}
                        </span>

                        {/* Bottom subtle accent glow */}
                        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
                      </div>
                    </div>

                    {/* Unit Label */}
                    <span className="mt-3 text-xs sm:text-sm font-bold tracking-wider text-gray-400">
                      {unit.label}
                    </span>
                  </div>

                  {/* Pulsing Separator Colon */}
                  {index < timeUnits.length - 1 && (
                    <div className="flex flex-col gap-2 pb-8 sm:pb-10 select-none">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#d4af37] animate-ping" />
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#d4af37] opacity-60" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Time Depleting Progress Bar */}
            <div className="max-w-2xl mx-auto my-8 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400 px-1 font-semibold">
                <span className="flex items-center gap-1.5 text-[#d4af37]">
                  <Clock className="w-3.5 h-3.5" /> مهلة العرض المتبقية
                </span>
                <span>{timeLeft.days} يوم و {timeLeft.hours} ساعة متبقية</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-red-600 via-[#d4af37] to-[#f5d77f] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                />
              </div>
            </div>

            {/* Suspense Action CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/subscribe" className="w-full sm:w-auto">
                <button className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8410] hover:from-[#aa8410] hover:to-[#d4af37] px-10 py-5 font-heading text-base sm:text-lg font-bold tracking-wider text-black transition-all hover:scale-105 shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center gap-3 cursor-pointer">
                  <Zap className="w-5 h-5 fill-black stroke-none" />
                  <span className="relative z-10">الحق العرض واشترك الآن</span>
                  <ArrowLeft className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-x-1.5" />
                  <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </button>
              </Link>
            </div>

            {/* Guarantees row */}
            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-gray-400 text-center flex-wrap">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> تثبيت سعر العرض طوال فترة اشتراكك
              </span>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#d4af37]" /> تفعيل فوري للعضوية عبر إنستاباي
              </span>
            </div>

          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
