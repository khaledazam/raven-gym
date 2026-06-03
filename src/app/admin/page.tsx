"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, UserPlus, Brain } from "lucide-react";
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
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
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
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
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
          </div>
        </motion.div>

      </div>
    </div>
  );
}
