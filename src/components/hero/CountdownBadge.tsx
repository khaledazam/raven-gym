"use client";

import React, { useState, useEffect } from "react";
import { Flame, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_PROMO_DAYS = 30;
const PROMO_STORAGE_KEY = "raven_launch_countdown_v1";

export default function CountdownBadge() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setMounted(true);
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

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || isExpired || !timeLeft) {
    return null;
  }

  const scrollToPromo = () => {
    const el = document.getElementById("countdown-promo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={scrollToPromo}
        className="absolute top-10 left-10 z-50 pointer-events-auto cursor-pointer group select-none hidden sm:block"
        dir="rtl"
      >
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-[#d4af37]/30 bg-black/60 backdrop-blur-md shadow-[0_4px_25px_rgba(212,175,55,0.15)] transition-all duration-300 hover:border-[#d4af37] hover:bg-black/80 hover:scale-105">
          <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
            <Flame className="w-4 h-4 animate-bounce" />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider flex items-center gap-1">
              <span>عرض الافتتاح ينتهي خلال</span>
            </span>
            <div className="flex items-center gap-1 font-mono font-black text-sm text-white group-hover:text-[#f5d77f] transition-colors" dir="ltr">
              <span className="text-[#f5d77f]">{timeLeft.days}d</span>
              <span className="text-gray-500">:</span>
              <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
              <span className="text-gray-500">:</span>
              <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
              <span className="text-gray-500">:</span>
              <span className="text-red-400">{String(timeLeft.seconds).padStart(2, "0")}s</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
