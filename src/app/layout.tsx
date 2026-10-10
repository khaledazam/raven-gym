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
    "جيم Raven Gym (ريفن جيم) بالسنبلاوين - أول المشاية، بجوار تشكن فاكتور، عمارة التوحيد والنور. تدريب احترافي 24 ساعة، خطط تغذية ذكية مع كابتن محمد عبدالعاطي، أحدث الأجهزة واشتراكات حصرية.",
  keywords: [
    "Raven",
    "Raven Gym",
    "ريفن",
    "ريفن جيم",
    "جيم ريفن",
    "جيم ريفن الرياضي",
    "جيم السنبلاوين",
    "جيم بالسنبلاوين",
    "جيم أول المشاية",
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
  alternateName: ["ريفن جيم", "جيم ريفن", "Raven", "ريفن", "جيم ريفن الرياضي", "Raven Gym Sinbillawin"],
  url: "https://www.raven-gym.com",
  logo: "https://www.raven-gym.com/logo.png",
  image: [
    "https://www.raven-gym.com/logo.png",
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
