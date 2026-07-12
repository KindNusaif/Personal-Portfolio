import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SiteHeader, SiteFooter } from "@/components/portfolio/SiteHeader";
import {
  HeroSection,
  AboutSection,
  WorkSection,
  PathSection,
  ContactSection,
  MarqueeStrip,
  ScrollProgress,
  StackSection,
  CertificatesSection,
  BlogSection,
} from "@/components/portfolio/sections";
import { Spotlight } from "@/components/portfolio/Spotlight";

const queryClient = new QueryClient();

function Portfolio() {
  // Handle scrolling to hash on fresh page load
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Wait a tiny bit for the layout to render
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Spotlight />
      <SiteHeader />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <WorkSection />
        <PathSection />
        <StackSection />
        <CertificatesSection />
        <BlogSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Portfolio />
    </QueryClientProvider>
  );
}

export default App;
