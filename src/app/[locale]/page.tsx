import AboutSection from "@/components/About/AboutSection";
import ContactSection from "@/components/Contact/ContactUs";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import ServicesSection from "@/components/Serivces/Services";
export default function page() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <Projects />
      <ContactSection />
      <Footer />
    </main>
  );
}
