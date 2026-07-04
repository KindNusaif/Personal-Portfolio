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
        <StackSection />
        <PathSection />
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
