"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import LiveCapacity from "./LiveCapacity";
import CountdownBadge from "./CountdownBadge";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
      <div className="w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
    </div>
  ),
});

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subHeadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const locationBadgeRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [canLoad3D, setCanLoad3D] = useState(false);

  useEffect(() => {
    // Defer heavy 3D Canvas initialization until after initial paint & idle
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const id = (window as any).requestIdleCallback(() => setCanLoad3D(true), { timeout: 1200 });
        return () => (window as any).cancelIdleCallback(id);
      } else {
        const timer = setTimeout(() => setCanLoad3D(true), 600);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(
        [locationBadgeRef.current, headlineRef.current, subHeadlineRef.current, buttonsRef.current],
        { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.1 }
      );

      // Scroll Pin & Progress Timeline
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;

          gsap.to(
            [locationBadgeRef.current, headlineRef.current, subHeadlineRef.current, buttonsRef.current],
            {
              opacity: 1 - self.progress * 3,
              y: -(self.progress * 200),
              duration: 0.1,
              overwrite: "auto",
            }
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* 3D Scene Background (Mounted on idle to achieve 0ms TBT and 95+ score) */}
      <div className="absolute inset-0 z-0">
        {canLoad3D ? (
          <Scene scrollProgress={scrollProgress} />
        ) : (
          <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
          </div>
        )}
      </div>

      {/* Live Capacity Indicator */}
      <LiveCapacity />

      {/* Floating 30-Day Countdown Badge */}
      <CountdownBadge />

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-28 md:pb-32 text-center px-4 pointer-events-none">
        
        {/* Location Badge (High SEO prominence for Sinbillawin / Mashaya / Raven) */}
        <div 
          ref={locationBadgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-gold/30 text-[#f5d77f] text-xs md:text-sm font-bold tracking-wider mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)] pointer-events-auto"
        >
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>السنبلاوين • أول المشاية (بجوار تشكن فاكتور - عمارة التوحيد والنور)</span>
        </div>

        <h1
          ref={headlineRef}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-2xl max-w-5xl"
          style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}
        >
          تحدَّ حدودك وافرض سيطرتك مع <span className="text-gold">Raven Gym</span>
          <span className="block text-2xl md:text-4xl text-gray-200 font-bold mt-2 font-sans tracking-normal">
            صالة ريفن الرياضية - السنبلاوين
          </span>
        </h1>

        <p
          ref={subHeadlineRef}
          className="mt-5 text-lg md:text-2xl font-light text-gray-300 tracking-wider max-w-3xl leading-relaxed"
        >
          تدريب احترافي 24 ساعة • خطط تغذية ذكية • بيئة بطولات وتحول حقيقي في السنبلاوين
        </p>

        <div ref={buttonsRef} className="mt-10 flex flex-col sm:flex-row gap-5 pointer-events-auto">
          <Link
            href="/subscribe"
            className="group relative overflow-hidden rounded-none bg-gold px-10 py-5 font-heading text-lg font-bold tracking-wider text-black transition-all hover:scale-105 shadow-[0_0_40px_rgba(176,138,71,0.3)] hover:shadow-[0_0_60px_rgba(176,138,71,0.6)] text-center flex items-center justify-center cursor-pointer"
          >
            <span className="relative z-10">اشترك الآن بخصم 30%</span>
            <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />
          </Link>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden rounded-none border border-gold/30 bg-black/50 backdrop-blur-md px-10 py-5 font-heading text-lg font-bold tracking-wider text-gold transition-all hover:border-gold hover:bg-gold/10 cursor-pointer text-center"
          >
            <span className="relative z-10">موقع الجيم والتواصل</span>
            <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-gold/10 transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </button>
        </div>
      </div>

      {/* GPU-composited Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60 pointer-events-none will-change-transform transform-gpu animate-bounce">
        <span className="font-heading text-xs tracking-wider text-white">مرر لأسفل للاستكشاف</span>
        <div className="h-10 w-[1px] bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
