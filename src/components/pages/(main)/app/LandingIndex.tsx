import Hero from "./Hero";
import About from "./About";

export default function LandingIndex() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Hero />
            <About/>
            {/* <section className="z-0 min-h-screen bg-blue-500"/> */}
        </main>
    )
}