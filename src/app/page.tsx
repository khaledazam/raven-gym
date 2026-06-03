import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import GymGallery from "@/components/sections/GymGallery";
import Transformations from "@/components/sections/Transformations";
import ClassScheduler from "@/components/sections/ClassScheduler";
import AiNutrition from "@/components/sections/AiNutrition";
import Memberships from "@/components/sections/Memberships";
import Finale from "@/components/sections/Finale";
import RavenCoachBot from "@/components/sections/RavenCoachBot";

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


