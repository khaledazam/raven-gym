"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Dumbbell, Utensils, LineChart, Trophy } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Center, Text3D } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Initial Assessment",
    desc: "We start by understanding your current level, goals, and training needs to create the right starting point.",
    icon: Target,
  },
  {
    num: "02",
    title: "Personal Training Plan",
    desc: "A structured training program designed around your fitness level and objectives.",
    icon: Dumbbell,
  },
  {
    num: "03",
    title: "Smart Nutrition Guidance",
    desc: "Nutrition recommendations tailored to support your training and help you stay consistent.",
    icon: Utensils,
  },
  {
    num: "04",
    title: "Progress Tracking",
    desc: "Track your measurements, performance, and improvements over time with regular evaluations.",
    icon: LineChart,
  },
  {
    num: "05",
    title: "Real Results",
    desc: "Through consistency, training, and proper nutrition, members move closer to their goals step by step.",
    icon: Trophy,
  },
];

function FinaleLogo() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Center>
          <Text3D 
            font="/fonts/optimer_bold.typeface.json" 
            size={2} 
            height={0.5} 
            curveSegments={12} 
            bevelEnabled 
            bevelSize={0.02} 
            bevelThickness={0.02}
          >
            RAVEN
            <meshStandardMaterial color="#B08A47" metalness={0.8} roughness={0.2} emissive="#B08A47" emissiveIntensity={0.2} />
          </Text3D>
        </Center>
      </Float>
      <Sparkles count={200} scale={10} size={3} speed={0.4} opacity={0.8} color="#B08A47" noise={1} />
    </group>
  );
}

export default function Transformations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const finaleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
        }
      });

      // Grow the line synchronously with the entire timeline duration
      tl.to(lineRef.current, { height: "100%", duration: 25, ease: "none" }, 0);

      // Fade out the title as we start scrolling deeply
      tl.to(titleRef.current, { opacity: 0, y: -50, duration: 2, ease: "power2.inOut" }, 1);

      // Animate cards in and out
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isEven = index % 2 === 0;
        const startX = isEven ? -150 : 150;
        
        // Enter
        tl.fromTo(card, 
          { x: startX, opacity: 0, scale: 0.9, y: 0 },
          { x: 0, opacity: 1, scale: 1, duration: 3, ease: "power3.out" }
        );
        
        // Stay
        tl.to(card, { opacity: 1, duration: 2 });
        
        // Leave (except the last one)
        if (index < 4) {
          tl.to(card, { y: -100, opacity: 0, duration: 2, ease: "power2.in" });
        } else {
          // Last card also fades out to make room for finale
          tl.to(card, { scale: 1.5, opacity: 0, duration: 3, ease: "power2.inOut" });
        }
      });

      // Finale reveal
      tl.fromTo(finaleRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 5, ease: "power3.out" },
        "-=1"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-gold/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Header */}
      <div ref={titleRef} className="absolute top-20 left-0 right-0 z-10 text-center px-4">
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-wider">How Results Are Built</h2>
        <p className="text-gray-400 font-light text-lg md:text-xl tracking-widest uppercase max-w-3xl mx-auto">
          Every transformation starts with a plan, consistency, and expert guidance.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative z-10 w-full h-full max-w-6xl mx-auto flex items-center justify-center mt-20">
        
        {/* Center Line */}
        <div className="absolute left-8 md:left-1/2 top-[10%] bottom-[10%] w-[2px] bg-white/5 -translate-x-1/2 rounded-full overflow-hidden z-0">
          <div ref={lineRef} className="w-full h-0 bg-gradient-to-b from-black via-gold to-white shadow-[0_0_20px_#B08A47]" />
        </div>

        {/* Steps Container */}
        <div className="relative w-full h-full">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className={`absolute w-[calc(100%-6rem)] md:w-[45%] top-1/2 -translate-y-1/2 ${
                  isEven ? "left-20 md:left-0 md:text-right" : "left-20 md:left-[55%] md:text-left"
                } opacity-0`}
              >
                <div className={`flex items-center gap-6 ${isEven ? "md:flex-row-reverse" : "flex-row"} mb-6`}>
                  <div className="w-20 h-20 rounded-full bg-[#0a0a0a] border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_30px_rgba(176,138,71,0.15)] shrink-0 z-20">
                    <Icon className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-gold font-heading text-5xl font-bold opacity-20 block -mb-2">{step.num}</span>
                    <h3 className="text-3xl font-bold text-white tracking-wider uppercase">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-xl font-light md:px-6 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Finale */}
        <div 
          ref={finaleRef}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-30 opacity-0 pointer-events-none"
        >
          <div className="w-full h-[50vh] pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 8] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={2} color="#B08A47" />
              <FinaleLogo />
            </Canvas>
          </div>
          
          <div className="pointer-events-auto text-center -mt-10">
            <h3 className="font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-2xl mb-12 uppercase tracking-widest">
              Your Next Transformation <span className="text-gold block mt-4">Starts Here</span>
            </h3>
            
            <button className="group relative overflow-hidden rounded-none bg-gold px-14 py-6 font-heading text-xl font-bold tracking-widest text-black transition-all hover:scale-105 shadow-[0_0_40px_rgba(176,138,71,0.4)] hover:shadow-[0_0_60px_rgba(176,138,71,0.8)]">
              <span className="relative z-10">START YOUR JOURNEY</span>
              <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
