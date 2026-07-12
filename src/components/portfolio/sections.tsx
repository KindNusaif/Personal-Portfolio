import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Particles } from "./Particles";
import {
  ArrowUpRight,
  Rocket,
  FileText,
  MessageCircle,
  GitBranch,
  ExternalLink,
  Mail,
  Cpu,
  Gamepad2,
  Code2,
  Sparkles,
  GraduationCap,
  Trophy,
  Users,
  Heart,
} from "lucide-react";

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

/* -------------------- Typing -------------------- */
function TypingLine({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span className="font-mono text-sm text-accent">
      {shown}
      <span className="ml-0.5 inline-block h-4 w-[2px] -mb-0.5 bg-accent blink" />
    </span>
  );
}

/* -------------------- HERO -------------------- */
export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-24 aurora-bg noise-bg">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0">
        <Particles />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 flex flex-col md:flex-row gap-12 items-center">
        
        <div className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <TypingLine text="> booting Nusaif OS v2.0..." />
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-balance font-display"
          >
            {["The", "Journey", "of"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                }}
                className="inline-block mr-3 sm:mr-4"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="inline-block text-primary"
            >
              Nusaif.
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 font-mono text-sm sm:text-base text-muted-foreground leading-relaxed p-6 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md shadow-2xl max-w-xl"
          >
            <div className="flex justify-between border-b border-border/50 pb-2 mb-4">
              <span className="text-accent uppercase tracking-widest text-xs">Identity Module</span>
              <span className="text-xs opacity-50">ID: NS-042</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-3">
              <span className="text-foreground/50">NAME</span>
              <span className="text-foreground">Ahamed Nusaif</span>
              
              <span className="text-foreground/50">ROLE</span>
              <span className="text-foreground">Future Builder</span>
              
              <span className="text-foreground/50">LOCATION</span>
              <span className="text-foreground">Sri Lanka</span>
              
              <span className="text-foreground/50">STATUS</span>
              <span className="text-primary font-medium">Building ForFuture</span>
              
              <span className="text-foreground/50">MISSION</span>
              <span className="text-foreground">Empower Youth</span>
              
              <span className="text-foreground/50">LEVEL</span>
              <span className="text-foreground">Undergraduate 2.0</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#built"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
            >
              <Rocket className="h-4 w-4" /> Explore Work
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium transition hover:border-accent hover:bg-accent/10"
            >
              <MessageCircle className="h-4 w-4" /> Initiate Contact
            </a>
          </motion.div>
        </div>

        <div className="flex-1 w-full max-w-md hidden md:block">
           <CurrentlyBuilding />
        </div>
      </div>
      <div className="md:hidden px-5 mt-12"><CurrentlyBuilding /></div>
    </section>
  );
}

/* -------------------- Currently Building -------------------- */
function CurrentlyBuilding() {
  return (
    <motion.div
      id="building"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
      style={{ transformPerspective: 1000 }}
      className="rounded-2xl border border-primary/20 bg-card/60 p-6 backdrop-blur-2xl md:p-8 shadow-2xl shadow-primary/10 ring-1 ring-white/5 transition-all group hover:bg-card/80 hover:shadow-primary/20"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent blink" />
            Currently Building
          </div>
          <h3 className="mt-3 text-2xl font-semibold">ForFuture</h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            A youth-powered platform for civic engagement and social impact —
            where ideas turn into measurable change.
          </p>
        </div>
        <span className="chip">v0.8 · pre-release</span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Status</span>
            <span className="text-foreground">80%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>
        <div className="font-mono text-xs text-muted-foreground md:text-right">
          Expected Next Release
          <div className="mt-1 text-foreground">August 2026</div>
        </div>
      </div>
    </motion.div>
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

/* -------------------- Origin (About) -------------------- */
export function AboutSection() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-5 py-28 relative">
      <SectionHeading
        eyebrow="01 / Origin"
        title="I build at the intersection of technology and impact."
      />
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-display"
        >
          <p className="mb-6">
            <span className="text-foreground font-medium">Born in Puttalam.</span>
          </p>
          <p className="mb-6">
            Raised by <span className="text-accent italic">curiosity</span>.
          </p>
          <p className="mb-6">
            Chose technology over tradition.
          </p>
          <p className="text-foreground">
            Building products for the next generation of Sri Lanka.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-full border border-border/50 bg-card/40 backdrop-blur-md flex items-center justify-center p-12 shadow-2xl"
        >
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-dashed border-accent/30 animate-[spin_15s_linear_infinite_reverse]" />
          <div className="text-center z-10">
            <div className="font-mono text-sm text-accent mb-2">SYSTEM.CORE</div>
            <div className="text-4xl font-semibold">100%</div>
            <div className="text-sm text-muted-foreground mt-1 uppercase tracking-widest">Passion</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- Projects (Work) -------------------- */
export function WorkSection() {
  const projects = [
    {
      title: "ForFuture",
      desc: "An AI-powered civic engagement platform that empowers young people to create meaningful social impact through volunteering, campaigns, petitions, AI-assisted idea generation, and community collaboration. Built to solve real-world challenges by connecting youth with opportunities to make a difference.",
      tech: ["React", "Vite", "Supabase", "Tailwind CSS", "AI"],
      links: [
        { label: "Live Demo", href: "#", primary: true },
        { label: "GitHub", href: "#", primary: false },
      ],
    },
    {
      title: "NusaifOS Portfolio",
      desc: "A premium personal developer portfolio built with modern web technologies, smooth animations, responsive design, and a clean user experience. It showcases my projects, technical skills, and passion for building high-quality digital products.",
      tech: ["React", "Vite", "Framer Motion", "Tailwind CSS"],
      links: [
        { label: "Live Demo", href: "#", primary: true },
        { label: "GitHub", href: "#", primary: false },
      ],
    },
  ];

  const buildingTags = [
    "AI", "Full Stack", "React", "Next.js", "Node.js", "Python", "Cloud", "Innovation", "Open Source"
  ];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-28 relative">
      <SectionHeading
        eyebrow="02 / Projects"
        title="Featured Work."
      />

      <div className="mt-12 flex flex-col gap-12">
        {/* Project Cards - Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-[0_0_40px_-10px_rgba(var(--color-primary),0.1)]"
            >
              {/* Glowing Hover Effect */}
              <div className="absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-3xl" style={{
                background: `linear-gradient(135deg, transparent 40%, color-mix(in oklab, var(--primary) 20%, transparent), color-mix(in oklab, var(--spark) 20%, transparent))`
              }} />

              <div className="relative z-10">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground/90">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:text-foreground/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-10 flex gap-4">
                {p.links.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      link.primary 
                      ? "bg-foreground text-background hover:bg-foreground/90 hover:scale-105" 
                      : "bg-white/5 border border-white/10 text-foreground/80 hover:bg-white/10 hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    {link.label} {link.primary && <ArrowUpRight className="h-4 w-4" />}
                  </a>
                ))}
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
                  I'm an enthusiastic software developer, creative innovator, and problem solver who enjoys transforming ideas into impactful digital products. My focus is on Full-Stack Development, Artificial Intelligence, UI/UX, and scalable web applications. I continuously learn, experiment, and build solutions that solve real-world problems while exploring emerging technologies.
                </p>
              </div>

              <div className="flex-1 max-w-sm">
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {buildingTags.map((tag, i) => (
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

/* -------------------- Stack (Toolbox) -------------------- */
const ARSENAL = [
  { group: "Frontend", level: 9 },
  { group: "Backend", level: 7 },
  { group: "AI / ML", level: 4 },
  { group: "Product Thinking", level: 8 },
  { group: "Leadership", level: 9 },
];

function BlockLevel({ level }: { level: number }) {
  const blocks = "██████████".split("");
  return (
    <div className="flex gap-[2px]">
      {blocks.map((b, i) => (
        <span key={i} className={`text-sm ${i < level ? "text-primary" : "text-muted/30"}`}>
          {b}
        </span>
      ))}
    </div>
  );
}

export function StackSection() {
  return (
    <section id="toolbox" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="03 / Stack"
        title="Current Arsenal."
      />
      <div className="max-w-3xl bg-card/40 backdrop-blur-md rounded-2xl border border-border/50 p-8 md:p-12 shadow-2xl">
        <div className="space-y-8">
          {ARSENAL.map((item, i) => (
             <motion.div
               key={item.group}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-center gap-2 sm:gap-4"
             >
               <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">{item.group}</span>
               <BlockLevel level={item.level} />
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Path (Experience timeline) -------------------- */
const TIMELINE = [
  { icon: GraduationCap, title: "Software Engineering Student", org: "University", date: "2024 — Present", desc: "Building foundations in CS, software design, and systems." },
  { icon: Trophy, title: "Robotics Competition — MicroMaze", org: "National Level", date: "2025", desc: "Designed and programmed a maze-solving robot from scratch." },
  { icon: Sparkles, title: "Hackathon Finalist", org: "Multiple Hackathons", date: "2024 — 2025", desc: "Shipped prototypes spanning civic-tech, AI assistants and games." },
  { icon: Users, title: "Leadership", org: "Tech Community Lead", date: "2024 — Present", desc: "Mentoring peers and organizing community coding sessions." },
  { icon: Heart, title: "Volunteer Work", org: "Local Initiatives", date: "Ongoing", desc: "Volunteering for education and youth empowerment programs." },
];
export function PathSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="04 / Path"
        title="A continuous journey of building."
      />
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border md:left-1/2" />
        <ol className="space-y-10">
          {TIMELINE.map((t, i) => {
            const Icon = t.icon;
            const left = i % 2 === 0;
            return (
              <motion.li
                key={t.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${left ? "" : "md:[direction:rtl]"}`}
              >
                <div className="absolute left-5 -translate-x-1/2 md:left-1/2">
                  <div className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card backdrop-blur-xl">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                </div>
                <div className={`pl-14 md:pl-0 md:[direction:ltr] ${left ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t.date}</div>
                  <h4 className="mt-1 text-lg font-semibold">{t.title}</h4>
                  <div className="text-sm text-muted-foreground">{t.org}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export { LearningJourney as CertificatesSection } from "./LearningJourney";

/* -------------------- Blog -------------------- */
const POSTS = [
  { title: "Architecting ForFuture: A Technical Deep Dive", read: "8 min read", date: "May 2026" },
  { title: "Why I Chose Vite Over Webpack for Modern React Apps", read: "5 min read", date: "Mar 2026" },
  { title: "Building a Maze-Solving Robot from Scratch in C++", read: "10 min read", date: "Jan 2026" },
];
export function BlogSection() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="06 / Field Notes"
        title="Things I wrote down so I wouldn't forget."
      />
      <ul className="divide-y divide-border/50 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden">
        {POSTS.map((p, i) => (
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
  const links = [
    { icon: Mail, label: "ahamednusaifofficial@gmail.com", href: "mailto:ahamednusaifofficial@gmail.com" },
    { icon: ExternalLink, label: "www.linkedin.com/in/ahamed-nusaif", href: "https://www.linkedin.com/in/ahamed-nusaif" },
    { icon: GitBranch, label: "github.com/KindNusaif", href: "https://github.com/KindNusaif" },
    { icon: FileText, label: "Download Resume", href: "/resume.pdf" },
  ];
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="07 / Say hi"
          title="Let's build something meaningful together."
          subtitle="I'm open to internships, collaborations, and weird side projects with people who care."
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

