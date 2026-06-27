import { useEffect, useState } from "react";

const NAV = [
  { href: "#building", label: "Currently Building" },
  { href: "#journey", label: "My Journey" },
  { href: "#built", label: "Things I've Built" },
  { href: "#toolbox", label: "My Toolbox" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground font-semibold">
            N
          </span>
          <span className="hidden sm:inline">nusaif.dev</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="link-underline transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-mono text-foreground transition hover:border-primary hover:bg-primary/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent blink" />
          Available
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
