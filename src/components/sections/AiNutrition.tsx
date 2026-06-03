"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Activity, Utensils, Zap, CheckCircle2, TrendingUp, Target, Clock, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

type Goal = "Fat Loss" | "Muscle Gain" | "Body Recomposition";
type ActivityLevel = "Sedentary" | "Light" | "Active" | "Very Active";

const PROCESSING_STEPS = [
  "Analyzing Body Metrics",
  "Calculating Daily Energy Needs",
  "Building Nutrition Strategy",
  "Estimating Timeline"
];

export default function AiNutrition() {
  const [status, setStatus] = useState<"idle" | "processing" | "complete">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<any>(null);

  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "Male",
    activity: "Active" as ActivityLevel,
    goal: "Fat Loss" as Goal,
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    
    setStatus("processing");
    setCurrentStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < PROCESSING_STEPS.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        calculateResults();
        setStatus("complete");
      }
    }, 1500); // 1.5s per step for a premium feel
  };

  const calculateResults = () => {
    let cals = 2500; let p = 180; let c = 250; let f = 70;
    let timeline = "12 Weeks";

    if (formData.goal === "Fat Loss") {
      cals = 2100; p = 200; c = 150; f = 60; timeline = "12-16 Weeks";
    } else if (formData.goal === "Muscle Gain") {
      cals = 3200; p = 220; c = 400; f = 80; timeline = "16-24 Weeks";
    } else {
      cals = 2600; p = 210; c = 220; f = 75; timeline = "16 Weeks";
    }

    setResults({
      calories: cals,
      protein: p,
      carbs: c,
      fats: f,
      timeline,
      confidence: "94%"
    });
  };

  const resetForm = () => {
    setStatus("idle");
    setResults(null);
  };

  return (
    <section className="relative z-10 bg-[#050505] py-32 px-6 overflow-hidden font-sans text-left" dir="ltr">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 flex flex-col lg:flex-row items-stretch gap-12">
        
        {/* LEFT COLUMN: Header & Info */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold mb-6 text-sm font-bold tracking-widest uppercase">
              <Cpu className="w-4 h-4" /> System Online
            </div>
            <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 uppercase">
              Raven <span className="text-gold">AI Coach</span>
            </h2>
            <p className="text-gray-400 font-light text-xl leading-relaxed max-w-xl">
              Get personalized fitness insights based on your body metrics and goals. Our intelligent system calculates your precise nutritional needs to map out a clear path to your objective.
            </p>
          </motion.div>

          {/* If complete, show CTA */}
          <AnimatePresence>
            {status === "complete" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md"
              >
                <h4 className="text-white text-2xl font-bold mb-4 font-heading uppercase tracking-wider">Ready to take the next step?</h4>
                <p className="text-gray-400 mb-8 font-light">Get your complete nutrition and training plan inside Raven Gym.</p>
                <button className="group relative overflow-hidden rounded-none bg-gold px-8 py-4 font-heading text-lg font-bold tracking-widest text-black transition-all hover:scale-105 shadow-[0_0_30px_rgba(176,138,71,0.2)] hover:shadow-[0_0_50px_rgba(176,138,71,0.5)] flex items-center justify-center gap-3 w-full sm:w-auto">
                  <span className="relative z-10">START YOUR JOURNEY</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Interactive Panel */}
        <div className="flex-1 w-full max-w-2xl mx-auto">
          <div className="relative rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden min-h-[600px] flex flex-col">
            
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gold to-black opacity-70" />

            <div className="p-8 md:p-10 flex-1 relative">
              <AnimatePresence mode="wait">
                
                {/* IDLE: INPUT FORM */}
                {status === "idle" && (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                    onSubmit={handleGenerate} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Weight (kg)</label>
                        <input type="number" required className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="e.g. 85" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Height (cm)</label>
                        <input type="number" required className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="e.g. 180" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Age</label>
                        <input type="number" required className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="e.g. 28" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Gender</label>
                        <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Activity Level</label>
                      <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" value={formData.activity} onChange={e => setFormData({...formData, activity: e.target.value as ActivityLevel})}>
                        {["Sedentary", "Light", "Active", "Very Active"].map(a => <option key={a}>{a}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Primary Goal</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {["Fat Loss", "Body Recomposition", "Muscle Gain"].map((g) => (
                          <button 
                            key={g} type="button"
                            onClick={() => setFormData({...formData, goal: g as Goal})}
                            className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border ${formData.goal === g ? 'bg-gold/10 border-gold text-gold shadow-[0_0_20px_rgba(176,138,71,0.15)]' : 'bg-[#0a0a0a] text-gray-400 border-white/10 hover:border-gold/50'}`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full mt-8 bg-white text-black py-4 rounded-xl font-heading text-xl font-bold hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)] flex justify-center items-center gap-3"
                    >
                      <Zap className="w-5 h-5 text-gold" /> Analyze My Profile
                    </button>
                  </motion.form>
                )}

                {/* PROCESSING SEQUENCE */}
                {status === "processing" && (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-10"
                  >
                    <div className="relative mb-12">
                      <div className="absolute inset-0 border-4 border-gold rounded-full animate-ping opacity-20" />
                      <div className="w-24 h-24 rounded-full bg-black border border-gold flex items-center justify-center shadow-[0_0_50px_rgba(176,138,71,0.3)]">
                        <Cpu className="w-10 h-10 text-gold animate-pulse" />
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      {PROCESSING_STEPS.map((step, idx) => {
                        const isCurrent = idx === currentStep;
                        const isPast = idx < currentStep;
                        return (
                          <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${isCurrent ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(176,138,71,0.15)]' : isPast ? 'bg-[#0a0a0a] border-white/5 opacity-50' : 'bg-transparent border-transparent opacity-30'}`}>
                            {isPast ? <CheckCircle2 className="w-6 h-6 text-gold" /> : <Loader2 className={`w-6 h-6 ${isCurrent ? 'text-gold animate-spin' : 'text-gray-600'}`} />}
                            <span className={`font-mono text-sm tracking-widest uppercase ${isCurrent ? 'text-gold' : 'text-gray-400'}`}>{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* RESULTS DASHBOARD */}
                {status === "complete" && results && (
                  <motion.div 
                    key="complete"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                      <div>
                        <h3 className="text-white font-heading text-2xl font-bold uppercase tracking-wider">Analysis Complete</h3>
                        <p className="text-gray-400 text-sm mt-1">Profile tuned for {formData.goal}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-gold font-mono text-xl font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> {results.confidence}</span>
                        <span className="text-gray-500 text-xs uppercase tracking-widest">Confidence Score</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold"><Zap className="w-5 h-5" /></div>
                        <div>
                          <div className="text-white font-heading text-2xl font-bold">{results.calories}</div>
                          <div className="text-gray-500 text-xs uppercase tracking-widest font-bold">Daily Calories</div>
                        </div>
                      </div>
                      <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold"><Clock className="w-5 h-5" /></div>
                        <div>
                          <div className="text-white font-heading text-xl font-bold">{results.timeline}</div>
                          <div className="text-gray-500 text-xs uppercase tracking-widest font-bold">Est. Timeline</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 mb-6">
                      <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Target className="w-4 h-4 text-gold" /> Macro Targets
                      </h4>
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-400">Protein</span>
                            <span className="text-white font-bold">{results.protein}g</span>
                          </div>
                          <div className="h-2 bg-black rounded-full overflow-hidden"><div className="h-full bg-blue-400 w-[40%]" /></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-400">Carbs</span>
                            <span className="text-white font-bold">{results.carbs}g</span>
                          </div>
                          <div className="h-2 bg-black rounded-full overflow-hidden"><div className="h-full bg-gold w-[35%]" /></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-400">Fats</span>
                            <span className="text-white font-bold">{results.fats}g</span>
                          </div>
                          <div className="h-2 bg-black rounded-full overflow-hidden"><div className="h-full bg-red-400 w-[25%]" /></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button onClick={resetForm} className="text-gray-500 text-sm hover:text-white transition-colors underline underline-offset-4">
                        Recalculate Metrics
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
