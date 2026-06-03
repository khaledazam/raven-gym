"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden font-sans" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px]" style={{ animationDuration: '7s' }} />
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <h1 className="text-[30vw] font-heading font-bold text-white tracking-tighter">RAVEN</h1>
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-8 sm:p-12"
      >
        <div className="absolute inset-0 bg-dark-gray/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo Placeholder */}
          <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(176,138,71,0.3)] mb-8">
            <span className="font-heading text-black text-3xl font-bold">R</span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-white mb-2 tracking-wider">بوابة الدخول</h2>
          <p className="text-gray-400 font-light text-sm mb-8 text-center">أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة معلومات الذكاء الاصطناعي.</p>

          <form className="w-full space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href = "/admin"; }}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 mr-1">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  required
                  placeholder="athlete@raven.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-gold transition-colors placeholder:text-gray-600 text-left"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 mr-1">كلمة المرور</label>
              <div className="relative">
                <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-gold transition-colors placeholder:text-gray-600 text-left"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded bg-black/50 border-white/10 text-gold focus:ring-gold/50 focus:ring-offset-black transition-all" />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">تذكرني</span>
              </label>
              <Link href="#" className="text-sm text-gold hover:text-white transition-colors">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button type="submit" className="group relative w-full bg-gold hover:bg-white text-black rounded-xl py-4 font-heading font-bold transition-all mt-8 overflow-hidden text-lg">
              <span className="relative z-10 flex items-center justify-center gap-2">
                تسجيل الدخول <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </span>
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            ليس لديك حساب؟ <Link href="/" className="text-gold hover:text-white transition-colors">انضم للنخبة</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
