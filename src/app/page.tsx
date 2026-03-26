import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Positioning from "@/components/Positioning";
import ServicesCircleNav from "@/components/ServicesCircleNav";
import TrustSafety from "@/components/TrustSafety";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Positioning />
      <ServicesCircleNav />
      <TrustSafety />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
