import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import BuildingFloors from "@/components/sections/BuildingFloors";
import SkyArena from "@/components/sections/SkyArena";
import RecoverySpa from "@/components/sections/RecoverySpa";
import Transformations from "@/components/sections/Transformations";
import ClassScheduler from "@/components/sections/ClassScheduler";
import RavenCafe from "@/components/sections/RavenCafe";
import AiNutrition from "@/components/sections/AiNutrition";
import Memberships from "@/components/sections/Memberships";
import Contact from "@/components/sections/Contact";
import Finale from "@/components/sections/Finale";
import Footer from "@/components/layout/Footer";
import ClientWidgets from "@/components/sections/ClientWidgets";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-black">
      <Hero />
      <About />
      <BuildingFloors />
      <SkyArena />
      <RecoverySpa />
      <Transformations />
      <ClassScheduler />
      <RavenCafe />
      <AiNutrition />
      <Memberships />
      <Contact />
      <Finale />
      <Footer />
      <ClientWidgets />
    </main>
  );
}
