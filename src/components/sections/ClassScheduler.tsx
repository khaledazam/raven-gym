"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Dumbbell, Sparkles, Loader2 } from "lucide-react";

interface WorkoutClass {
  id: string;
  name: string;
  time: string;
  duration: string;
  intensity: "High" | "Medium" | "Low";
  room: string;
  description: string;
  price?: number;
  capacity?: number;
  trainerName?: string;
  dayOfWeek?: string;
}

const EMPTY_SCHEDULE: Record<string, WorkoutClass[]> = {
  Saturday: [],
  Sunday: [],
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: []
};

const DAYS = [
  { key: "Saturday", label: "السبت" },
  { key: "Sunday", label: "الأحد" },
  { key: "Monday", label: "الإثنين" },
  { key: "Tuesday", label: "الثلاثاء" },
  { key: "Wednesday", label: "الأربعاء" },
  { key: "Thursday", label: "الخميس" },
  { key: "Friday", label: "الجمعة" },
];

export default function ClassScheduler() {
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const [activeClassDetails, setActiveClassDetails] = useState<WorkoutClass | null>(null);
  const [scheduleData, setScheduleData] = useState<Record<string, WorkoutClass[]>>(EMPTY_SCHEDULE);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveFromSystem, setIsLiveFromSystem] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSchedule() {
      try {
        const res = await fetch("/api/classes", { cache: "no-store" });
        const data = await res.json();

        if (!cancelled && data.success && data.data) {
          setScheduleData(data.data);
          setIsLiveFromSystem(true);
        }
      } catch (err) {
        console.error("Failed to fetch live schedule:", err);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadSchedule();
    return () => {
      cancelled = true;
    };
  }, []);

  const classes = scheduleData[selectedDay] || [];

  return (
    <section id="classes" className="w-full bg-black py-24 relative overflow-hidden border-t border-zinc-900" dir="rtl">
      {/* Glow Effect */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <span className="text-[#d4af37] text-xs font-semibold tracking-wider flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> جدول الحصص الأسبوعي
          </span>

          {isLiveFromSystem && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              محدّث مباشرة من السيستم
            </span>
          )}
        </div>

        <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-4">
          جدول التمارين والحصص <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab]">الأسبوعية</span>
        </h2>
        <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed mb-12">
          اختر يوم تمرينك، وتعرّف على تفاصيل ومواعيد الحصص التدريبية بإشراف مدربينا المعتمدين، واحجز مكانك في Raven Gym.
        </p>

        {/* Day Selectors */}
        <div className="flex overflow-x-auto gap-3 pb-6 border-b border-zinc-900 scrollbar-none">
          {DAYS.map((day) => {
            const count = (scheduleData[day.key] || []).length;
            return (
              <button
                key={day.key}
                onClick={() => {
                  setSelectedDay(day.key);
                  setActiveClassDetails(null);
                }}
                className={`px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedDay === day.key
                    ? "bg-[#d4af37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                    : "bg-zinc-950 border border-zinc-800 text-gray-400 hover:text-white hover:border-[#d4af37]/50"
                }`}
              >
                <span>{day.label}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedDay === day.key ? "bg-black/20 text-black font-black" : "bg-zinc-800 text-gray-300"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Timetable Grid and Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Classes List */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <div className="p-16 text-center rounded-2xl border border-zinc-900 bg-zinc-950/40 text-gray-400 space-y-3">
                <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin mx-auto" />
                <p className="text-white font-bold text-sm">جارٍ جلب جدول الحصص من السيستم...</p>
              </div>
            ) : classes.length === 0 ? (
              <div className="p-16 text-center rounded-2xl border border-zinc-900 bg-zinc-950/40 text-gray-400 space-y-3">
                <Dumbbell className="w-10 h-10 text-zinc-600 mx-auto" />
                <p className="text-white font-bold text-base">لا توجد حصص تدريبية مجدولة لهذا اليوم</p>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  يمكنك استعراض باقي أيام الأسبوع بالأعلى، أو زيارة صالة الأجهزة الحرة المتاحة يومياً في الجيم.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {classes.map((cls, idx) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    onClick={() => setActiveClassDetails(cls)}
                    className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer ${
                      activeClassDetails?.id === cls.id
                        ? "bg-gradient-to-r from-zinc-900 to-[#1a1505] border-[#d4af37] shadow-[0_5px_20px_rgba(212,175,55,0.05)]"
                        : "bg-zinc-950/80 hover:bg-zinc-900 border-zinc-900 hover:border-zinc-800"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                          cls.intensity === "High"
                            ? "bg-red-500/10 border-red-500/30 text-red-400"
                            : cls.intensity === "Medium"
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                            : "bg-green-500/10 border-green-500/30 text-green-400"
                        }`}>
                          {cls.intensity === "High" ? "شدة عالية" : cls.intensity === "Medium" ? "شدة متوسطة" : "شدة خفيفة"}
                        </span>
                        <span className="text-zinc-300 text-xs flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> {cls.duration}
                        </span>
                        {cls.capacity && (
                          <span className="text-[11px] text-zinc-500 font-medium">
                            سعة: {cls.capacity} متدرب
                          </span>
                        )}
                      </div>
                      <h3 className="text-white text-lg md:text-xl font-bold tracking-wide">
                        {cls.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{cls.room}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[#d4af37] text-sm font-semibold tracking-wider bg-[#d4af37]/5 border border-[#d4af37]/20 px-4 py-2 rounded-xl">
                        {cls.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Details & Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 rounded-3xl p-6 md:p-8 sticky top-24 min-h-[300px] flex flex-col justify-between">
              {activeClassDetails ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[#d4af37] text-xs font-bold tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" /> تفاصيل الحصة التدريبية
                    </span>
                    <span className="text-zinc-400 text-xs">{activeClassDetails.room}</span>
                  </div>

                  <div>
                    <h3 className="text-white text-2xl font-black tracking-wide leading-tight mb-2">
                      {activeClassDetails.name}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {activeClassDetails.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-zinc-900 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">المدة</span>
                      <span className="text-white font-bold">{activeClassDetails.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">التوقيت</span>
                      <span className="text-[#d4af37] font-bold">{activeClassDetails.time}</span>
                    </div>
                    {typeof activeClassDetails.price === "number" && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">سعر الحصة</span>
                        <span className="text-emerald-400 font-bold">
                          {activeClassDetails.price > 0 ? `${activeClassDetails.price} ج.م` : "مشمولة بالاشتراك"}
                        </span>
                      </div>
                    )}
                  </div>

                  <a 
                    href="/subscribe"
                    className="block text-center w-full bg-gradient-to-r from-[#d4af37] to-[#aa8410] text-black font-bold tracking-wider py-3.5 rounded-xl hover:from-[#aa8410] hover:to-[#d4af37] transition-all shadow-[0_5px_15px_rgba(212,175,55,0.2)] active:scale-95 text-sm cursor-pointer mt-4"
                  >
                    احجز مكانك في الحصة
                  </a>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">اختر حصة تدريبية</h4>
                    <p className="text-zinc-300 text-xs mt-1 max-w-[200px]">
                      اضغط على أي حصة من الجدول لعرض التفاصيل الكاملة، الوقت، واسم المدرب المسؤول.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
