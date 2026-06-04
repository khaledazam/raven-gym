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
    title: "Strength Arena",
    subtitle: "FORGE POWER",
    tag: "EQUIPMENT",
    image: "/images/strength_arena.png",
    description: "Premium hammer strength machines, raw dumbbells up to 80kg, and high-tension platforms designed for maximum force production."
  },
  {
    id: 2,
    title: "Cardio Loft",
    subtitle: "ENDURANCE REALM",
    tag: "STAMINA",
    image: "/images/cardio_loft.png",
    description: "State-of-the-art treadmills and stair climbers overlooking the city skyline, equipped with custom biometric tracking and cooling zones."
  },
  {
    id: 3,
    title: "Recovery Spa",
    subtitle: "REGENERATE & RESTORE",
    tag: "WELLNESS",
    image: "/images/recovery_spa.png",
    description: "Elevate your cellular recovery with our thermal saunas, infrared therapy cabins, and cold plunge pools optimized at 4°C."
  },
  {
    id: 4,
    title: "VIP Lounge",
    subtitle: "CONNECT & FUEL",
    tag: "LIFESTYLE",
    image: "/images/vip_lounge.png",
    description: "Relax, network, or enjoy premium curated protein blends, custom cold presses, and specialized pre-workout infusions."
  }
];

export default function GymGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <section className="w-full bg-black py-24 relative overflow-hidden border-t border-zinc-900">
      {/* Background soft lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <span className="text-[#d4af37] text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Sanctuary
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
              Explore The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8410]">Sanctuary</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl text-sm md:text-base leading-relaxed">
              Step inside our luxury fitness chambers designed for elite training, deep recovery, and premium lifestyle experience.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#d4af37] font-semibold tracking-widest uppercase">
            <span>Scroll/Drag horizontally</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
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
              <span className="text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-2 block">
                {item.tag}
              </span>
              <span className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1 block">
                {item.subtitle}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-wide leading-none mb-3">
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
