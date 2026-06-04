"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";
import LiveCapacity from "./LiveCapacity";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subHeadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.fromTo(
        [headlineRef.current, subHeadlineRef.current, buttonsRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, delay: 2 } // wait for 3D text to emerge
      );

      // Scroll Pin & Progress Timeline
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000", // 3000px of scrolling for the camera fly-through
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          
          // Fade out HTML elements as we scroll forward
          gsap.to([headlineRef.current, subHeadlineRef.current, buttonsRef.current], {
            opacity: 1 - (self.progress * 3), // fades out quickly in the first 33% of scroll
            y: -(self.progress * 200),
            duration: 0.1,
            overwrite: "auto"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Scene scrollProgress={scrollProgress} />
      </div>
      
      {/* Live Capacity Indicator */}
      <LiveCapacity />
      
      {/* Overlay Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-32 text-center px-4 pointer-events-none">
        
        <h1 
          ref={headlineRef} 
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl uppercase"
          style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}
        >
          Unleash the <span className="text-gold">Raven</span> Within
        </h1>

        <p 
          ref={subHeadlineRef}
          className="mt-6 text-xl md:text-2xl font-light text-gray-300 tracking-widest uppercase max-w-3xl"
        >
          Elite Training. AI Nutrition. Real Transformation.
        </p>

        <div ref={buttonsRef} className="mt-12 flex flex-col sm:flex-row gap-6 pointer-events-auto">
          <button className="group relative overflow-hidden rounded-none bg-gold px-10 py-5 font-heading text-lg font-bold tracking-widest text-black transition-all hover:scale-105 shadow-[0_0_40px_rgba(176,138,71,0.3)] hover:shadow-[0_0_60px_rgba(176,138,71,0.6)]">
            <span className="relative z-10">JOIN NOW</span>
            <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />
          </button>
          
          <button className="group relative overflow-hidden rounded-none border border-gold/30 bg-black/50 backdrop-blur-md px-10 py-5 font-heading text-lg font-bold tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
            <span className="relative z-10">VIEW TRANSFORMATIONS</span>
            <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-gold/10 transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
        <span className="font-heading text-xs tracking-widest text-white uppercase">Scroll to Explore</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
