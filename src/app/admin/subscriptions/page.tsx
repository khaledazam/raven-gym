"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Eye,
  RefreshCw,
  Phone,
  MessageCircle,
  Calendar,
  DollarSign,
  ShieldCheck,
  User,
  CreditCard,
  AlertTriangle,
  FileText,
  X,
  Trash2,
  Wallet,
  Zap,
} from "lucide-react";

interface Subscription {
  _id: string;
  referenceCode: string;
  fullName: string;
  phone: string;
  email?: string;
  age?: number;
  gender: string;
  goal?: string;
  medicalNotes?: string;
  planId: string;
  planName: string;
  durationMonths: number;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentTarget?: string;
  instapayTarget: string;
  senderAccount: string;
  transactionRef?: string;
  receiptImage?: string;
  status: "pending" | "approved" | "rejected";
  adminNotes?: string;
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalRevenue: number;
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal for previewing receipt
  const [selectedReceipt, setSelectedReceipt] = useState<{
    imageUrl: string;
    subName: string;
    refCode: string;
    sender: string;
    amount: number;
    method: string;
    target: string;
  } | null>(null);

  // Updating status state
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());

      const res = await fetch(`/api/admin/subscriptions?${params.toString()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setSubscriptions(data.subscriptions || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected" | "pending", adminNotes = "") => {
    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/subscriptions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        fetchSubscriptions();
      } else {
        alert(data.error || "تعذر تحديث حالة الطلب");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string, refCode: string) => {
    if (!confirm(`هل أنت متأكد من حذف الطلب رقم ${refCode}؟`)) return;

    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/subscriptions/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchSubscriptions();
      } else {
        alert(data.error || "تعذر حذف الطلب");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحذف");
    } finally {
      setActionLoading(null);
    }
  };

  const openWhatsAppChat = (sub: Subscription, type: "approval" | "inquiry") => {
    // Format phone to international format without leading zero
    let cleanPhone = sub.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "2" + cleanPhone;
    } else if (!cleanPhone.startsWith("20")) {
      cleanPhone = "20" + cleanPhone;
    }

    let text = "";
    const isVodafone = sub.paymentMethod === "vodafone_cash";
    const methodDesc = isVodafone ? "فودافون كاش (لرقم 01036605024)" : "إنستاباي (لحساب St pop10)";

    if (type === "approval") {
      text = `مرحباً بك يا كابتن ${sub.fullName} في Raven Gym! 🦅🔥\nتم التحقق من تحويل ${methodDesc} بنجاح واعتماد وتفعيل اشتراكك في باقة (${sub.planName}) لمدة ${sub.durationMonths} شهر.\nرقم عضويتك ومتابعتك هو: ${sub.referenceCode}.\nبانتظارك في الجيم لتسليمك بطاقة العضوية وبدء رحلتك التحولية!`;
    } else {
      text = `مرحباً كابتن ${sub.fullName}، بخصوص طلب اشتراكك في Raven Gym برقم: ${sub.referenceCode} وتحويل ${methodDesc}، نود التأكد من بعض التفاصيل...`;
    }

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="space-y-8 font-sans pb-12" dir="rtl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white flex flex-wrap items-center gap-3">
            <span>مراجعة طلبات الاشتراك والدفع</span>
            <span className="text-xs bg-red-500/15 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5" /> كاش: 01036605024
            </span>
            <span className="text-xs bg-gold/15 text-gold border border-gold/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> إنستاباي: St pop10
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            مراجعة وتدقيق التحويلات المالية الواردة عبر فودافون كاش وإنستاباي وتفعيل اشتراكات الأعضاء الجدد.
          </p>
        </div>

        <button
          onClick={fetchSubscriptions}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 px-4 py-2.5 rounded-xl text-sm font-bold transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-gold" : ""}`} />
          تحديث البيانات
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-gray/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400">بانتظار المراجعة</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-bold text-yellow-400">{stats.pending}</span>
            <span className="text-xs text-gray-400">طلب جديد</span>
          </div>
          {stats.pending > 0 && (
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-yellow-400/80">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
              يتطلب تدقيق الإيصالات واعتمادها
            </div>
          )}
        </div>

        <div className="bg-dark-gray/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400">تم الاعتماد والتفعيل</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-bold text-green-400">{stats.approved}</span>
            <span className="text-xs text-gray-400">عضوية نشطة</span>
          </div>
        </div>

        <div className="bg-dark-gray/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400">طلبات مرفوضة</span>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-bold text-red-400">{stats.rejected}</span>
            <span className="text-xs text-gray-400">طلب</span>
          </div>
        </div>

        <div className="bg-dark-gray/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400">إجمالي مدفوعات إنستاباي</span>
            <div className="w-8 h-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-bold text-gold">
              {stats.totalRevenue.toLocaleString()}
            </span>
            <span className="text-xs text-gold">ج.م</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-dark-gray/40 border border-white/10 rounded-2xl p-4">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
          {[
            { id: "all", label: "كافة الطلبات", count: stats.total },
            { id: "pending", label: "بانتظار المراجعة", count: stats.pending },
            { id: "approved", label: "تم القبول", count: stats.approved },
            { id: "rejected", label: "مرفوضة", count: stats.rejected },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                statusFilter === tab.id
                  ? "bg-gold text-black shadow-[0_0_15px_rgba(176,138,71,0.3)]"
                  : "bg-black/50 text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${statusFilter === tab.id ? "bg-black/20 text-black font-extrabold" : "bg-white/10 text-gray-300"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="بحث بالاسم، الهاتف، كود الطلب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-xs text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Subscriptions List */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-3 text-gold">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="text-sm">جاري تحميل طلبات الاشتراك...</span>
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="bg-dark-gray/30 border border-white/10 rounded-3xl p-12 text-center">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-white mb-1">لا توجد طلبات في هذا القسم حالياً</h3>
          <p className="text-xs text-gray-400">ستظهر هنا أي طلبات تسجيل جديدة يتم إرسالها من خلال الموقع.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => {
            const isPending = sub.status === "pending";
            const isApproved = sub.status === "approved";
            const isRejected = sub.status === "rejected";

            return (
              <motion.div
                key={sub._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-dark-gray/50 border rounded-2xl p-6 transition-all relative overflow-hidden ${
                  isPending
                    ? "border-yellow-500/30 hover:border-yellow-500/60 shadow-[0_0_20px_rgba(234,179,8,0.05)]"
                    : isApproved
                    ? "border-green-500/20 hover:border-green-500/40"
                    : "border-red-500/20 opacity-75"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Member & Order Info */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/10 text-gold border border-gold/30">
                        {sub.referenceCode}
                      </span>

                      <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                        {sub.fullName}
                      </h3>

                      {isPending && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                          <Clock className="w-3 h-3" /> قيد المراجعة
                        </span>
                      )}
                      {isApproved && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/30">
                          <CheckCircle2 className="w-3 h-3" /> تم القبول والتفعيل
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                          <XCircle className="w-3 h-3" /> مرفوض
                        </span>
                      )}

                      <span className="text-[11px] text-gray-500">
                        {new Date(sub.createdAt).toLocaleDateString("ar-EG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 text-xs text-gray-300">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span className="font-mono" dir="ltr">{sub.phone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CreditCard className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>
                          باقة <b>{sub.planName}</b> ({sub.durationMonths} شهر) -{" "}
                          <b className="text-white">{sub.amount.toLocaleString()} ج.م</b>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>
                          {sub.gender === "female" ? "أنثى" : "ذكر"}{" "}
                          {sub.age ? `(${sub.age} سنة)` : ""}
                        </span>
                      </div>
                    </div>

                    {/* Transfer Details Box */}
                    <div className="bg-black/60 border border-white/10 rounded-xl p-3 text-xs flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-400">طريقة الدفع:</span>
                        {sub.paymentMethod === "vodafone_cash" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/15 text-red-400 font-bold border border-red-500/30">
                            <Wallet className="w-3 h-3" /> فودافون كاش
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold/15 text-gold font-bold border border-gold/30">
                            <Zap className="w-3 h-3" /> إنستاباي
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-gray-400">المحول إليه: </span>
                        <span className="font-mono font-bold text-white">
                          {sub.paymentMethod === "vodafone_cash"
                            ? "01036605024"
                            : (sub.paymentTarget || "St pop10")}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">
                          {sub.paymentMethod === "vodafone_cash" ? "رقم محفظة المحول: " : "حساب / هاتف المحول: "}
                        </span>
                        <span className="font-mono text-white font-bold">{sub.senderAccount}</span>
                      </div>
                      {sub.transactionRef && (
                        <div>
                          <span className="text-gray-400">رقم المعاملة: </span>
                          <span className="font-mono text-gray-300">{sub.transactionRef}</span>
                        </div>
                      )}
                      {sub.medicalNotes && (
                        <div className="w-full text-yellow-400/90 text-[11px] pt-1 border-t border-white/5">
                          ⚠️ ملاحظات صحية: {sub.medicalNotes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Receipt & Actions */}
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
                    {/* Receipt Preview Thumbnail */}
                    {sub.receiptImage ? (
                      <button
                        onClick={() =>
                          setSelectedReceipt({
                            imageUrl: sub.receiptImage!,
                            subName: sub.fullName,
                            refCode: sub.referenceCode,
                            sender: sub.senderAccount,
                            amount: sub.amount,
                            method: sub.paymentMethod || "instapay",
                            target:
                              sub.paymentMethod === "vodafone_cash"
                                ? "01036605024"
                                : sub.paymentTarget || "St pop10",
                          })
                        }
                        className={`group relative w-16 h-16 rounded-xl border overflow-hidden bg-black flex-shrink-0 ${
                          sub.paymentMethod === "vodafone_cash" ? "border-red-500/40" : "border-gold/40"
                        }`}
                        title="معاينة إيصال التحويل"
                      >
                        <img
                          src={sub.receiptImage}
                          alt="إيصال التحويل"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                          <Eye className="w-5 h-5 text-gold drop-shadow" />
                        </div>
                      </button>
                    ) : (
                      <div className="w-16 h-16 rounded-xl border border-dashed border-white/15 bg-black/30 flex flex-col items-center justify-center text-[10px] text-gray-500 text-center p-1 flex-shrink-0">
                        بدون صورة إيصال
                      </div>
                    )}

                    {/* WhatsApp Action */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => openWhatsAppChat(sub, isApproved ? "approval" : "inquiry")}
                        className="inline-flex items-center justify-center gap-1.5 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
                        title="مراسلة عبر واتساب"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>واتساب</span>
                      </button>

                      <button
                        onClick={() => handleDelete(sub._id, sub.referenceCode)}
                        className="text-gray-500 hover:text-red-400 p-1 text-xs self-center transition-colors"
                        title="حذف الطلب"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Approval / Rejection Controls */}
                    <div className="flex flex-col gap-2 min-w-[130px]">
                      {isPending ? (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(sub._id, "approved")}
                            disabled={actionLoading === sub._id}
                            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>قبول وتفعيل</span>
                          </button>

                          <button
                            onClick={() => {
                              const reason = prompt("يرجى كتابة سبب رفض التحويل (اختياري):", "لم يتم العثور على التحويل في حساب إنستاباي");
                              if (reason !== null) {
                                handleUpdateStatus(sub._id, "rejected", reason);
                              }
                            }}
                            disabled={actionLoading === sub._id}
                            className="w-full bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/30 font-bold py-1.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>رفض التحويل</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleUpdateStatus(sub._id, "pending")}
                          disabled={actionLoading === sub._id}
                          className="w-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 py-1.5 px-3 rounded-xl text-[11px] transition-all"
                        >
                          إعادة للمراجعة
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal for Receipt Zoom */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full bg-[#111] border border-gold/40 rounded-3xl p-6 shadow-2xl overflow-hidden text-right"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                    {selectedReceipt.method === "vodafone_cash" ? (
                      <span className="text-red-400 flex items-center gap-1">
                        <Wallet className="w-5 h-5" /> معاينة إيصال فودافون كاش
                      </span>
                    ) : (
                      <span className="text-gold flex items-center gap-1">
                        <Zap className="w-5 h-5" /> معاينة إيصال إنستاباي
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    المشترك: <span className="text-gold font-bold">{selectedReceipt.subName}</span> | طلب: <span className="font-mono">{selectedReceipt.refCode}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto flex items-center justify-center bg-black/60 rounded-2xl p-2 border border-white/5 mb-4">
                <img
                  src={selectedReceipt.imageUrl}
                  alt="إيصال التحويل"
                  className="max-h-[55vh] w-auto object-contain rounded-xl"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="text-gray-300">
                  المحول: <b className="text-white font-mono">{selectedReceipt.sender}</b> | الحساب المستلم: <b className="text-gold font-mono">{selectedReceipt.target}</b> | المبلغ: <b className="text-white font-mono">{selectedReceipt.amount} ج.م</b>
                </div>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="bg-gold hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-xl transition-all"
                >
                  إغلاق المعاينة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
