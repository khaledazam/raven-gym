"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: "train",
    name: "TRAIN",
    description: "Build consistency, learn proper technique, and establish a strong fitness foundation.",
    features: [
      "Access to training facilities",
      "Full equipment access",
      "Locker rooms",
      "Beginner-friendly environment",
      "Progress tracking",
    ],
    cta: "Start Training",
    highlight: false,
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(30,58,138,0.15) 0%, rgba(5,5,5,0) 60%)",
  },
  {
    id: "transform",
    name: "TRANSFORM",
    description: "A complete fitness journey designed for members who want noticeable progress.",
    features: [
      "Everything in Train",
      "Personalized workout plans",
      "Nutrition guidance",
      "Monthly progress reviews",
      "Priority support",
    ],
    cta: "Start Transforming",
    highlight: true,
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(176,138,71,0.15) 0%, rgba(5,5,5,0) 70%)",
  },
  {
    id: "dominate",
    name: "DOMINATE",
    description: "The ultimate Raven experience for members committed to achieving their highest potential.",
    features: [
      "Everything in Transform",
      "Advanced coaching support",
      "Priority scheduling",
      "Premium member benefits",
      "Exclusive Raven community access",
      "Performance optimization guidance",
    ],
    cta: "Become Elite",
    highlight: false,
    bgGradient: "radial-gradient(circle at 50% 50%, rgba(139,0,0,0.15) 0%, rgba(5,5,5,0) 60%)",
  }
];

const TiltCard = ({ plan, isHovered, onHover, onLeave }: { plan: typeof plans[0], isHovered: boolean, onHover: () => void, onLeave: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        y: plan.highlight ? -20 : 0,
        scale: isHovered ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`card-item relative h-full flex flex-col rounded-3xl p-8 transition-colors duration-500 z-10 ${
        plan.highlight 
          ? "bg-[#0a0a0a] border border-gold/40 shadow-[0_0_50px_rgba(176,138,71,0.2)]" 
          : "bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/20"
      }`}
    >
      {/* Light Reflection Sweep */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "200%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none rounded-3xl"
          />
        )}
      </AnimatePresence>

      {plan.highlight && (
        <div 
          style={{ transform: "translateZ(30px)" }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-600 text-black px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(176,138,71,0.4)]"
        >
          Most Popular
        </div>
      )}

      <div className="text-left mb-8 mt-4" style={{ transform: "translateZ(40px)" }}>
        <h3 className={`font-heading text-4xl font-bold mb-4 tracking-wider uppercase ${plan.highlight ? 'text-gold' : 'text-white'}`}>{plan.name}</h3>
        <p className="text-gray-400 font-light text-sm leading-relaxed min-h-[60px]">{plan.description}</p>
      </div>

      <div className="space-y-4 mb-12 flex-1" style={{ transform: "translateZ(20px)" }}>
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-4">
            <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? 'text-gold' : 'text-gray-500'}`} />
            <span className="text-gray-300 text-sm font-light leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>

      <div style={{ transform: "translateZ(30px)" }}>
        <button className={`group relative w-full py-4 rounded-xl font-heading text-sm font-bold tracking-widest uppercase transition-all overflow-hidden ${
          plan.highlight 
            ? "bg-gold text-black shadow-[0_0_20px_rgba(176,138,71,0.3)]" 
            : "bg-transparent border border-white/20 text-white hover:border-gold hover:text-gold"
        }`}>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {plan.cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
          {plan.highlight && (
            <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default function Memberships() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro GSAP Animation
      gsap.fromTo(".card-item", 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 bg-[#050505] py-32 px-4 md:px-6 font-sans overflow-hidden" dir="ltr">
      
      {/* Dynamic Backgrounds */}
      <AnimatePresence>
        {plans.map((plan) => (
          activePlan === plan.id && (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 pointer-events-none z-0"
              style={{ background: plan.bgGradient }}
            />
          )
        ))}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase"
          >
            Choose Your <span className="text-gold">Path</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 font-light text-lg md:text-xl tracking-widest uppercase max-w-3xl mx-auto"
          >
            Three membership experiences designed for different goals, commitment levels, and ambitions.
          </motion.p>
        </div>

        <div ref={cardsWrapperRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-stretch perspective-1000">
          {plans.map((plan) => (
            <TiltCard 
              key={plan.id} 
              plan={plan} 
              isHovered={activePlan === plan.id}
              onHover={() => setActivePlan(plan.id)}
              onLeave={() => setActivePlan(null)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
