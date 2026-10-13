"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Waves,
  Activity,
  Dumbbell,
  Wind,
  Coffee,
  Check,
  ArrowLeft,
  Sparkles,
  ChevronLeft,
  ShieldCheck,
  Clock,
  Compass,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FloorData {
  level: number;
  label: string;
  tag: string;
  titleAr: string;
  titleEn: string;
  description: string;
  highlights: string[];
  featuresList: string[];
  badge?: string;
  colorScheme: {
    badge: string;
    pill: string;
    border: string;
    glow: string;
    numberBg: string;
  };
  icon: React.ReactNode;
}

const FLOORS: FloorData[] = [
  {
    level: 1,
    label: "الطابق الأول",
    tag: "WELLNESS & SPA",
    titleAr: "الريكفري والاستشفاء الرياضي",
    titleEn: "Recovery & Hydrotherapy Spa",
    description:
      "طابق هادئ وفاخر مخصص بالكامل لإعادة شحن طاقتك بعد التدريب الشاق، مزود بأحدث تجهيزات العلاج المائي والحراري والتأهيل تحت إشراف متخصص.",
    highlights: [
      "جاكوزي مائي ساخن بتدليك هيدروليكي للمفاصل والأوتار",
      "سونا جافة وغرفة بخار رطب لتنقية الجسم وطرد السموم",
      "حمام ثلج (Cold Plunge) لتقليص الالتهابات العضلية",
      "جلسات حجامة رياضية وعيادة تأهيل حركي وعلاج طبيعي",
    ],
    featuresList: ["جاكوزي", "سونا جافة", "غرفة بخار", "حمام ثلج", "حجامة", "تأهيل"],
    colorScheme: {
      badge: "bg-[#d4af37]/10 text-[#f5d77f] border-[#d4af37]/30",
      pill: "border-[#d4af37]/40 text-[#f5d77f]",
      border: "hover:border-[#d4af37]/50",
      glow: "shadow-[0_0_30px_rgba(212,175,55,0.15)]",
      numberBg: "from-[#d4af37] to-[#997715]",
    },
    icon: <Waves className="w-5 h-5 stroke-[2.5]" />,
  },
  {
    level: 2,
    label: "الطابق الثاني",
    tag: "LOWER BODY & CARDIO",
    titleAr: "صالة الأرجل والكارديو المتطور",
    titleEn: "Legs Arena & Cardio Loft",
    description:
      "عزل أجهزة الأرجل والكارديو في طابق مستقل يمنحك أعلى درجات التركيز ومساحة حركة خالية من التكدس، مع أحدث أجهزة السلالم والمشايات ومحطات عزل عضلات الجزء السفلي.",
    highlights: [
      "أجهزة هاك سكوات، ليج بريس، ومحطات العزل الرباعية والخلفية",
      "أجهزة StairMasters وسلالم كارديو لحرق سعرات قصوى",
      "مشايات متطورة ودراجات هوائية مزودة بشاشات قياس المؤشرات الحيوية",
      "مساحة واسعة تسمح بالتمرين بخصوصية وراحة تامة",
    ],
    featuresList: ["Hack Squat", "Leg Press", "StairMasters", "Treadmills", "Cardio Bikes"],
    colorScheme: {
      badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
      pill: "border-blue-500/40 text-blue-300",
      border: "hover:border-blue-500/50",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      numberBg: "from-blue-600 to-blue-800",
    },
    icon: <Activity className="w-5 h-5 stroke-[2.5]" />,
  },
  {
    level: 3,
    label: "الطابق الثالث",
    tag: "UPPER BODY & STRENGTH",
    titleAr: "مملكة القوة والأجهزة العلوية",
    titleEn: "Strength Arena & Free Weights",
    description:
      "الصرح الأقوى لبناء الضخامة العضلية والقوة الصلبة، مجهز بجميع محطات سحب ودفع الجزء العلوي (صدر، ظهر، أكتاف، ذراعين) وأوزان حرة ترضي أقوى الأبطال.",
    highlights: [
      "محطات كابلات متعددة الزوايا وأجهزة تحميل أوزان Pin-loaded",
      "بنشات أولمبية مستوية ومائلة بزوايا تشريحية دقيقة",
      "مجموعة دمبلز كاملة حتى أعلى الأوزان مع بارات ومقاعد متعددة",
      "أرضيات صلبة ممتصة للاهتزازات لتجربة رفع أثقال احترافية وآمنة",
    ],
    featuresList: ["Free Weights", "Cable Stations", "Chest & Back Machines", "Shoulder Racks"],
    colorScheme: {
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      pill: "border-amber-500/40 text-amber-300",
      border: "hover:border-amber-500/50",
      glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      numberBg: "from-amber-500 to-amber-700",
    },
    icon: <Dumbbell className="w-5 h-5 stroke-[2.5]" />,
  },
  {
    level: 4,
    label: "الطابق الرابع",
    tag: "CROSSFIT & COMBAT",
    titleAr: "ساحة الهواء الطلق (Raven Sky Arena)",
    titleEn: "Open-Air CrossFit & Boxing Rig",
    description:
      "طابق كامل مفتوح تحت السماء المفتوحة بدون جدران أو اختناق، مخصص للكروس فيت الوظيفي، رفع الأثقال الأولمبي، وأكياس الملاكمة القتالية مع تهوية طبيعية 100%.",
    highlights: [
      "ريج كروس فيت أولمبي متكامل مع بارات وحلقات جمباز",
      "حبال المقاومة الثقيلة (Battle Ropes) وصناديق قفز خشبية",
      "أكياس ملاكمة جلدية ثقيلة وكرات سرعة لتدريب الفنون القتالية",
      "مظلة عصرية (Shaded Pergola) وإضاءة ليلية وجداريات حماسية",
    ],
    featuresList: ["Olympic Rig", "Boxing Bags", "Battle Ropes", "Plyo Boxes", "Open Air"],
    colorScheme: {
      badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      pill: "border-cyan-500/40 text-cyan-300",
      border: "hover:border-cyan-500/50",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      numberBg: "from-cyan-500 to-blue-700",
    },
    icon: <Wind className="w-5 h-5 stroke-[2.5]" />,
  },
  {
    level: 5,
    label: "الطابق الخامس (القمة)",
    tag: "ROOFTOP LOUNGE",
    titleAr: "كافيه الروف الصحي واللاونج المفتوح",
    titleEn: "Raven Sky Cafe & Protein Bar",
    description:
      "قمة الصرح الرياضي بإطلالة بانورامية ساحرة في الهواء الطلق، مصمم ليكون ملتقى الرياضيين للاسترخاء، تناول شيكات البروتين والقهوة المختصة، والوجبات الصحية المحسوبة.",
    highlights: [
      "بروتين بار متكامل: شيكات وسيروب عصائر طبيعية بعد التمرين مباشرة",
      "قهوة مختصة ومشروبات طاقة صحية طبيعية قبل الحصص التدريبية",
      "سناكس ووجبات خفيفة عالية البروتين محسوبة السعرات والماكروز",
      "جلسات روف مفتوحة بإطلالة بانورامية كاملة على السنبلاوين",
    ],
    featuresList: ["Protein Shakes", "Specialty Coffee", "Healthy Snacks", "Rooftop Chill", "Panoramic View"],
    badge: "الافتتاح قريباً",
    colorScheme: {
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      pill: "border-emerald-500/40 text-emerald-300",
      border: "hover:border-emerald-500/50",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.18)]",
      numberBg: "from-emerald-500 to-teal-700",
    },
    icon: <Coffee className="w-5 h-5 stroke-[2.5]" />,
  },
];

export default function BuildingFloors() {
  const [selectedFloor, setSelectedFloor] = useState<number>(5);

  const activeFloor = FLOORS.find((f) => f.level === selectedFloor) || FLOORS[4];

  return (
    <section
      id="building-tour"
      className="relative w-full bg-[#050505] py-28 px-4 md:px-8 border-t border-zinc-900 overflow-hidden font-sans"
      dir="rtl"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f5d77f] text-xs font-bold tracking-wider mb-4"
          >
            <Layers className="w-3.5 h-3.5 text-gold" />
            <span>صرح رياضي متكامل من 5 طوابق متخصصة</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-black tracking-tight text-white mb-4 leading-tight"
          >
            دليل طوابق <span className="text-gold">Raven Gym</span>
            <span className="block text-2xl md:text-3xl text-gray-300 font-bold mt-2 font-sans">
              مجمع رياضي متكامل.. لكل هدف طابقه المستقل
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            لا مجال للتكدس أو تداخل الأجهزة. صممنا مبنى Raven على 5 أدوار كاملة لتعيش تجربة نوادي اللياقة العالمية، من الاستشفاء المائي في الطابق الأول وحتى الاسترخاء في كافيه الروف بالطابق الخامس.
          </motion.p>
        </div>

        {/* Interactive 5-Floor Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Vertical Architectural Elevator / Floor Selector (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between pb-2 px-2 border-b border-white/5">
              <span className="text-xs font-bold text-gray-400 font-mono flex items-center gap-2">
                <Compass className="w-4 h-4 text-gold" /> اختر الطابق للاستكشاف
              </span>
              <span className="text-[11px] text-[#f5d77f] font-mono">5 LEVELS COMPLEX</span>
            </div>

            {/* Floors Stacked from 5 (top) down to 1 (ground) */}
            {[...FLOORS].reverse().map((floor) => {
              const isSelected = selectedFloor === floor.level;
              return (
                <button
                  key={floor.level}
                  onClick={() => setSelectedFloor(floor.level)}
                  className={`w-full p-4 rounded-2xl border text-right transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group ${
                    isSelected
                      ? "bg-zinc-900 border-[#d4af37]/60 shadow-[0_4px_25px_rgba(212,175,55,0.15)]"
                      : "bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Level Number Badge */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-heading font-black text-sm shrink-0 transition-transform ${
                        isSelected
                          ? `bg-gradient-to-br ${floor.colorScheme.numberBg} text-white shadow-md scale-105`
                          : "bg-zinc-900 border border-zinc-800 text-gray-400 group-hover:text-white"
                      }`}
                    >
                      L{floor.level}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 block font-sans">
                          {floor.label}
                        </span>
                        {floor.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            {floor.badge}
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-sm sm:text-base font-heading font-black transition-colors ${
                          isSelected ? "text-white" : "text-gray-300 group-hover:text-gold"
                        }`}
                      >
                        {floor.titleAr}
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "bg-[#d4af37]/10 text-gold"
                        : "text-zinc-600 group-hover:text-gray-400"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Floor Showcase Card (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFloor.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className={`h-full rounded-3xl bg-zinc-950/90 border border-zinc-800/80 p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden ${activeFloor.colorScheme.glow}`}
              >
                <div className="absolute top-0 left-0 w-48 h-48 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeFloor.colorScheme.numberBg} flex items-center justify-center text-white shadow-md shrink-0`}
                      >
                        {activeFloor.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-400 font-mono block">
                          LEVEL {activeFloor.level} • {activeFloor.label}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                          {activeFloor.titleAr}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider ${activeFloor.colorScheme.badge}`}
                      >
                        {activeFloor.tag}
                      </span>
                      {activeFloor.badge && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                          {activeFloor.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-4">
                    {activeFloor.titleEn}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6 font-normal">
                    {activeFloor.description}
                  </p>

                  {/* Core Highlights */}
                  <div className="space-y-3 pt-4 border-t border-white/5 mb-6">
                    <span className="text-xs font-bold text-gray-400 block mb-2">
                      محتويات وتجهيزات هذا الطابق:
                    </span>
                    {activeFloor.highlights.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed"
                      >
                        <div className="w-4 h-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Equipment / Amenity Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeFloor.featuresList.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-gray-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={`https://wa.me/201036605024?text=مرحباً،%20أود%20الاستفسار%20عن%20${encodeURIComponent(
                      activeFloor.titleAr
                    )}%20(الطابق%20${activeFloor.level})%20في%20Raven%20Gym`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all cursor-pointer"
                  >
                    <span>استفسر عن تفاصيل الطابق</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-[11px] text-gray-500 font-mono">
                    RAVEN MULTI-LEVEL FACILITY
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* SPOTLIGHT ON ROOFTOP SKY CAFE (Floor 5 Announcement Banner) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-zinc-950 via-[#101912] to-zinc-950 border border-emerald-500/30 p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>طابق القمة • الافتتاح قريباً</span>
                </span>
                <span className="text-xs font-mono text-gray-400">LEVEL 5 ROOFTOP</span>
              </div>

              <h3 className="text-2xl md:text-4xl font-heading font-black text-white leading-tight">
                كافيه الروف المفتوح واللاونج الصحي في <span className="text-emerald-400">Raven Gym</span>
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                بعد انتهائك من التمرين الشاق أو جلسة الاستشفاء، اصعد إلى قمة المبنى. نوفر لك بروتين بار متكامل يقدم شيكات مخصصة لتعويض العضلات، قهوة مختصة لصفاء الذهن، وسناكس صحية محسوبة الماكروز تحت إشراف خطط التغذية الذكية، مع جلسات هواء طلق وإطلالة كاملة على المدينة.
              </p>

              <div className="flex flex-wrap gap-3 pt-1 text-xs text-emerald-200">
                <span className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-lg border border-white/5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> شيكات بروتين بعد التمرين مباشرة
                </span>
                <span className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-lg border border-white/5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> قهوة مختصة وعصائر طبيعية
                </span>
                <span className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-lg border border-white/5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> وجبات وسناكس صحية محسوبة
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-auto">
              <a
                href="https://wa.me/201036605024?text=مرحباً،%20أود%20الاستفسار%20عن%20افتتاح%20كافيه%20الروف%20الجديد%20في%20Raven%20Gym"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 text-black font-bold text-xs text-center transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)] cursor-pointer"
              >
                تواصل للاستفسار عن كافيه الروف
              </a>

              <Link
                href="/subscribe"
                className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-emerald-400 text-white font-bold text-xs text-center transition-all hover:bg-zinc-800"
              >
                باقات العضوية والاشتراكات
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
