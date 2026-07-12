import { useEffect, useState } from "react";

const NAV = [
  { href: "#journey", label: "Origin" },
  { href: "#built", label: "Work" },
  { href: "#toolbox", label: "Stack" },
  { href: "#experience", label: "Path" },
  { href: "#learning-journey", label: "Learning" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Scroll spy logic
      let current = "";
      const sections = NAV.map(n => n.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is within the viewport
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/40 backdrop-blur-3xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm tracking-tight font-semibold">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/20 text-primary">
            N
          </span>
          <span className="hidden sm:inline tracking-wider uppercase">Nusaif.</span>
        </a>

        <nav className="hidden md:flex items-center gap-10 text-sm">
          {NAV.map((n) => {
            const isActive = activeSection === n.href.substring(1);
            return (
              <a
                key={n.href}
                href={n.href}
                className={`link-underline transition-colors duration-300 ${
                  isActive ? "text-foreground font-medium" : "text-foreground/70 hover:text-primary"
                }`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-mono font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-primary/20"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent blink" />
          Say hi
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
        <span>© {new Date().getFullYear()} Ahamed Nusaif · Crafted with intent.</span>
        <span>
          Made in <span className="text-foreground">Sri Lanka</span> · Powered by curiosity
        </span>
      </div>
    </footer>
  );
}
