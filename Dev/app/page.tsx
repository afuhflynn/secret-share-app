import Navbar from "@/components/main-navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import PricingSection from "@/components/pricing-section";
import CTASection from "@/components/cta-section";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-screen">
      <Navbar />
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <HeroSection />
        {/* Features Section */}
        <FeaturesSection />
        {/* How It Works Section */}
        <HowItWorks />
        {/* Testimonials Section */}
        <Testimonials />
        {/* Pricing Section */}
        <PricingSection />
        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
