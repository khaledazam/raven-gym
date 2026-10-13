import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const tajawal = Tajawal({
  variable: "--font-sans",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "optional",
  preload: true,
});

const cairo = Cairo({
  variable: "--font-heading",
  subsets: ["arabic"],
  weight: ["700", "900"],
  display: "optional",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.raven-gym.com"),
  title: {
    default: "Raven Gym | ريفن جيم - أقوى جيم في السنبلاوين | تدريب وتغذية 24/7",
    template: "%s | Raven Gym - ريفن جيم",
  },
  description:
    "جيم Raven Gym (ريفن جيم) بالسنبلاوين - أول المشاية. طابق كامل Open-Air للكروس فيت والملاكمة والكارديو، منظومة ريكفري وسبا متكاملة (جاكوزي، سونا، حمام ثلج، حجامة، تأهيل)، تدريب احترافي 24/7 مع كابتن محمد عبدالعاطي.",
  keywords: [
    // Official Names
    "Raven",
    "Raven Gym",
    "ريفن",
    "ريفن جيم",
    "جيم ريفن",
    "جيم ريفن الرياضي",
    "جيم السنبلاوين",
    "جيم بالسنبلاوين",
    "جيم أول المشاية",
    // Common Arabic Misspellings & Phonetic Variations
    "رافن",
    "رافن جيم",
    "جيم رافن",
    "جيم رافن السنبلاوين",
    "ريفين",
    "ريفين جيم",
    "جيم ريفين",
    "جيم ريفين السنبلاوين",
    "رافين",
    "رافين جيم",
    "جيم رافين",
    "جم ريفن",
    "جم رافن",
    "جم ريفين",
    "جم السنبلاوين",
    "رفن",
    "رفن جيم",
    "جيم رفن",
    "ريفان",
    "ريفان جيم",
    "جيم ريفان",
    "ريڤن",
    "ريڤن جيم",
    "جيم ريڤن",
    // Common English Misspellings & Typos
    "Ravin",
    "Ravin Gym",
    "RavinGym",
    "Ravin Gym Sinbillawin",
    "Reven",
    "Reven Gym",
    "RevenGym",
    "Ravan",
    "Ravan Gym",
    "Raven Jim",
    "Ravin Jim",
    "Reven Jim",
    "RavenGim",
    "RavenGym",
    "Raven Egypt",
    // Accidental Keyboard Layout Mismatch (Typing English on Arabic Keyboard & Vice Versa)
    "قشرثى",
    "قشرثى لنى",
    "vdik [dl",
    // Core Amenities & Activities
    "كروس فيت السنبلاوين",
    "CrossFit السنبلاوين",
    "ملاكمة السنبلاوين",
    "Boxing السنبلاوين",
    "جيم روف في الهواء الطلق",
    "Open Air Gym السنبلاوين",
    "Raven Sky Arena",
    "كافيه روف السنبلاوين",
    "كافيه جيم السنبلاوين",
    "بروتين بار السنبلاوين",
    "Raven Sky Cafe",
    "جيم 5 ادوار السنبلاوين",
    "كابتن محمد عبدالعاطي",
    "افضل جيم في السنبلاوين",
    "Mohamed Abdelaty Raven",
    "اشتراك جيم ريفن",
    "Raven Gym Egypt",
    "Raven Gym Sinbillawin",
    "باقات جيم ريفن",
    "لياقة بدنية السنبلاوين",
  ],
  authors: [{ name: "كابتن محمد عبدالعاطي (Mohamed Abdelaty)" }],
  creator: "Raven Gym",
  publisher: "Raven Gym",
  formatDetection: {
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "ar-EG": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Raven Gym | ريفن جيم - جيم اللياقة البدنية والتدريب 24/7 بالسنبلاوين",
    description:
      "أقوى جيم بالسنبلاوين (أول المشاية، بجوار تشكن فاكتور، عمارة التوحيد والنور). تدريب ذكي، خطط تغذية، وأجهزة متطورة 24 ساعة تحت إشراف كابتن محمد عبدالعاطي.",
    url: "https://www.raven-gym.com",
    siteName: "Raven Gym | ريفن جيم",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Raven Gym - ريفن جيم",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raven Gym | ريفن جيم - تدريب وتغذية 24/7 بالسنبلاوين",
    description:
      "جيم Raven Gym (ريفن جيم) بالسنبلاوين - أول المشاية، بجوار تشكن فاكتور، عمارة التوحيد والنور. تدريب ذكي ونتائج حقيقية.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "1znth3vzOYVkqahoEAYDOk6ssDom8tdtFQY3joprldU",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  "@id": "https://www.raven-gym.com/#gym",
  name: "Raven Gym",
  alternateName: [
    "ريفن جيم",
    "جيم ريفن",
    "Raven",
    "ريفن",
    "جيم ريفن الرياضي",
    "Raven Gym Sinbillawin",
    "جيم رافن",
    "رافن جيم",
    "رافن",
    "جيم ريفين",
    "ريفين جيم",
    "ريفين",
    "جيم رافين",
    "رافين جيم",
    "رافين",
    "جم ريفن",
    "جم رافن",
    "جم ريفين",
    "جيم رفن",
    "رفن جيم",
    "ريڤن جيم",
    "جيم ريڤن",
    "Ravin Gym",
    "Ravin",
    "Reven Gym",
    "Reven",
    "Ravan Gym",
    "Ravan",
    "Raven Jim",
    "Ravin Jim",
    "Reven Jim",
    "RavenGym",
    "RavenGim",
    "قشرثى",
    "قشرثى لنى",
  ],
  url: "https://www.raven-gym.com",
  logo: "https://www.raven-gym.com/logo.png",
  image: [
    "https://www.raven-gym.com/logo.png",
    "https://www.raven-gym.com/images/sky_arena_main.png",
    "https://www.raven-gym.com/images/strength_arena.png",
    "https://www.raven-gym.com/images/cardio_loft.png",
  ],
  description:
    "جيم Raven Gym (ريفن جيم) بالسنبلاوين - أول المشاية، بجوار تشكن فاكتور، عمارة التوحيد والنور. تدريب متكامل 24 ساعة يومياً، برامج تغذية ذكية، وكوادر تدريبية احترافية تحت إشراف كابتن محمد عبدالعاطي.",
  telephone: "+201036605024",
  priceRange: "$$",
  currenciesAccepted: "EGP",
  paymentAccepted: "Cash, InstaPay, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "أول المشاية، بجوار تشكن فاكتور، عمارة التوحيد والنور",
    addressLocality: "السنبلاوين",
    addressRegion: "الدقهلية",
    postalCode: "35661",
    addressCountry: "EG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.884098,
    longitude: 31.457378,
  },
  hasMap: "https://www.google.com/maps?q=30.884098,31.457378",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  founder: {
    "@type": "Person",
    name: "كابتن محمد عبدالعاطي",
    jobTitle: "Head Coach & Founder",
  },
  sameAs: [
    "https://wa.me/201036605024",
    "https://wa.me/201027272505",
    "https://instagram.com/raven_gym1",
    "https://www.tiktok.com/@raven.gym",
    "https://www.facebook.com/share/1C15kFpH3U/?mibextid=wwXIfr",
  ],
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "مفتوح 24 ساعة (24/7)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "تكييف مركزي متطور",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "أنظمة تدريب ذكية ومتابعة قياسات",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "أحدث أجهزة القوة والكارديو العالمية",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "جاكوزي مائي ساخن (Hydrotherapy Jacuzzi)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "سونا جافة (Dry Sauna)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "غرفة بخار رطب (Steam Room)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "حمام ثلج رياضي (Athletic Ice Bath)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "حجامة رياضية تخصصية (Sports Cupping Therapy)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "تأهيل حركي وعلاج طبيعي (Physiotherapy & Rehabilitation)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "ساحة تدريب مفتوح في الهواء الطلق (Open-Air Rooftop Sky Arena)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "محطة كروس فيت وتدريب وظيفي ورفع أثقال أولمبي (CrossFit Rig)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "ركن ملاكمة وأكياس تدريب قتالي (Boxing & Combat Zone)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "كافيه روف مفتوح ولاونج صحي (Raven Sky Cafe & Rooftop Lounge)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "بروتين بار ومشروبات طاقة طبيعية (Protein Bar & Shakes)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "طابق كامل مخصص لأجهزة الأرجل والكارديو (Legs & Cardio Dedicated Floor)",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "طابق كامل مخصص لأجهزة القوة والأوزان الحرة (Strength & Upper Body Dedicated Floor)",
      value: true,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${cairo.variable} h-full antialiased dark`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="1znth3vzOYVkqahoEAYDOk6ssDom8tdtFQY3joprldU"
        />
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col no-scrollbar font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
