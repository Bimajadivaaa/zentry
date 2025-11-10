import Hero from "./Hero";
import About from "./About";
import Navbar from "./_components/Navbar";
import Features from "./Features";

export default function LandingIndex() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features/>

      {/* <section className="z-0 min-h-screen bg-blue-500"/> */}
    </main>
  );
}
