import Hero from "@/components/hero/Hero";
import CountdownPromo from "@/components/sections/CountdownPromo";
import About from "@/components/sections/About";
import Transformations from "@/components/sections/Transformations";
import ClassScheduler from "@/components/sections/ClassScheduler";
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
      <CountdownPromo />
      <About />
      <Transformations />
      <ClassScheduler />
      <AiNutrition />
      <Memberships />
      <Contact />
      <Finale />
      <Footer />
      <ClientWidgets />
    </main>
  );
}
