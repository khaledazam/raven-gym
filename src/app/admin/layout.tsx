"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Brain, 
  CreditCard, 
  Settings, 
  LogOut 
} from "lucide-react";

const navItems = [
  { name: "نظرة عامة", href: "/admin", icon: LayoutDashboard },
  { name: "الأعضاء", href: "/admin/members", icon: Users },
  { name: "التحولات", href: "/admin/transformations", icon: Activity },
  { name: "خطط الذكاء الاصطناعي", href: "/admin/ai-plans", icon: Brain },
  { name: "المدفوعات", href: "/admin/payments", icon: CreditCard },
  { name: "الإعدادات", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-black text-white font-sans overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-l border-white/10 bg-dark-gray/50 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold rounded text-black flex items-center justify-center font-heading font-bold text-xl pt-1">R</div>
            <span className="font-heading font-bold tracking-wider">لوحة تحكم رافن</span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(176,138,71,0.3)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-black" : ""}`} />
                <span className="text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link 
            href="/login" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm tracking-wide">تسجيل الخروج</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar bg-gradient-to-br from-black to-dark-gray">
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 bg-black/50 backdrop-blur sticky top-0 z-10">
          <h1 className="font-heading text-xl font-bold tracking-widest text-white">نظرة عامة</h1>
          <div className="flex items-center gap-4">
            <div className="text-left">
              <div className="text-sm font-bold">المدير العام</div>
              <div className="text-xs text-gold">مسؤول نظام</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-dark-gray border border-gold/30 flex items-center justify-center font-heading font-bold text-gold pt-1">
              أ
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
