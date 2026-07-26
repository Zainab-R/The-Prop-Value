import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EstimatePreview from "@/components/landing/EstimatePreview";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CallToAction from "@/components/landing/CallToAction";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import FAQ from "@/components/landing/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Hero />
        <Features />
        <HowItWorks />
        <EstimatePreview />
        <CallToAction />
        <WhyChooseUs />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}