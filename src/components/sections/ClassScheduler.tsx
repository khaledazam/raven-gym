"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Dumbbell, Sparkles } from "lucide-react";

interface WorkoutClass {
  id: string;
  name: string;
  coach: string;
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
      name: "Championship Boxing",
      coach: "Coach Khaled",
      time: "08:00 AM - 09:30 AM",
      duration: "90 min",
      intensity: "High",
      room: "Combat Ring",
      description: "Intense shadow boxing, heavy bag intervals, and professional mitt work to build elite stamina and striking power."
    },
    {
      id: "sat-2",
      name: "Olympic Weightlifting",
      coach: "Coach Azam",
      time: "10:30 AM - 12:00 PM",
      duration: "90 min",
      intensity: "High",
      room: "Strength Arena",
      description: "Master the Snatch and Clean & Jerk. Highly technical lifting session aimed at power and speed development."
    },
    {
      id: "sat-3",
      name: "Raven HIIT Circuit",
      coach: "Coach Sarah",
      time: "04:00 PM - 05:00 PM",
      duration: "60 min",
      intensity: "High",
      room: "Functional Turf",
      description: "Full-body metabolic conditioning that challenges cardiovascular endurance using kettlebells, ropes, and sleds."
    }
  ],
  Sunday: [
    {
      id: "sun-1",
      name: "Mobility & Flow Yoga",
      coach: "Coach Jasmine",
      time: "09:00 AM - 10:15 AM",
      duration: "75 min",
      intensity: "Low",
      room: "Mind & Body Studio",
      description: "Deep passive stretching, dynamic mobility flow, and breathing exercises to reduce muscle soreness and expand range of motion."
    },
    {
      id: "sun-2",
      name: "Hypertrophy Chest & Back",
      coach: "Coach Khaled",
      time: "02:00 PM - 03:30 PM",
      duration: "90 min",
      intensity: "Medium",
      room: "Strength Arena",
      description: "High-volume bodybuilding split focusing on chest and back development using mechanical tension techniques."
    },
    {
      id: "sun-3",
      name: "Athletic Performance",
      coach: "Coach Azam",
      time: "06:00 PM - 07:30 PM",
      duration: "90 min",
      intensity: "High",
      room: "Functional Turf",
      description: "Plyometrics, acceleration drills, and core stability work for athletes aiming to increase their vertical and sprint speed."
    }
  ],
  Monday: [
    {
      id: "mon-1",
      name: "Elite CrossFit WOD",
      coach: "Coach Sarah",
      time: "07:00 AM - 08:30 AM",
      duration: "90 min",
      intensity: "High",
      room: "Functional Turf",
      description: "The classic Workout of the Day. Features high-intensity gymnastics, heavy lifting, and metabolic elements."
    },
    {
      id: "mon-2",
      name: "Powerlifting Foundations",
      coach: "Coach Azam",
      time: "11:00 AM - 12:30 PM",
      duration: "90 min",
      intensity: "High",
      room: "Strength Arena",
      description: "Focused training on the Big Three: Squat, Bench Press, and Deadlift. Focus on absolute strength and technique."
    },
    {
      id: "mon-3",
      name: "Deep Core & Recovery",
      coach: "Coach Jasmine",
      time: "05:00 PM - 06:00 PM",
      duration: "60 min",
      intensity: "Low",
      room: "Mind & Body Studio",
      description: "Targeted core strengthening combined with trigger point therapy and foam rolling recovery."
    }
  ],
  Tuesday: [
    {
      id: "tue-1",
      name: "Functional Bodybuilding",
      coach: "Coach Khaled",
      time: "09:00 AM - 10:30 AM",
      duration: "90 min",
      intensity: "Medium",
      room: "Strength Arena",
      description: "Esthetic training mixed with functional movement patterns. Look like an athlete, move like an athlete."
    },
    {
      id: "tue-2",
      name: "Muay Thai Striking",
      coach: "Coach Sarah",
      time: "04:30 PM - 06:00 PM",
      duration: "90 min",
      intensity: "High",
      room: "Combat Ring",
      description: "Learn the Art of Eight Limbs. Technical pad work, elbow and knee striking, and defensive boxing strategies."
    }
  ],
  Wednesday: [
    {
      id: "wed-1",
      name: "Metabolic Conditioning",
      coach: "Coach Sarah",
      time: "08:00 AM - 09:15 AM",
      duration: "75 min",
      intensity: "High",
      room: "Functional Turf",
      description: "Stamina-focused conditioning with rowing, assault bikes, and bodyweight movements designed to burn fat."
    },
    {
      id: "wed-2",
      name: "Barbell Cycling & Speed",
      coach: "Coach Azam",
      time: "03:00 PM - 04:30 PM",
      duration: "90 min",
      intensity: "High",
      room: "Strength Arena",
      description: "Improve your rate of force development. Dynamic effort squats and Olympic lifts with bands and chains."
    }
  ]
};

const DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];

export default function ClassScheduler() {
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const [activeClassDetails, setActiveClassDetails] = useState<WorkoutClass | null>(null);

  const classes = SCHEDULE_DATA[selectedDay] || [];

  return (
    <section className="w-full bg-black py-24 relative overflow-hidden border-t border-zinc-900">
      {/* Glow Effect */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <span className="text-[#d4af37] text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-2 mb-3">
          <Calendar className="w-3.5 h-3.5" /> Weekly Timetable
        </span>
        <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
          Weekly <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab]">Experience</span> Schedule
        </h2>
        <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed mb-12">
          Pick your training day, explore premier class experiences, and book your spot directly with our coaching team.
        </p>

        {/* Day Selectors */}
        <div className="flex overflow-x-auto gap-3 pb-6 border-b border-zinc-900">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setActiveClassDetails(null);
              }}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedDay === day
                  ? "bg-[#d4af37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                  : "bg-zinc-950 border border-zinc-800 text-gray-400 hover:text-white hover:border-[#d4af37]/50"
              }`}
            >
              {day}
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
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                        cls.intensity === "High"
                          ? "bg-red-500/10 border-red-500/30 text-red-400"
                          : cls.intensity === "Medium"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          : "bg-green-500/10 border-green-500/30 text-green-400"
                      }`}>
                        {cls.intensity} Intensity
                      </span>
                      <span className="text-zinc-500 text-xs flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-600" /> {cls.duration}
                      </span>
                    </div>
                    <h3 className="text-white text-lg md:text-xl font-bold tracking-wide uppercase">
                      {cls.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#d4af37]/60" /> {cls.coach}
                      </span>
                      <span className="text-zinc-600">|</span>
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
                    <span className="text-[#d4af37] text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Class Profile
                    </span>
                    <span className="text-zinc-500 text-xs">{activeClassDetails.room}</span>
                  </div>

                  <div>
                    <h3 className="text-white text-2xl font-black uppercase tracking-wide leading-tight mb-2">
                      {activeClassDetails.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {activeClassDetails.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-zinc-900 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Master Coach</span>
                      <span className="text-white font-bold">{activeClassDetails.coach}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Duration</span>
                      <span className="text-white font-bold">{activeClassDetails.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Timing</span>
                      <span className="text-[#d4af37] font-bold">{activeClassDetails.time}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#d4af37] to-[#aa8410] text-black font-bold uppercase tracking-wider py-3.5 rounded-xl hover:from-[#aa8410] hover:to-[#d4af37] transition-all shadow-[0_5px_15px_rgba(212,175,55,0.2)] active:scale-95 text-sm cursor-pointer mt-4">
                    Book This Spot
                  </button>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase">Select a Class</h4>
                    <p className="text-zinc-500 text-xs mt-1 max-w-[200px]">
                      Click on any workout slot on the schedule to view structural training details and coach info.
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
