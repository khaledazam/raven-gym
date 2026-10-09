"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Dumbbell, Sparkles } from "lucide-react";

interface WorkoutClass {
  id: string;
  name: string;
  time: string;
  duration: string;
  intensity: "High" | "Medium" | "Low";
  room: string;
  description: string;
}

const SCHEDULE_DATA: Record<string, WorkoutClass[]> = {
  Saturday: [
    {
      id: "sat-1",
      name: "ملاكمة بطولات (Championship Boxing)",
      time: "08:00 ص - 09:30 ص",
      duration: "90 دقيقة",
      intensity: "High",
      room: "حلبة النزال (Combat Ring)",
      description: "تدريب مكثف على الشادو بوكسينج، فترات الملاكمة مع الأكياس الثقيلة، والعمل على الميتس لرفع قوة الضربة والتحمل العضلي."
    },
    {
      id: "sat-2",
      name: "رفع أثقال أولمبي (Olympic Lifting)",
      time: "10:30 ص - 12:00 م",
      duration: "90 دقيقة",
      intensity: "High",
      room: "صالة القوة والأوزان",
      description: "إتقان حركات الخطف (Snatch) والنتر (Clean & Jerk). تدريب تقني عالي يركز على القوة الانفجارية والسرعة الحركية."
    },
    {
      id: "sat-3",
      name: "حصة Raven HIIT المكثفة",
      time: "04:00 م - 05:00 م",
      duration: "60 دقيقة",
      intensity: "High",
      room: "منطقة التمارين الوظيفية (Turf)",
      description: "تمارين لياقة بدنية وحرق دهون لكامل الجسم تجمع بين الكيتل بيل، الحبال الثقيلة، وسحب الأوزان لرفع كفاءة القلب."
    }
  ],
  Sunday: [
    {
      id: "sun-1",
      name: "مرونة واستشفاء ويوجا (Mobility & Flow)",
      time: "09:00 ص - 10:15 ص",
      duration: "75 دقيقة",
      intensity: "Low",
      room: "استوديو الاسترخاء والمرونة",
      description: "إطالات عميقة، تدفقات حركية لتليين المفاصل، وتمارين تنفس لتخفيف آلام العضلات وزيادة المدى الحركي."
    },
    {
      id: "sun-2",
      name: "تضخيم الصدر والظهر (Chest & Back)",
      time: "02:00 م - 03:30 م",
      duration: "90 دقيقة",
      intensity: "Medium",
      room: "صالة القوة والأوزان",
      description: "تدريب بناء عضلي عالي الكثافة يستهدف تطوير سمك وعرض عضلات الصدر والظهر باستخدام تكنيك التوتر الميكانيكي."
    },
    {
      id: "sun-3",
      name: "لياقة وأداء رياضي متقدم (Athletic Performance)",
      time: "06:00 م - 07:30 م",
      duration: "90 دقيقة",
      intensity: "High",
      room: "منطقة التمارين الوظيفية (Turf)",
      description: "تمارين بليومتريكس، تسارع، وثبات عضلات الجذع مصممة للرياضيين لزيادة سرعة الانطلاق والقفز العمودي."
    }
  ],
  Monday: [
    {
      id: "mon-1",
      name: "كروس فيت WOD احترافي",
      time: "07:00 ص - 08:30 ص",
      duration: "90 دقيقة",
      intensity: "High",
      room: "منطقة التمارين الوظيفية (Turf)",
      description: "تمرين اليوم الكلاسيكي عالي الشدة: جمباز رياضي، رفع أوزان حرة، وتمارين رفع لياقة مكثفة."
    },
    {
      id: "mon-2",
      name: "أساسيات الباورلفتنج (Powerlifting)",
      time: "11:00 ص - 12:30 م",
      duration: "90 دقيقة",
      intensity: "High",
      room: "صالة القوة والأوزان",
      description: "تدريب مركز على الحركات الكبرى الثلاث: السكوات، البنش برس، والديدليفت، مع التركيز على القوة المطلقة والتكنيك السليم."
    },
    {
      id: "mon-3",
      name: "تقوية عضلات الكور والاستشفاء (Core & Recovery)",
      time: "05:00 م - 06:00 م",
      duration: "60 دقيقة",
      intensity: "Low",
      room: "استوديو الاسترخاء والمرونة",
      description: "تقوية عضلات الجذع والبطن العميقة مع جلسات الفوم رولر ومساج تحرير نقاط التوتر العضلي."
    }
  ],
  Tuesday: [
    {
      id: "tue-1",
      name: "كمال أجسام وظيفي (Functional Bodybuilding)",
      time: "09:00 ص - 10:30 ص",
      duration: "90 دقيقة",
      intensity: "Medium",
      room: "صالة القوة والأوزان",
      description: "دمج تمارين تشكيل وتضخيم العضلات مع الحركات الوظيفية لتتمتع بمظهر رياضي جذاب وحركة رشيقة وقوية."
    },
    {
      id: "tue-2",
      name: "مواي تاي ودفاع عن النفس (Muay Thai)",
      time: "04:30 م - 06:00 م",
      duration: "90 دقيقة",
      intensity: "High",
      room: "حلبة النزال (Combat Ring)",
      description: "تعلّم فن الأطراف الثمانية: ضربات الكوع والركبة، العمل على أهداف الملاكمة، واستراتيجيات الدفاع والهجوم."
    }
  ],
  Wednesday: [
    {
      id: "wed-1",
      name: "تمارين حرق الدهون واللياقة (Metabolic Conditioning)",
      time: "08:00 ص - 09:15 ص",
      duration: "75 دقيقة",
      intensity: "High",
      room: "منطقة التمارين الوظيفية (Turf)",
      description: "تمارين التحمل الهوائي باستخدام أجهزة التجديف، الدراجات الهوائية، وتمارين وزن الجسم لحرق السعرات بكفاءة عالية."
    },
    {
      id: "wed-2",
      name: "سرعة وديناميكية الباربيل (Barbell Cycling)",
      time: "03:00 م - 04:30 م",
      duration: "90 دقيقة",
      intensity: "High",
      room: "صالة القوة والأوزان",
      description: "تطوير معدل توليد القوة والسرعة الحركية من خلال تكرارات السكوات والرفعات الأولمبية السريعة."
    }
  ]
};

const DAYS = [
  { key: "Saturday", label: "السبت" },
  { key: "Sunday", label: "الأحد" },
  { key: "Monday", label: "الإثنين" },
  { key: "Tuesday", label: "الثلاثاء" },
  { key: "Wednesday", label: "الأربعاء" }
];

export default function ClassScheduler() {
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const [activeClassDetails, setActiveClassDetails] = useState<WorkoutClass | null>(null);

  const classes = SCHEDULE_DATA[selectedDay] || [];

  return (
    <section className="w-full bg-black py-24 relative overflow-hidden border-t border-zinc-900" dir="rtl">
      {/* Glow Effect */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <span className="text-[#d4af37] text-xs font-semibold tracking-wider flex items-center gap-2 mb-3">
          <Calendar className="w-3.5 h-3.5" /> جدول الحصص الأسبوعي
        </span>
        <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-4">
          جدول التمارين والحصص <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab]">الأسبوعية</span>
        </h2>
        <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed mb-12">
          اختر يوم تمرينك، وتعرّف على تفاصيل الحصص التدريبية، واحجز مكانك في Raven Gym.
        </p>

        {/* Day Selectors */}
        <div className="flex overflow-x-auto gap-3 pb-6 border-b border-zinc-900">
          {DAYS.map((day) => (
            <button
              key={day.key}
              onClick={() => {
                setSelectedDay(day.key);
                setActiveClassDetails(null);
              }}
              className={`px-6 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedDay === day.key
                  ? "bg-[#d4af37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                  : "bg-zinc-950 border border-zinc-800 text-gray-400 hover:text-white hover:border-[#d4af37]/50"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Timetable Grid and Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Classes List */}
          <div className="lg:col-span-2 space-y-4">
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
                      {cls.time.split(" - ")[0]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
                    <span className="text-zinc-500 text-xs">{activeClassDetails.room}</span>
                  </div>

                  <div>
                    <h3 className="text-white text-2xl font-black tracking-wide leading-tight mb-2">
                      {activeClassDetails.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {activeClassDetails.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-zinc-900 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">المدة</span>
                      <span className="text-white font-bold">{activeClassDetails.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">التوقيت</span>
                      <span className="text-[#d4af37] font-bold">{activeClassDetails.time}</span>
                    </div>
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
                    <Dumbbell className="w-6 h-6 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">اختر حصة تدريبية</h4>
                    <p className="text-zinc-500 text-xs mt-1 max-w-[200px]">
                      اضغط على أي حصة من الجدول لعرض التفاصيل الكاملة والوقت ومكان التدريب.
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
