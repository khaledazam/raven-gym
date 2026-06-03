"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Dumbbell, Brain, Activity, Trophy } from "lucide-react";

const features = [
  {
    title: "مدربين بخبرة حقيقية",
    description: "سواء هدفك زيادة الكتلة العضلية، خسارة الوزن أو تحسين لياقتك، فريق المدربين في Raven Gym هيتابعك خطوة بخطوة ويجهزلك برنامج تدريبي مناسب لمستواك وأهدافك.",
    icon: <Trophy className="w-10 h-10 text-gold" />,
  },
  {
    title: "خطة غذائية مناسبة ليك",
    description: "التدريب لوحده مش كفاية. علشان كده بنساعدك بخطط غذائية محسوبة بناءً على بياناتك وهدفك، مع استخدام أدوات ذكية تساعدك تلتزم وتحقق أفضل نتيجة ممكنة.",
    icon: <Brain className="w-10 h-10 text-gold" />,
  },
  {
    title: "تابع تقدمك بالأرقام",
    description: "هنسجل قياساتك بشكل دوري ونساعدك تتابع تطورك في الوزن ونسبة الدهون والكتلة العضلية، عشان تقدر تشوف الفرق الحقيقي مع الوقت.",
    icon: <Activity className="w-10 h-10 text-gold" />,
  },
  {
    title: "معدات حديثة وتجربة تدريب متكاملة",
    description: "الجيم مجهز بمجموعة متنوعة من الأجهزة والأوزان الحرة اللي تناسب مختلف المستويات والأهداف، مع الاهتمام بتوفير بيئة تدريب مريحة وآمنة للجميع.",
    icon: <Dumbbell className="w-10 h-10 text-gold" />,
  },
];

const TiltCard = ({ feature, index }: { feature: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // In RTL, we might want to invert the X rotation, but the visual effect is the same.
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex h-[400px] w-full flex-col items-center justify-center rounded-xl bg-dark-gray/50 border border-white/5 p-8 text-center transition-colors hover:bg-dark-gray"
    >
      {/* Hover Glow Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "0 0 50px -10px rgba(176,138,71,0.3)" }} />
      
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="mb-6 rounded-full bg-black p-4 border border-white/5 shadow-[0_0_20px_rgba(176,138,71,0.2)]"
      >
        {feature.icon}
      </div>
      
      <h3 
        style={{ transform: "translateZ(30px)" }}
        className="mb-4 font-heading text-3xl font-bold tracking-wider text-white"
      >
        {feature.title}
      </h3>
      
      <p 
        style={{ transform: "translateZ(20px)" }}
        className="text-gray-400 font-light text-lg"
      >
        {feature.description}
      </p>
    </motion.div>
  );
};

export default function About() {
  return (
    <section className="relative z-10 bg-black py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl font-bold tracking-tighter text-white"
          >
            ليه تختار <span className="text-gold">Raven Gym</span>؟
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-6 h-1 w-24 bg-gold origin-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {features.map((feature, idx) => (
            <TiltCard key={feature.title} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
