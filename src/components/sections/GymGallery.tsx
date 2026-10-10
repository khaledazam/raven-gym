"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "منطقة القوة والأوزان",
    subtitle: "FORGE POWER",
    tag: "معدات وأجهزة",
    image: "/images/strength_arena.png",
    description: "أحدث أجهزة هامر سترينث، دمبلز أوزان حرة تصل إلى 80 كجم، ومنصات رفع مخصصة لأعلى إنتاجية للقوة."
  },
  {
    id: 2,
    title: "منطقة الكارديو واللياقة",
    subtitle: "ENDURANCE REALM",
    tag: "اللياقة والتحمل",
    image: "/images/cardio_loft.png",
    description: "أجهزة جري وتزلج متطورة مع شاشات قياس المؤشرات الحيوية ومناطق تبريد هواء مباشرة."
  },
  {
    id: 3,
    title: "سبا والاستشفاء العضلي",
    subtitle: "REGENERATE & RESTORE",
    tag: "صحة واستشفاء",
    image: "/images/recovery_spa.png",
    description: "تسريع الاستشفاء العضلي مع غرف الساونا الحرارية، وكبائن الأشعة تحت الحمراء، وأحواض الغطس الباردة عند 4 درجات مئوية."
  },
  {
    id: 4,
    title: "لاونج كبار الزوار (VIP)",
    subtitle: "CONNECT & FUEL",
    tag: "أسلوب حياة",
    image: "/images/vip_lounge.png",
    description: "مكان مريح للتواصل والاسترخاء والاستمتاع بمخفوقات البروتين المعدة خصيصاً والمشروبات المنعشة قبل وبعد التمرين."
  }
];

export default function GymGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <section className="w-full bg-black py-24 relative overflow-hidden border-t border-zinc-900" dir="rtl">
      {/* Background soft lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <span className="text-[#d4af37] text-xs font-semibold tracking-wider flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> مرافق الجيم
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-none">
              استكشف مناطق وتجهيزات <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8410]">Raven Gym</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl text-sm md:text-base leading-relaxed">
              تعرّف على مساحاتنا الرياضية الفاخرة المصممة لتدريب Raven، والاستشفاء العميق، وتجربة رياضية متكاملة.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#d4af37] font-semibold tracking-wider">
            <span>اسحب أفقياً لاستكشاف المزيد</span>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div 
        ref={containerRef}
        className="w-full overflow-x-auto flex gap-8 px-6 md:px-[calc((100vw-1280px)/2+24px)] pb-12 snap-x scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent scroll-smooth cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "thin" }}
      >
        {GALLERY_ITEMS.map((item) => (
          <div 
            key={item.id}
            className="min-w-[320px] md:min-w-[450px] aspect-[4/5] relative rounded-2xl overflow-hidden group snap-center border border-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.8)] shrink-0"
          >
            {/* Image Wrapper with Parallax Scale */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={item.id === 1}
                className="w-full h-full object-cover transform scale-105 group-hover:scale-115 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
              <span className="text-[#d4af37] text-xs font-bold tracking-wider mb-2 block">
                {item.tag}
              </span>
              <span className="text-zinc-500 text-[10px] font-bold tracking-wider mb-1 block">
                {item.subtitle}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-black tracking-wide leading-none mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out">
                {item.description}
              </p>
            </div>

            {/* Glowing borders on hover */}
            <div className="absolute inset-0 border border-transparent group-hover:border-[#d4af37]/40 rounded-2xl pointer-events-none transition-colors duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
