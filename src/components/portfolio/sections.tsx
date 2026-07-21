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
    <div className="border-y border-border bg-secondary/20 overflow-hidden py-4">
      <div className="flex w-max marquee gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
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
    <section id="top" className="relative isolate min-h-screen pt-32 pb-24 aurora-bg noise-bg flex items-center">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0">
        <Particles />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 flex flex-col lg:flex-row gap-16 lg:gap-12 items-center justify-between">
        
        {/* Left Side Content */}
        <div className="flex-1 w-full max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-balance mb-6"
          >
            {identity.headlineLine1}
            <br />
            {identity.headlineLine2}
            <br />
            <span className="text-primary">{identity.headlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
          >
            {identity.summary}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-mono text-sm sm:text-base text-muted-foreground p-6 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md shadow-2xl mb-10 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-primary blink" />
            <div className="flex justify-between items-center border-b border-border/40 pb-3 mb-4">
              <span className="text-primary uppercase tracking-[0.2em] text-[10px] flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2" />
                PROFILE OVERVIEW
              </span>
              <span className="text-[10px] opacity-60 tracking-wider">ID: {profile.id}</span>
            </div>
            
            <div className="grid grid-cols-[30px_90px_1fr] sm:grid-cols-[30px_100px_1fr] gap-y-4 gap-x-2 items-center text-[13px] sm:text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground tracking-wide">NAME</span>
              <span className="text-foreground">{profile.name}</span>
              
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground tracking-wide">ROLE</span>
              <span className="text-foreground">{profile.role}</span>
              
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground tracking-wide">LOCATION</span>
              <span className="text-foreground">{profile.location}</span>
              
              <Target className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground tracking-wide">FOCUS</span>
              <span className="text-primary font-medium">{profile.focus}</span>
              
              <Rocket className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground tracking-wide">MISSION</span>
              <span className="text-foreground">{profile.mission}</span>
              
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground tracking-wide">LEVEL</span>
              <span className="text-foreground">{profile.level}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              <Rocket className="h-4 w-4" /> View Projects
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/10 hover:bg-secondary/20 px-7 py-3.5 text-sm font-medium transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Let's Build Together
            </a>
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
  const { currentFocus, builderNotes } = contentData;
  const progressWidth = `${Math.min(100, Math.max(0, currentFocus.progress))}%`;

  return (
    <div className="w-full relative">
      <motion.div
        id="building"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        whileHover={{ y: -5 }}
        className="rounded-3xl border border-border/40 bg-card/20 p-8 backdrop-blur-xl shadow-2xl transition-all group"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary blink" />
          CURRENTLY BUILDING
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

        <div className="border-t border-border/40 pt-6 flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">PROGRESS</span>
          <span className="text-sm font-bold font-mono">{currentFocus.progress}%</span>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="w-[60%] h-1.5 overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: progressWidth }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--color-primary),0.8)]"
            />
          </div>
          <div className="text-right">
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">UPDATE CADENCE</span>
            <span className="text-sm font-mono text-foreground font-semibold">{currentFocus.updateCadence}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative mt-12 pl-6"
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
    <div className="mb-12 max-w-2xl">
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

export { OriginSection as AboutSection } from "./OriginSection";

export function WorkSection() {
  const { projects, building } = contentData;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-28 relative">
      <SectionHeading
        eyebrow="02 / Projects"
        title="Featured Work."
      />

      <div className="mt-12 flex flex-col gap-12">
        {/* Project Cards */}
        <div className="flex flex-col gap-16">
          {projects.map((p: Project) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/10 backdrop-blur-3xl transition-all duration-700 hover:border-primary/30 shadow-2xl"
            >
              {/* Layout for Image and Content */}
              <div className="flex flex-col lg:flex-row h-full">
                
                {/* Image Section */}
                <div className="lg:w-5/12 relative overflow-hidden bg-muted/20 border-b lg:border-b-0 lg:border-r border-border/40">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 lg:hidden" />
                  <img 
                    src={p.imageUrl} 
                    alt={p.title} 
                    className="h-[300px] lg:h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 backdrop-blur-md px-3 py-1.5 text-[10px] font-mono text-primary uppercase tracking-widest shadow-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      {p.status}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-7/12 p-8 sm:p-12 flex flex-col justify-between relative z-20">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8 font-display">
                      {p.title}
                    </h3>
                    
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 pb-10 border-b border-border/40">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-mono">PROJECT TYPE</div>
                        <div className="text-sm font-medium text-foreground">{p.type}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-mono">ROLE</div>
                        <div className="text-sm font-medium text-foreground">{p.role}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-mono">TIMELINE</div>
                        <div className="text-sm font-medium text-foreground">{p.timeline}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-primary uppercase tracking-widest mb-2 font-mono">IMPACT</div>
                        <div className="text-sm font-medium text-foreground">{p.impact}</div>
                      </div>
                    </div>

                    {/* Storytelling Section */}
                    {p.story && (
                      <div className="space-y-6 mb-10">
                        <div>
                          <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-2">/ Context</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">{p.story.why} {p.story.problem}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-2">/ Solution</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">{p.story.solution}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-2">/ Next</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">{p.story.next}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions & Tech */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-border/20">
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t: string) => (
                        <span key={t} className="text-[11px] font-mono text-muted-foreground bg-secondary/30 px-2 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {p.links.map((link: ProjectLink) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                            link.primary 
                            ? "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/20 hover:shadow-primary/40" 
                            : "border border-border/50 text-foreground/80 hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          {link.label} {link.primary && <ArrowUpRight className="h-3 w-3" />}
                        </a>
                      ))}
                    </div>
                  </div>
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
    <section id="toolbox" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading eyebrow="03 / Stack" title="Capability Matrix." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-12">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/20 p-8 backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-card/40"
          >
            {/* Background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
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
              
              <div className="mb-6 h-px w-full bg-border/50" />
              
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
    <section id="journey-logs" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="04 / Mission Logs"
        title="Timeline of a builder."
      />

      <div className="relative mt-16">
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
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
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
                    <div className="h-3 w-3 rounded-full border-2 border-border bg-card transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/20" />
                  )}
                </div>

                {/* Content */}
                <div className="pl-14 py-8 border-b border-border/30 last:border-b-0 group-hover:border-primary/20 transition-colors duration-500">
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
                </div>
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
  const { contact } = contentData;
  const links = [
    { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
    { icon: ExternalLink, label: contact.linkedin.replace(/^https?:\/\//, ''), href: contact.linkedin },
    { icon: GitBranch, label: contact.github.replace(/^https?:\/\//, ''), href: contact.github },
    { icon: FileText, label: "Download Resume", href: contact.resume },
  ];
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="07 / Connect"
          title="Let's build something meaningful together."
          subtitle={contact.subtitle}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-border/50 bg-card/60 px-6 py-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Subtle Sweep Background */}
                <div className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-sm break-all">{l.label}</span>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

