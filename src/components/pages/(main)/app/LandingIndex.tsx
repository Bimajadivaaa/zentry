import Hero from "./Hero";
import About from "./About";
import Navbar from "./_components/Navbar";
import Features from "./Features";
import Story from "./Story";
import Contact from "./Contact";
import Footer from "./Footer";

export default function LandingIndex() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}
