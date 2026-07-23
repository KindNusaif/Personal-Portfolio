import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { href: "#journey", label: "Origin" },
  { href: "#projects", label: "Work" },
  { href: "#toolbox", label: "Stack" },
  { href: "#journey-logs", label: "Journey" },
  { href: "#contact", label: "Connect" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "";
      const sections = NAV.map(n => n.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/40 backdrop-blur-3xl border-b border-border/10 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <motion.a 
          href="#top" 
          className="flex items-center gap-2 font-mono text-sm tracking-tight font-semibold group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="relative grid h-7 w-7 place-items-center rounded-md bg-primary/20 text-primary overflow-hidden">
            <motion.span 
              className="absolute inset-0 bg-primary/0"
              whileHover={{ backgroundColor: "rgba(var(--color-primary), 0.3)" }}
              transition={{ duration: 0.3 }}
            />
            N
          </span>
          <span className="hidden sm:inline tracking-wider uppercase">Nusaif.</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((n) => {
            const isActive = activeSection === n.href.substring(1);
            const isHovered = hoveredSection === n.href;
            return (
              <motion.a
                key={n.href}
                href={n.href}
                onMouseEnter={() => setHoveredSection(n.href)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? "text-foreground font-medium" 
                    : "text-foreground/70 hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {n.label}
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            );
          })}
        </nav>

        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-5 py-2 text-xs font-mono font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 shadow-lg shadow-primary/30 hover:shadow-primary/50"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
          </span>
          Let's Build
        </motion.a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/10 mt-32 relative overflow-hidden">
      {/* Premium Ambient Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/10 to-primary/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="mx-auto max-w-6xl px-5 py-20 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <motion.div 
            className="font-mono text-xs uppercase tracking-[0.3em] text-primary/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            END OF TRANSMISSION
          </motion.div>
          
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Mission Complete.
          </motion.h3>
          
          <motion.p 
            className="text-sm text-muted-foreground/80 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Built with curiosity. Designed with purpose.
          </motion.p>
          
          <motion.div 
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground/70 pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span>© {new Date().getFullYear()} Ahamed Nusaif</span>
            <span className="text-primary">·</span>
            <span>Made in Sri Lanka</span>
            <span className="text-primary">·</span>
            <span>See you in the next chapter</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
