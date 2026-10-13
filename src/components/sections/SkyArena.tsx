"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind,
  Dumbbell,
  Flame,
  Sun,
  Shield,
  ArrowLeft,
  Sparkles,
  Check,
  Maximize2,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";

interface ArenaFeature {
  id: string;
  tag: string;
  titleAr: string;
  titleEn: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
}

const ARENA_FEATURES: ArenaFeature[] = [
  {
    id: "crossfit",
    tag: "OLYMPIC RIG",
    titleAr: "منطقة الكروس فيت والتدريب الوظيفي",
    titleEn: "CrossFit & Functional Training Rig",
    description:
      "محطة تدريب حديدية متكاملة مجهزة ببارات وطارات أولمبية، حبال القوة، صناديق القفز، وحلقات الجمباز للأداء الرياضي عالي الكثافة.",
    highlights: [
      "بارات وطارات رفع أثقال أولمبية معتمدة",
      "حبال المقاومة الثقيلة (Battle Ropes) وصناديق Plyo Boxes",
      "مزالج سحب وأوزان وظيفية لرفع القوة الانفجارية",
    ],
    icon: <Dumbbell className="w-5 h-5 stroke-[2.5]" />,
  },
  {
    id: "boxing",
    tag: "COMBAT ZONE",
    titleAr: "ركن الملاكمة والفنون القتالية",
    titleEn: "Boxing & Heavy Bag Station",
    description:
      "منطقة قتالية مزودة بأكياس ملاكمة ثقيلة وكرات سرعة لتفريغ الضغوط اليومية، حرق السعرات بكثافة، وتطوير سرعة رد الفعل والقوة البدنية.",
    highlights: [
      "أكياس ملاكمة جلدية ثقيلة للضربات القوية",
      "كرات سرعة لتدريب التوافق العضلي العصبي والتركيز",
      "مساحة مخصصة لتمارين الفوت وورك (Footwork) واللياقة القتالية",
    ],
    icon: <Target className="w-5 h-5 stroke-[2.5]" />,
  },
  {
    id: "cardio",
    tag: "ENDURANCE",
    titleAr: "كارديو الهواء الطلق وقوة التحمل",
    titleEn: "Open-Air Cardio & Conditioning",
    description:
      "تمرين التحمل الهوائي في الهواء النقي يضاعف سعة الرئتين، يرفع استهلاك الأكسجين، ويمنحك إحساساً متجدداً بالحرية بعيداً عن الصالات المغلقة.",
    highlights: [
      "تهوية طبيعية 100% وأكسجين نقي يمنع الشعور بالاختناق",
      "معدلات حرق طاقة أعلى بفضل تدفق الهواء الطبيعي",
      "تمارين تحمل مدمجة مع أشعة الشمس وفيتامين د",
    ],
    icon: <Zap className="w-5 h-5 stroke-[2.5]" />,
  },
];

export default function SkyArena() {
  const [activeImage, setActiveImage] = useState<"main" | "view">("main");

  const images = {
    main: {
      src: "/images/sky_arena_main.png",
      alt: "ساحة التدريب المفتوح للكروس فيت والملاكمة في Raven Gym",
      badge: "الساحة الرئيسية للكروس فيت والملاكمة",
      caption: "أجهزة الكروس فيت، أكياس الملاكمة، وجداريات الجرافيتي الحماسية تحت المظلة العصرية",
    },
    view: {
      src: "/images/sky_arena_view.png",
      alt: "الإطلالة البانورامية لساحة Raven Sky Arena في الهواء الطلق",
      badge: "الإطلالة البانورامية في الهواء الطلق",
      caption: "إطلالة مفتوحة على السماء والمدينة مع تهوية طبيعية متجددة 100% طوال اليوم",
    },
  };

  return (
    <section
      id="sky-arena"
      className="relative w-full bg-black py-28 px-4 md:px-8 border-t border-zinc-900 overflow-hidden font-sans"
      dir="rtl"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f5d77f] text-xs font-bold tracking-wider mb-4"
          >
            <Wind className="w-3.5 h-3.5 text-gold" />
            <span>ميزة حصرية وفريدة في السنبلاوين</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-black tracking-tight text-white mb-4 leading-tight"
          >
            ساحة <span className="text-gold">Raven Sky Arena</span>
            <span className="block text-2xl md:text-3xl text-gray-300 font-bold mt-2 font-sans">
              دور كامل Open-Air للكروس فيت والملاكمة في الهواء الطلق
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            لا مزيد من قيود الجدران أو اختناق القاعات المغلقة. خصصنا لك طابقاً كاملاً تحت السماء المفتوحة يجمع بين أعتى تمارين اللياقة الوظيفية، فنون الملاكمة، وتدفق الأكسجين الطبيعي.
          </motion.p>
        </div>

        {/* Visual Showcase Card with Angle Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 p-4 sm:p-6 shadow-2xl relative overflow-hidden group"
        >
          {/* Angle Switcher Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-bold text-gray-300 font-mono">
                LIVE ROOFTOP SHOWCASE
              </span>
            </div>

            <div className="flex items-center gap-2 bg-black/60 p-1 rounded-2xl border border-white/5">
              <button
                onClick={() => setActiveImage("main")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeImage === "main"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#aa8410] text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                منطقة الكروس فيت والملاكمة
              </button>
              <button
                onClick={() => setActiveImage("view")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeImage === "view"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#aa8410] text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                الإطلالة المفتوحة في الهواء الطلق
              </button>
            </div>
          </div>

          {/* Active Image Display */}
          <div className="relative aspect-[16/9] w-full max-h-[580px] rounded-2xl overflow-hidden border border-white/10 bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[activeImage].src}
                  alt={images[activeImage].alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={activeImage === "main"}
                  className="object-cover"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* In-Image Caption */}
                <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-right">
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-black/80 border border-gold/40 text-gold text-xs font-bold">
                      {images[activeImage].badge}
                    </span>
                    <p className="text-white text-sm sm:text-base font-bold drop-shadow-md">
                      {images[activeImage].caption}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono text-gray-400 bg-black/60 px-3 py-1 rounded-lg border border-white/10">
                    RAVEN SKY ARENA
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 3 Core Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {ARENA_FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-[#d4af37]/40 p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:bg-zinc-900/60 shadow-xl group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#aa8410] flex items-center justify-center text-black shadow-md shrink-0 group-hover:scale-105 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[#f5d77f] text-[11px] font-mono font-bold tracking-wider">
                    {feature.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-heading font-black text-white group-hover:text-gold transition-colors mb-1">
                  {feature.titleAr}
                </h3>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-4">
                  {feature.titleEn}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  {feature.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed"
                    >
                      <div className="w-4 h-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={`https://wa.me/201036605024?text=مرحباً،%20أود%20الاستفسار%20عن%20تمارين%20${encodeURIComponent(
                    feature.titleAr
                  )}%20في%20Raven%20Sky%20Arena`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-white transition-colors cursor-pointer"
                >
                  <span>استفسر عن الحصص والمواعيد</span>
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Strengths Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-zinc-950 via-[#151206] to-zinc-950 border border-[#d4af37]/30 p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-right relative z-10">
            <div className="space-y-1 md:border-l md:border-white/10 md:pl-6">
              <span className="text-3xl font-heading font-black text-gold">100%</span>
              <h4 className="text-sm font-bold text-white">هواء نقي وتهوية طبيعية</h4>
              <p className="text-xs text-gray-400">تمرين في الهواء الطلق يمنحك أعلى معدلات استهلاك أكسجين.</p>
            </div>

            <div className="space-y-1 md:border-l md:border-white/10 md:pl-6">
              <span className="text-3xl font-heading font-black text-gold">ROOF TOP</span>
              <h4 className="text-sm font-bold text-white">طابق كامل مخصص</h4>
              <p className="text-xs text-gray-400">مساحة شاسعة للتمارين الوظيفية وحركات القفز والجري.</p>
            </div>

            <div className="space-y-1 md:border-l md:border-white/10 md:pl-6">
              <span className="text-3xl font-heading font-black text-gold">COMBAT</span>
              <h4 className="text-sm font-bold text-white">محطة ملاكمة احترافية</h4>
              <p className="text-xs text-gray-400">أكياس ملاكمة ثقيلة وكرات سرعة لتفريغ الطاقة وبناء القوة.</p>
            </div>

            <div className="flex flex-col justify-center items-center md:items-start gap-3">
              <a
                href="https://wa.me/201036605024?text=مرحباً،%20أود%20الاستفسار%20عن%20التدريب%20في%20Raven%20Sky%20Arena"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8410] hover:from-[#aa8410] hover:to-[#d4af37] text-black font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                احجز تمرينك في Sky Arena
              </a>
              <Link
                href="/subscribe"
                className="text-xs text-gold underline hover:text-white transition-colors"
              >
                شاهد باقات وعروض الاشتراكات
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
