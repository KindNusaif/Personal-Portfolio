import { motion, useScroll, useSpring } from "framer-motion";
import { Particles } from "./Particles";
import {
  ArrowUpRight,
  Rocket,
  FileText,
  MessageCircle,
  GitBranch,
  ExternalLink,
  Mail,
  GraduationCap,
  User,
  Briefcase,
  MapPin,
  Target,
  Quote,
  Mouse,
} from "lucide-react";
import contentData from "@/data/index";
import type { Project, ProjectLink } from "@/types/content";

/* -------------------- Scroll progress -------------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-primary"
      style={{ scaleX: x }}
    />
  );
}

/* -------------------- Marquee -------------------- */
const MARQUEE = [
  "Software Engineering Student",
  "ForFuture",
  "Robotics",
  "Frontend",
  "Game Dev",
  "AI",
  "Community",
];
export function MarqueeStrip() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="border-y border-border/10 bg-background/30 overflow-hidden py-4 backdrop-blur-sm">
      <div className="flex w-max marquee gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-12 hover:text-primary transition-colors duration-300 cursor-default">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------- HERO -------------------- */
export function HeroSection() {
  const { identity, contact } = contentData;
  const { profile } = identity;

  return (
    <section id="top" className="relative isolate min-h-screen pt-32 pb-24 aurora-bg noise-bg flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0">
        <Particles />
      </div>
      {/* Enhanced Bottom Gradient for Smooth Transition */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background via-background/80 to-background/30 pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-5 flex flex-col lg:flex-row gap-16 lg:gap-12 items-center justify-between">
        
        {/* Left Side Content */}
        <div className="flex-1 w-full max-w-2xl relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-balance mb-6 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            {identity.headlineLine1}
            <br />
            {identity.headlineLine2}
            <br />
            <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{identity.headlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-10 max-w-xl"
          >
            {identity.summary}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-mono text-sm sm:text-base text-muted-foreground p-6 rounded-2xl border border-border/20 bg-background/30 backdrop-blur-xl shadow-2xl mb-10 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-primary blink" />
            <div className="flex justify-between items-center border-b border-border/20 pb-3 mb-4">
              <span className="text-primary uppercase tracking-[0.2em] text-[10px] flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2" />
                SYSTEM STATUS
              </span>
              <span className="text-[10px] opacity-60 tracking-wider">ID: {profile.systemId}</span>
            </div>
            
            <div className="grid grid-cols-[30px_90px_1fr] sm:grid-cols-[30px_100px_1fr] gap-y-4 gap-x-2 items-center text-[13px] sm:text-sm">
              <User className="h-4 w-4 text-muted-foreground/70" strokeWidth={1.5} />
              <span className="text-muted-foreground/70 tracking-wide">NAME</span>
              <span className="text-foreground/90">{profile.name}</span>
              
              <Briefcase className="h-4 w-4 text-muted-foreground/70" strokeWidth={1.5} />
              <span className="text-muted-foreground/70 tracking-wide">ROLE</span>
              <span className="text-foreground/90">{profile.role}</span>
              
              <MapPin className="h-4 w-4 text-muted-foreground/70" strokeWidth={1.5} />
              <span className="text-muted-foreground/70 tracking-wide">LOCATION</span>
              <span className="text-foreground/90">{profile.location}</span>
              
              <Target className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span className="text-muted-foreground/70 tracking-wide">MISSION</span>
              <span className="text-primary font-medium">{profile.mission}</span>
              
              <Rocket className="h-4 w-4 text-muted-foreground/70" strokeWidth={1.5} />
              <span className="text-muted-foreground/70 tracking-wide">OBJECTIVE</span>
              <span className="text-foreground/90">{profile.currentObjective}</span>
              
              <GraduationCap className="h-4 w-4 text-muted-foreground/70" strokeWidth={1.5} />
              <span className="text-muted-foreground/70 tracking-wide">STATUS</span>
              <span className="text-primary font-medium">{profile.status}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 shadow-lg shadow-primary/30 hover:shadow-primary/50"
            >
              <Rocket className="h-4 w-4" strokeWidth={1.5} /> View Projects
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-flex items-center gap-2 rounded-2xl border border-border/20 bg-gradient-to-r from-background/50 to-background/30 hover:bg-secondary/50 px-7 py-3.5 text-sm font-medium transition-all"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> Let's Build Together
            </motion.a>
          </motion.div>

          {/* Footer of Hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Mouse className="h-4 w-4 animate-bounce" />
              <span>Scroll to explore</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span>Let's connect</span>
              <div className="flex gap-2">
                <a href={contact.linkedin} className="p-2 rounded-lg bg-card border border-border/40 hover:bg-secondary transition-colors" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href={contact.github} className="p-2 rounded-lg bg-card border border-border/40 hover:bg-secondary transition-colors" aria-label="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href={`mailto:${contact.email}`} className="p-2 rounded-lg bg-card border border-border/40 hover:bg-secondary transition-colors" aria-label="Email"><Mail className="h-4 w-4" /></a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side Content */}
        <div className="flex-1 w-full max-w-lg lg:max-w-md hidden lg:block">
           <CurrentlyBuilding />
        </div>
      </div>
      <div className="lg:hidden px-5 mt-12 w-full max-w-lg mx-auto"><CurrentlyBuilding /></div>
    </section>
  );
}

/* -------------------- Currently Building -------------------- */
function CurrentlyBuilding() {
  const { currentFocus, builderNotes, nowBuilding } = contentData;

  return (
    <div className="w-full relative">
      <motion.div
        id="building"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        whileHover={{ y: -5 }}
        className="rounded-3xl border border-border/10 bg-background/20 p-8 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] transition-all group"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary blink" />
          CURRENT BUILD
        </div>

        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-3xl font-bold tracking-tight">{currentFocus.title}</h3>
          <div className="text-primary opacity-80 mt-1">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12l5.25 5 2.625-3 2.625 3 5.25-5-2.625-3-2.625 3-2.625-3-2.625 3L2 12z"/><path d="M12 2v20"/><path d="M22 12l-5.25-5-2.625 3-2.625-3-5.25 5 2.625 3 2.625-3 2.625 3 2.625-3L22 12z"/></svg>
          </div>
        </div>

        <p className="text-sm text-muted-foreground/90 leading-relaxed mb-6 font-mono whitespace-pre-line">
          {currentFocus.description}
        </p>
        
        <div className="inline-block mb-10">
          <span className="px-3 py-1 text-xs font-mono rounded-full border border-primary/30 bg-primary/10 text-primary">{currentFocus.version}</span>
        </div>

        <div className="border-t border-border/40 pt-6 flex justify-between items-center">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">STATUS</span>
          <span className="text-sm font-bold font-mono text-primary">{currentFocus.status}</span>
        </div>
      </motion.div>

      {/* NOW BUILDING MODULE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8 rounded-2xl border border-border/10 bg-background/20 p-6 backdrop-blur-xl shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          NOW BUILDING
        </div>
        <div className="space-y-2">
          {nowBuilding.map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="flex items-center gap-3 text-sm font-mono text-muted-foreground"
            >
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative mt-8 pl-6"
      >
        <Quote className="absolute -left-2 -top-2 h-6 w-6 text-primary/30 rotate-180" />
        <p className="text-[15px] font-mono text-muted-foreground leading-loose whitespace-pre-line">
          {builderNotes.quote}
        </p>
      </motion.div>
    </div>
  );
}

/* -------------------- helpers -------------------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-16 max-w-2xl">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary/80 mb-3 flex items-center gap-3">
        <span className="h-px w-12 bg-gradient-to-r from-primary/60 to-transparent" />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base text-muted-foreground/80 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

export { OriginSection as AboutSection } from "./OriginSection";

export function WorkSection() {
  const { projects, building } = contentData;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-32 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <SectionHeading
        eyebrow="02 / Projects"
        title="Featured Work."
      />

      <div className="mt-16 relative z-10">
        {/* Project Cards Grid - Scalable 3-column layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p: Project, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-border/10 bg-background/10 backdrop-blur-3xl transition-all duration-500 hover:border-primary/25 hover:shadow-[0_20px_40px_-10px_rgba(var(--color-primary),0.15)] hover:shadow-2xl"
            >
              {/* Card Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Project Number & Stage - Top Bar */}
              <div className="absolute top-3 left-3 right-3 z-30 flex justify-between items-start">
                <span className="text-[9px] font-mono text-primary/50 uppercase tracking-[0.25em]">
                  0{index + 1}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full border backdrop-blur-md px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider shadow-md ${
                  p.status.includes('Live') || p.status.includes('Deployed')
                    ? 'border-green-500/30 bg-green-500/10 text-green-400' 
                    : p.status.includes('Beta') || p.status.includes('Prototype')
                    ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
                    : 'border-primary/30 bg-primary/10 text-primary'
                }`}>
                  <span className={`h-1 w-1 rounded-full ${
                    p.status.includes('Live') || p.status.includes('Deployed') ? 'bg-green-400 animate-pulse' 
                    : p.status.includes('Beta') || p.status.includes('Prototype') ? 'bg-yellow-400' 
                    : 'bg-primary'
                  }`} />
                  {p.status.split(' ')[0]}
                </span>
              </div>

              {/* Image Section - Compact Hero (50% of card) */}
              <div className="relative overflow-hidden aspect-[16/9] bg-muted/10">
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent z-10" />
                <motion.img 
                  src={p.imageUrl} 
                  alt={p.title} 
                  className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>

              {/* Content Section - Compact */}
              <div className="p-5 relative z-10">
                {/* Project Title */}
                <h3 className="text-lg font-bold tracking-tight text-foreground mb-2 font-display">
                  {p.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4 line-clamp-2">
                  {p.desc}
                </p>

                {/* Compact Metadata Row */}
                <div className="flex items-center gap-3 mb-4 text-[9px] font-mono text-muted-foreground/50">
                  <span>{p.type}</span>
                  <span className="text-primary/40">·</span>
                  <span>{p.role}</span>
                </div>

                {/* Technologies - Minimal */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.slice(0, 3).map((t: string) => (
                    <span 
                      key={t} 
                      className="text-[9px] font-mono text-muted-foreground/40 bg-secondary/10 px-2 py-0.5 rounded-md border border-border/10"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="text-[9px] font-mono text-muted-foreground/30">+{p.tech.length - 3}</span>
                  )}
                </div>
                
                {/* Actions - Compact */}
                <div className="flex gap-2">
                  {p.links.map((link: ProjectLink) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                        link.primary 
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:brightness-110 shadow-md shadow-primary/30 hover:shadow-primary/50" 
                        : "border border-border/20 bg-background/30 text-foreground/80 hover:bg-secondary/50 hover:text-foreground hover:border-primary/20"
                      }`}
                    >
                      {link.label.includes('Launch') ? 'Launch' : link.label.includes('Source') ? 'Source' : link.label.includes('Case') ? 'Case' : link.label}
                      <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Building Card - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-1 shadow-2xl transition-all duration-500 hover:border-white/10"
        >
          {/* Animated Gradient Background inside border */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-spark/10 to-primary/10 opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
          
          <div className="relative h-full w-full rounded-[23px] bg-background/50 p-8 md:p-12 backdrop-blur-2xl">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
              
              <div className="flex-1 max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  More exciting projects coming soon.
                </div>
                
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight font-display mb-4">
                  🚀 Building the Future
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {building.text}
                </p>
              </div>

              <div className="flex-1 max-w-sm">
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {building.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (i * 0.05) }}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-foreground/70 transition-colors hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- Stack (Capability Matrix) -------------------- */
export function StackSection() {
  const { capabilities } = contentData;

  return (
    <section id="toolbox" className="mx-auto max-w-6xl px-5 py-32 relative overflow-hidden">
      {/* Premium Ambient Effects */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <SectionHeading eyebrow="03 / Stack" title="Capability Matrix." />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 mt-16 relative z-10">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-border/10 bg-background/10 p-8 backdrop-blur-3xl transition-all hover:border-primary/25 hover:bg-background/20 hover:shadow-[0_15px_35px_-5px_rgba(var(--color-primary),0.12)] hover:shadow-xl"
          >
            {/* Background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative z-10">
              <h3 className="mb-6 font-mono text-lg font-semibold tracking-wider text-foreground">
                {cap.category}
              </h3>
              
              <div className="mb-6 grid grid-cols-[80px_1fr] items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <span>STATUS</span>
                <span className={`flex items-center gap-2 font-semibold ${cap.statusColor}`}>
                  <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${cap.statusColor === "text-primary" ? "bg-primary" : "bg-accent"}`} />
                  {cap.status}
                </span>
              </div>
              
              <div className="mb-6 h-px w-full bg-border/10" />
              
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {cap.desc}
              </p>
              
              <div className="font-mono text-[11px] font-medium text-foreground/70 uppercase tracking-widest">
                {cap.tech}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Mission Logs (Journey Timeline) -------------------- */
export function MissionLogsSection() {
  const logs = contentData.missionLogs;

  return (
    <section id="journey-logs" className="mx-auto max-w-6xl px-5 py-32 relative overflow-hidden">
      {/* Premium Ambient Effects */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <SectionHeading
        eyebrow="04 / Mission Logs"
        title="Timeline of a builder."
      />

      <div className="relative mt-16 relative z-10">
        {/* Vertical timeline line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border/40 to-transparent" />

        <div className="flex flex-col gap-0">
          {logs.map((entry, i) => {
            const isLast = i === logs.length - 1;
            return (
              <motion.div
                key={entry.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative"
              >
                {/* Timeline node */}
                <div className="absolute left-[23px] top-8 -translate-x-1/2 z-10">
                  {isLast ? (
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-4 w-4 rounded-full bg-primary border-2 border-background shadow-[0_0_12px_rgba(var(--color-primary),0.6)]" />
                    </span>
                  ) : (
                    <motion.div 
                      className="h-3 w-3 rounded-full border-2 border-border bg-card transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/20"
                      whileHover={{ scale: 1.2 }}
                    />
                  )}
                </div>

                {/* Content */}
                <motion.div 
                  className="pl-14 py-8 border-b border-border/10 last:border-b-0 group-hover:border-primary/10 transition-colors duration-500"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-baseline gap-6 mb-3">
                    <span className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight ${isLast ? "text-primary" : "text-foreground/80"}`}>
                      {entry.year}
                    </span>
                    {isLast && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-mono text-primary uppercase tracking-widest">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        NOW
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl group-hover:text-foreground/70 transition-colors duration-500">
                    {entry.log}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { CertificatesSection } from "./CertificatesSection";

/* -------------------- Blog (Field Notes) -------------------- */
export function BlogSection() {
  const { fieldNotes } = contentData;

  // Don't render section if no field notes
  if (!fieldNotes || fieldNotes.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="06 / Field Notes"
        title="Things I wrote down so I wouldn't forget."
      />
      <ul className="divide-y divide-border/50 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden">
        {fieldNotes.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <a
              href="#"
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 px-6 py-8 transition-colors hover:bg-primary/5"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 transition-transform origin-top group-hover:scale-y-100" />
              <div className="transition-transform duration-300 group-hover:translate-x-2">
                <div className="text-xl font-semibold">{p.title}</div>
                <div className="mt-2 font-mono text-xs text-muted-foreground flex items-center gap-3">
                  <span className="text-primary">{p.date}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{p.read}</span>
                </div>
              </div>
              <div className="h-10 w-10 shrink-0 grid place-items-center rounded-full border border-border/50 bg-background/50 transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary" />
              </div>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------- Contact -------------------- */
export function ContactSection() {
  const { contact, systemStatus } = contentData;
  const links = [
    { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
    { icon: ExternalLink, label: contact.linkedin.replace(/^https?:\/\//, ''), href: contact.linkedin },
    { icon: GitBranch, label: contact.github.replace(/^https?:\/\//, ''), href: contact.github },
    { icon: FileText, label: "Download Resume", href: contact.resume },
  ];
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      {/* Premium Ambient Effects */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] via-transparent to-primary/[0.02] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-5 py-32 relative z-10">
        <SectionHeading
          eyebrow="07 / Connect"
          title="Have an idea worth building?"
          subtitle={contact.subtitle}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {links.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.02 }}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-border/10 bg-background/30 px-6 py-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-[0_8px_24px_-4px_rgba(var(--color-primary),0.12)] hover:shadow-xl"
              >
                {/* Subtle Sweep Background */}
                <div className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10 group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-sm break-all text-foreground/90">{l.label}</span>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" strokeWidth={1.5} />
              </motion.a>
            );
          })}
        </div>

        {/* SYSTEM STATUS PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 rounded-2xl border border-border/10 bg-background/20 p-6 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary blink" />
            SYSTEM STATUS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-[10px] text-muted-foreground/70 uppercase tracking-widest mb-1 font-mono">STATUS</div>
              <div className="text-sm font-medium text-primary">{systemStatus.status}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground/70 uppercase tracking-widest mb-1 font-mono">LOCATION</div>
              <div className="text-sm font-medium text-foreground/90">{systemStatus.location}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground/70 uppercase tracking-widest mb-1 font-mono">OBJECTIVE</div>
              <div className="text-sm font-medium text-foreground/90">{systemStatus.objective}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground/70 uppercase tracking-widest mb-1 font-mono">AVAILABLE FOR</div>
              <div className="text-sm font-medium text-foreground/90">{systemStatus.availableFor.join(", ")}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

