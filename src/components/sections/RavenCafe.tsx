"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  Zap,
  Dumbbell,
  Sparkles,
  ExternalLink,
  Gamepad2,
  Flame,
  Search,
  Check,
  Loader2,
  RefreshCw,
  Clock,
  CupSoda,
} from "lucide-react";

interface RecipeItem {
  ingredientId: string;
  ingredientName: string;
  unit: string;
  quantityRequired: number;
}

interface Product {
  id: string;
  name: string;
  categoryId: string;
  costPrice?: number;
  salePrice?: number;
  price?: number;
  isActive?: boolean;
  recipe?: RecipeItem[];
}

interface Category {
  id: string;
  name: string;
}

interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  hourPrice?: number;
  multiPrice?: number;
}

// Fallback initial menu items so the section renders instantly and gracefully
const FALLBACK_CATEGORIES: Category[] = [
  { id: "cat_protein", name: "بروتين شيك وسموزي" },
  { id: "cat_preworkout", name: "مكملات ومشروبات طاقة" },
  { id: "cat_coffee", name: "قهوة ومشروبات ساخنة" },
  { id: "cat_healthy_snacks", name: "سناكس ووجبات صحية" },
  { id: "cat_cold_drinks", name: "مياه ومشروبات مرطبة" },
];

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "prod_pb_banana_shake",
    name: "بروتين سموزي (موز + زبدة فول سوداني)",
    categoryId: "cat_protein",
    price: 75,
    recipe: [
      { ingredientId: "1", ingredientName: "واي بروتين شيكولاتة", unit: "سكوب", quantityRequired: 1 },
      { ingredientId: "2", ingredientName: "موز طازج", unit: "حبة", quantityRequired: 1 },
      { ingredientId: "3", ingredientName: "زبدة فول سوداني بيور", unit: "جرام", quantityRequired: 30 },
      { ingredientId: "4", ingredientName: "حليب خالي الدسم", unit: "مل", quantityRequired: 200 },
    ],
  },
  {
    id: "prod_whey_choc",
    name: "شيك واي بروتين شيكولاتة",
    categoryId: "cat_protein",
    price: 65,
    recipe: [
      { ingredientId: "1", ingredientName: "بودرة واي بروتين", unit: "سكوب", quantityRequired: 1 },
      { ingredientId: "2", ingredientName: "حليب خالي الدسم", unit: "مل", quantityRequired: 250 },
    ],
  },
  {
    id: "prod_whey_vanilla",
    name: "شيك واي بروتين فانيليا",
    categoryId: "cat_protein",
    price: 65,
    recipe: [
      { ingredientId: "1", ingredientName: "بودرة واي بروتين فانيليا", unit: "سكوب", quantityRequired: 1 },
      { ingredientId: "2", ingredientName: "حليب خالي الدسم", unit: "مل", quantityRequired: 250 },
    ],
  },
  {
    id: "prod_preworkout_shot",
    name: "شوت بري ورك أوت (Pre-Workout)",
    categoryId: "cat_preworkout",
    price: 45,
    recipe: [
      { ingredientId: "1", ingredientName: "مكمل بري ورك أوت", unit: "سكوب", quantityRequired: 1 },
    ],
  },
  {
    id: "prod_bcaa_iced",
    name: "مشروب BCAA استشفاء مثلج",
    categoryId: "cat_preworkout",
    price: 40,
    recipe: [
      { ingredientId: "1", ingredientName: "مكمل BCAA استشفاء", unit: "سكوب", quantityRequired: 1 },
    ],
  },
  {
    id: "prod_creatine_shot",
    name: "كرياتين شوت بيور (Creatine 5g)",
    categoryId: "cat_preworkout",
    price: 30,
    recipe: [
      { ingredientId: "1", ingredientName: "كرياتين مونوهايدرات", unit: "سكوب", quantityRequired: 1 },
    ],
  },
  {
    id: "prod_espresso_double",
    name: "اسبريسو دبل فاخر",
    categoryId: "cat_coffee",
    price: 35,
    recipe: [
      { ingredientId: "1", ingredientName: "بن اسبريسو فاخر", unit: "جرام", quantityRequired: 18 },
    ],
  },
  {
    id: "prod_spanish_latte",
    name: "سبانش لاتيه بارد / ساخن",
    categoryId: "cat_coffee",
    price: 55,
    recipe: [],
  },
  {
    id: "prod_americano",
    name: "أمريكانو كوفي (Black Americano)",
    categoryId: "cat_coffee",
    price: 35,
    recipe: [
      { ingredientId: "1", ingredientName: "بن اسبريسو فاخر", unit: "جرام", quantityRequired: 18 },
    ],
  },
  {
    id: "prod_oat_bowl",
    name: "وجبة شوفان بالحليب والعسل والموز",
    categoryId: "cat_healthy_snacks",
    price: 50,
    recipe: [
      { ingredientId: "1", ingredientName: "شوفان حبة كاملة", unit: "جرام", quantityRequired: 60 },
      { ingredientId: "2", ingredientName: "موز طازج", unit: "حبة", quantityRequired: 1 },
      { ingredientId: "3", ingredientName: "عسل نحل طبيعي", unit: "جرام", quantityRequired: 20 },
    ],
  },
  {
    id: "prod_greek_yogurt",
    name: "زبادي يوناني بالمكسرات والعسل",
    categoryId: "cat_healthy_snacks",
    price: 60,
    recipe: [],
  },
  {
    id: "prod_protein_bar",
    name: "بروتين بار صحي (Protein Bar)",
    categoryId: "cat_healthy_snacks",
    price: 45,
    recipe: [],
  },
];

export default function RavenCafe() {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchCafeData() {
      try {
        const res = await fetch("/api/cafe", { cache: "no-store" });
        const data = await res.json();

        if (!cancelled && data.success) {
          if (Array.isArray(data.categories) && data.categories.length > 0) {
            setCategories(data.categories);
          }
          if (Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
          }
          if (Array.isArray(data.devices) && data.devices.length > 0) {
            setDevices(data.devices);
          }
          setIsLive(true);
        }
      } catch (err) {
        console.error("Failed to load cafe data:", err);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchCafeData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter products by selected category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      (p.recipe &&
        p.recipe.some((r) =>
          r.ingredientName.toLowerCase().includes(searchQuery.toLowerCase().trim())
        ));
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="cafe"
      className="relative w-full bg-[#050505] py-28 px-4 md:px-8 border-t border-zinc-900 overflow-hidden font-sans"
      dir="rtl"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#d4af37]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800/80">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#d4af37]/10 text-[#f5d77f] border border-[#d4af37]/30 tracking-wider">
                <Coffee className="w-3.5 h-3.5" /> RAVEN CAFE & ROOFTOP LOUNGE
              </span>
              {isLive && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  منيو الكافيه لايف
                </span>
              )}
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              لاونج ومقهى <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f7e096] to-[#a07c1b]">Raven Cafe</span> في القمة
            </h2>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              طابق متكامل في روف الجيم مخصص للاسترخاء وتغذية العضلات. استمتع بأقوى شيكات البروتين الطبيعية، المكملات ومشروبات الطاقة قبل الحصص، القهوة المختصة، والوجبات الصحية المحسوبة بالماكروز مع صالة ألعاب PlayStation 5.
            </p>
          </div>

          {/* Direct Link to Cafe System */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://cafe.raven-gym.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#997715] text-black font-extrabold text-sm shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>فتح سيستم الكافيه الكامل</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Pillars Cards (4 Quick Highlights) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-[#d4af37]/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Dumbbell className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5">بروتين بار وسموزي</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              شيكات واي بروتين وجينر طازجة مع حليب نباتي أو خالي الدسم، فواكه، وزبدة فول سوداني بيور بعد تمرينك مباشرة.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5">طاقة واستشفاء قبل التمرين</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              جرعات بري ورك أوت، كرياتين 5 جم، ومشروبات BCAA مثلجة لرفع الأداء البدني وسرعة الاستشفاء العضلي.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-yellow-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Coffee className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5">قهوة مختصة وسخنة</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              اسبريسو سنجل ودبل بحبوب بن فاخرة، سبانش لاتيه، وأمريكانو، شاي أخضر بالنعناع لتصفية الذهن.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-indigo-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5">لاونج وبلاي ستيشن 5</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              غرف VIP خاصة وصالة مفتوحة مجهزة بأحدث أجهزة PS5 وشاشات 4K لقضاء أمتع أوقات الترفيه بعد الجيم.
            </p>
          </div>
        </div>

        {/* Live Menu Explorer Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white">
                تصفح قائمة الكافيه <span className="text-[#d4af37]">(Live Menu)</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                قائمة المشروبات والوجبات الصحية المتاحة حالياً في فرع Raven Cafe:
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="ابحث عن مشروب أو وجبة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-2.5 pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#d4af37] text-black shadow-[0_2px_15px_rgba(212,175,55,0.3)]"
                  : "bg-zinc-900/80 border border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              الكل ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? "bg-[#d4af37] text-black shadow-[0_2px_15px_rgba(212,175,55,0.3)]"
                      : "bg-zinc-900/80 border border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  <span>{cat.name}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedCategory === cat.id
                          ? "bg-black/20 text-black font-black"
                          : "bg-zinc-800 text-gray-400"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="p-16 text-center rounded-2xl border border-zinc-900 bg-zinc-950/40 text-gray-400 space-y-3">
              <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin mx-auto" />
              <p className="text-white font-bold text-sm">جارٍ جلب المنيو المحدث من السيستم...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-16 text-center rounded-2xl border border-zinc-900 bg-zinc-950/40 text-gray-400 space-y-3">
              <Coffee className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-white font-bold text-base">لا توجد منتجات مطابقة للبحث</p>
              <p className="text-xs text-zinc-500">جرب كتابة اسم منتج آخر أو اختر قسماً مختلفاً من الأعلى.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => {
                  const categoryName =
                    categories.find((c) => c.id === product.categoryId)?.name ||
                    "كافيه";
                  const price =
                    typeof product.price === "number" && product.price > 0
                      ? `${product.price} ج.م`
                      : typeof product.salePrice === "number" && product.salePrice > 0
                      ? `${product.salePrice} ج.م`
                      : "سعر الكافيه";

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ delay: Math.min(idx * 0.03, 0.3), duration: 0.25 }}
                      className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-900 hover:border-[#d4af37]/40 hover:bg-zinc-900/60 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-900 text-gray-400 border border-zinc-800">
                            {categoryName}
                          </span>
                          <span className="text-sm font-black text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1 rounded-xl">
                            {price}
                          </span>
                        </div>

                        <h4 className="text-white font-bold text-base group-hover:text-[#f5d77f] transition-colors leading-snug">
                          {product.name}
                        </h4>

                        {/* Recipe Ingredients Badges (if available) */}
                        {product.recipe && product.recipe.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {product.recipe.slice(0, 4).map((ing, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900/80 text-gray-400 border border-zinc-800/80"
                              >
                                {ing.ingredientName}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-900/80 flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                          <Check className="w-3 h-3" /> متوفر في الكافيه
                        </span>
                        <a
                          href="https://cafe.raven-gym.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#d4af37] hover:underline font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          طلب عبر السيستم <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Gaming & PlayStation Lounge Feature Card */}
        {devices.length > 0 && (
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-zinc-950 to-zinc-950 border border-indigo-500/20 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-white">
                    صالة ألعاب وبلاي ستيشن 5 (Gaming Arena)
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400">
                    أحدث أجهزة PS5 مع شاشات 4K وألعاب تنافسية في غرف VIP وصالة مفتوحة
                  </p>
                </div>
              </div>

              <a
                href="https://cafe.raven-gym.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
              >
                <span>حجز جهاز في اللاونج</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((dev) => (
                <div
                  key={dev.id}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <p className="text-sm font-bold text-white">{dev.name}</p>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{dev.type} Console</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-[#d4af37]">
                      {dev.hourPrice || 80} ج.م
                    </span>
                    <span className="text-[10px] text-gray-400 block">/ ساعة</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Big Bottom CTA Banner */}
        <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-gradient-to-r from-[#171306] via-zinc-950 to-zinc-950 border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-right max-w-xl">
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> مرحباً بك في Raven Lounge
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-white">
              جاهز لتجربة استرخاء لا تُنسى بعد تمرينك؟
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              سواء كنت ترغب في شحن طاقتك ببروتين شيك بارد، احتساء قهوتك المفضلة، أو قضاء وقت ترفيهي مع أصدقائك، لاونج ريفين بانتظارك في الطابق الخامس.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href="https://cafe.raven-gym.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#aa8410] text-black font-black text-base shadow-[0_4px_30px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
            >
              <span>زيارة سيستم الكافيه واللاونج</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
