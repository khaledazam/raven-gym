"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Center, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { motion, useMotionValue, useSpring } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function FinaleScene({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const targetSpeed = isHovered ? 0.8 : 0.2;
  const currentSpeed = useRef(0.2);
  const emissiveTarget = isHovered ? 0.6 : 0.2;
  const currentEmissive = useRef(0.2);

  useFrame((state, delta) => {
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, 0.05);
    currentEmissive.current = THREE.MathUtils.lerp(currentEmissive.current, emissiveTarget, 0.05);
    
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * currentSpeed.current;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Center>
          <Text3D 
            font="/fonts/optimer_bold.typeface.json" 
            size={3} 
            height={0.8} 
            curveSegments={24} 
            bevelEnabled 
            bevelSize={0.04} 
            bevelThickness={0.04}
          >
            RAVEN
            <meshPhysicalMaterial 
              color="#050505" 
              metalness={0.9} 
              roughness={0.1} 
              clearcoat={1}
            />
          </Text3D>
        </Center>
      </Float>

      {/* Center glowing core behind text */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial color="#B08A47" transparent opacity={currentEmissive.current} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Abstract floating shards */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float 
          key={i} 
          speed={1.5} 
          rotationIntensity={2} 
          floatIntensity={3} 
          position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10 - 2]}
        >
          <mesh rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <octahedronGeometry args={[Math.random() * 0.8 + 0.2]} />
            <meshStandardMaterial color="#B08A47" metalness={1} roughness={0.2} emissive="#B08A47" emissiveIntensity={0.2} />
          </mesh>
        </Float>
      ))}

      <Sparkles 
        count={800} 
        scale={25} 
        size={isHovered ? 8 : 4} 
        speed={isHovered ? 2 : 0.3} 
        opacity={isHovered ? 0.8 : 0.4} 
        color="#B08A47" 
        noise={2} 
      />
    </group>
  );
}

function MagneticButton({ children, onHoverStart, onHoverEnd }: { children: React.ReactNode, onHoverStart: () => void, onHoverEnd: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3); // Magnetic pull strength
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd();
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-none bg-gold px-16 py-6 font-heading text-xl font-bold tracking-widest text-black transition-all hover:scale-105 shadow-[0_0_40px_rgba(176,138,71,0.3)] hover:shadow-[0_0_80px_rgba(176,138,71,0.7)]"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-white transition-transform duration-700 ease-out group-hover:translate-x-0" />
      {/* Light Sweep */}
      <div className="absolute inset-0 z-20 w-[200%] h-full -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-transform duration-1000 group-hover:translate-x-[50%]" />
    </motion.button>
  );
}

export default function Finale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          toggleActions: "play none none none"
        }
      });

      // 1. Darken Background
      tl.to(bgRef.current, { opacity: 1, duration: 2 }, 0);
      
      // 2. Fade in 3D Canvas
      tl.fromTo(canvasWrapperRef.current, 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 3, ease: "power2.out" }, 
        1
      );

      // 3. Stagger Headline
      tl.fromTo(headlineLine1Ref.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
        2.5
      );
      tl.fromTo(headlineLine2Ref.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
        3.0
      );

      // 4. Subtext
      tl.fromTo(subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5 },
        4.0
      );

      // 5. CTA Button
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.5)" },
        4.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-transparent">
      
      {/* Dynamic Black Background */}
      <div ref={bgRef} className="absolute inset-0 bg-black opacity-0 z-0 pointer-events-none" />

      {/* 3D Environment */}
      <div ref={canvasWrapperRef} className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <React.Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 20, 10]} intensity={2} angle={0.3} penumbra={1} color="#B08A47" />
            <spotLight position={[-10, -20, -10]} intensity={1} angle={0.3} penumbra={1} color="#ffffff" />
            <FinaleScene isHovered={isHovered} />
          </Canvas>
        </React.Suspense>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center mt-32 pointer-events-none">
        
        <h2 className="font-heading font-bold text-white uppercase leading-none drop-shadow-2xl flex flex-col gap-2">
          <span ref={headlineLine1Ref} className="text-5xl md:text-7xl tracking-tighter opacity-0" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
            YOUR TRANSFORMATION
          </span>
          <span ref={headlineLine2Ref} className="text-6xl md:text-8xl tracking-tighter text-gold opacity-0" style={{ textShadow: "0 0 40px rgba(176,138,71,0.4)" }}>
            STARTS NOW
          </span>
        </h2>

        <p ref={subtextRef} className="mt-8 text-xl md:text-2xl text-gray-300 font-light max-w-2xl px-4 opacity-0 drop-shadow-md">
          Every goal starts with a decision. <br/> Take the first step and begin your journey with Raven Gym.
        </p>

        <div ref={ctaRef} className="mt-16 pointer-events-auto opacity-0">
          <MagneticButton 
            onHoverStart={() => setIsHovered(true)} 
            onHoverEnd={() => setIsHovered(false)}
          >
            JOIN RAVEN
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
