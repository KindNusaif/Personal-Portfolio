import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SiteHeader, SiteFooter } from "@/components/portfolio/SiteHeader";
import {
  HeroSection,
  AboutSection,
  WorkSection,
  MissionLogsSection,
  ContactSection,
  MarqueeStrip,
  ScrollProgress,
  StackSection,
  BlogSection,
} from "@/components/portfolio/sections";
import { Spotlight } from "@/components/portfolio/Spotlight";
import { AdminPortal } from "@/components/portfolio/AdminPortal";

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
        <MissionLogsSection />
        <StackSection />
        <BlogSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/admin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? <AdminPortal /> : <Portfolio />}
    </QueryClientProvider>
  );
}
