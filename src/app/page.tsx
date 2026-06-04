"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";

// Dynamically import heavy sections below the fold
const GymGallery = dynamic(() => import("@/components/sections/GymGallery"), {
  ssr: false,
  loading: () => <div className="h-[80vh] w-full bg-black animate-pulse" />
});

const Transformations = dynamic(() => import("@/components/sections/Transformations"), {
  ssr: false,
  loading: () => <div className="h-[80vh] w-full bg-black animate-pulse" />
});

const ClassScheduler = dynamic(() => import("@/components/sections/ClassScheduler"), {
  ssr: false,
  loading: () => <div className="h-[80vh] w-full bg-black animate-pulse" />
});

const AiNutrition = dynamic(() => import("@/components/sections/AiNutrition"), {
  ssr: false,
  loading: () => <div className="h-[80vh] w-full bg-black animate-pulse" />
});

const Memberships = dynamic(() => import("@/components/sections/Memberships"), {
  ssr: false,
  loading: () => <div className="h-[80vh] w-full bg-black animate-pulse" />
});

const Finale = dynamic(() => import("@/components/sections/Finale"), {
  ssr: false,
  loading: () => <div className="h-[80vh] w-full bg-black animate-pulse" />
});

const RavenCoachBot = dynamic(() => import("@/components/sections/RavenCoachBot"), {
  ssr: false
});

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-black">
      <Hero />
      <About />
      <GymGallery />
      <Transformations />
      <ClassScheduler />
      <AiNutrition />
      <Memberships />
      <Finale />
      <RavenCoachBot />
    </main>
  );
}
