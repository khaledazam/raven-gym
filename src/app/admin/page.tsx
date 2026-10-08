"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, DollarSign, UserPlus, Brain, ArrowLeft, Clock } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

interface PendingSub {
  _id: string;
  referenceCode: string;
  fullName: string;
  phone: string;
  planName: string;
  amount: number;
  paymentMethod?: string;
  senderAccount: string;
  createdAt: string;
}

const stats = [
  { name: "إجمالي الأرباح", value: "374,500 ج.م", change: "+12.5%", icon: DollarSign },
  { name: "الأعضاء النشطين", value: "2,845", change: "+4.2%", icon: Users },
  { name: "الاشتراكات الجديدة", value: "142", change: "+18.1%", icon: UserPlus },
  { name: "خطط الذكاء الاصطناعي", value: "8,204", change: "+24.5%", icon: Brain },
];

const revenueData = [
  { name: "يناير", revenue: 250000 },
  { name: "فبراير", revenue: 270000 },
  { name: "مارس", revenue: 290000 },
  { name: "أبريل", revenue: 310000 },
  { name: "مايو", revenue: 340000 },
  { name: "يونيو", revenue: 374500 },
];

const memberData = [
  { name: "يناير", members: 2100 },
  { name: "فبراير", members: 2250 },
  { name: "مارس", members: 2400 },
  { name: "أبريل", members: 2600 },
  { name: "مايو", members: 2750 },
  { name: "يونيو", members: 2845 },
];

export default function AdminDashboard() {
  const [pendingSubs, setPendingSubs] = useState<PendingSub[]>([]);
  const [pendingTotal, setPendingTotal] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    async function loadRecent() {
      try {
        const res = await fetch("/api/admin/subscriptions?status=pending");
        const data = await res.json();
        if (data.success) {
          setPendingSubs((data.subscriptions || []).slice(0, 5));
          if (data.stats) setPendingTotal(data.stats.pending || 0);
        }
      } catch {
        // quiet error
      }
    }
    loadRecent();
  }, []);
  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-dark-gray/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 p-4 opacity-5 pointer-events-none">
                <Icon className="w-24 h-24 text-gold" />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-sm font-bold text-gray-400">{stat.name}</h3>
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-gold">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-end gap-3 relative z-10" dir="rtl">
                <div className="font-heading text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm font-bold text-green-400 mb-1" dir="ltr">{stat.change}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-gray/50 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-sm font-bold text-gray-400 mb-6">نمو الأرباح</h3>
          <div className="h-[300px] w-full min-w-0" dir="ltr">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B08A47" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#B08A47" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'var(--font-sans)'}} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#161616', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontFamily: 'var(--font-sans)' }}
                    itemStyle={{ color: '#B08A47', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#B08A47" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Member Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-gray/50 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-sm font-bold text-gray-400 mb-6">الأعضاء النشطين</h3>
          <div className="h-[300px] w-full min-w-0" dir="ltr">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={memberData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'var(--font-sans)'}} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#161616', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontFamily: 'var(--font-sans)' }}
                    itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="members" fill="#ffffff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Pending Subscriptions Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-dark-gray/50 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span>طلبات اشتراك جديدة بانتظار المراجعة (كاش / إنستاباي)</span>
            </h3>
            {pendingTotal > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                {pendingTotal} طلب معلق
              </span>
            )}
          </div>
          <Link
            href="/admin/subscriptions"
            className="text-xs text-gold hover:text-white flex items-center gap-1.5 transition-colors font-bold"
          >
            <span>عرض وإدارة جميع الطلبات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingSubs.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-xs">
            لا توجد طلبات معلقة حالياً. جميع التحويلات تمت مراجعتها!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="pb-3 pr-2">رقم الطلب</th>
                  <th className="pb-3">المشترك</th>
                  <th className="pb-3">الهاتف</th>
                  <th className="pb-3">الباقة</th>
                  <th className="pb-3">المبلغ</th>
                  <th className="pb-3">طريقة الدفع</th>
                  <th className="pb-3">حساب المحول</th>
                  <th className="pb-3 text-left pl-2">إجراء سريع</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pendingSubs.map((sub) => (
                  <tr key={sub._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-2 font-mono text-gold font-bold">{sub.referenceCode}</td>
                    <td className="py-3.5 font-bold text-white">{sub.fullName}</td>
                    <td className="py-3.5 font-mono text-gray-400" dir="ltr">{sub.phone}</td>
                    <td className="py-3.5 text-gray-300">{sub.planName}</td>
                    <td className="py-3.5 font-bold text-white">{sub.amount.toLocaleString()} ج.م</td>
                    <td className="py-3.5">
                      {sub.paymentMethod === "vodafone_cash" ? (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                          فودافون كاش
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-gold/20 text-gold font-bold border border-gold/30">
                          إنستاباي
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 font-mono text-yellow-400/90">{sub.senderAccount}</td>
                    <td className="py-3.5 text-left pl-2">
                      <Link
                        href="/admin/subscriptions"
                        className="inline-flex items-center gap-1 bg-gold/15 hover:bg-gold text-gold hover:text-black border border-gold/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                      >
                        <span>مراجعة</span>
                        <ArrowLeft className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
