"use client";

import { useEffect, useState, useMemo } from 'react';
import { Activity } from 'lucide-react';

export default function LiveCapacity() {
  const [capacity, setCapacity] = useState<{ count: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapacity = async () => {
      try {
        const res = await fetch('/api/capacity');
        const data = await res.json();
        if (data.success) {
          setCapacity({ count: data.count });
        }
      } catch (err) {
        console.error('Failed to fetch capacity:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCapacity();
    const interval = setInterval(fetchCapacity, 60000);
    return () => clearInterval(interval);
  }, []);

  const capacityStatus = useMemo(() => {
    if (!capacity) return { label: 'غير متوفر', color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/20' };
    if (capacity.count > 40) return { label: 'مزدحم', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    if (capacity.count > 15) return { label: 'متوسط', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
    return { label: 'هادئ', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
  }, [capacity]);

  if (loading) {
    return (
      <div className="absolute top-10 right-10 z-50 pointer-events-auto">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md">
          <Activity size={16} className="text-white/50 animate-pulse" />
          <span className="text-xs font-heading tracking-wider text-white/50">حالة الصالة الآن...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-10 right-10 z-50 pointer-events-auto" dir="rtl">
      <div className={`flex flex-col items-start gap-1 px-5 py-3 rounded-xl border ${capacityStatus.border} bg-black/50 backdrop-blur-md shadow-2xl transition-all duration-500 hover:bg-black/70`}>
        <div className="flex items-center gap-3 w-full justify-between mb-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${capacityStatus.bg.replace('/10', '')}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${capacityStatus.bg.replace('/10', '')}`} />
            </span>
            <span className="text-[10px] font-heading tracking-wider text-gray-400">مباشر</span>
          </div>
          <Activity size={16} className={capacityStatus.color} />
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-heading font-black text-white">{capacity?.count || 0}</span>
          <span className="text-xs text-gray-400 tracking-wider">متواجد الآن</span>
        </div>
        
        <div className={`text-[11px] font-heading font-bold tracking-wider mt-1 ${capacityStatus.color}`}>
          الحالة: {capacityStatus.label}
        </div>
      </div>
    </div>
  );
}
