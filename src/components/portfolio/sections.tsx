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

      <div className="relative mx-auto max-w-5xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <TypingLine text="> initializing portfolio... welcome." />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-balance max-w-5xl"
        >
          Hi, I'm <span className="text-primary">Ahamed Nusaif</span>.
          <span className="text-muted-foreground block mt-2 md:mt-4">
            I build products that inspire action, empower communities, and create <span className="italic text-accent">lasting impact.</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 max-w-2xl font-mono text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          An ambitious builder from <span className="text-foreground">Sri Lanka</span>, creating technology that empowers people and shapes the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#built"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
          >
            <Rocket className="h-4 w-4" /> View Projects
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium transition hover:border-primary hover:bg-primary/10"
          >
            <FileText className="h-4 w-4" /> Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:bg-accent/10"
          >
            <MessageCircle className="h-4 w-4" /> Contact Me
          </a>
        </motion.div>

        <CurrentlyBuilding />
      </div>
    </section>
  );
}

/* -------------------- Currently Building -------------------- */
function CurrentlyBuilding() {
  return (
    <motion.div
      id="building"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="mt-20 rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-2xl md:p-8 shadow-2xl shadow-black/20 ring-1 ring-white/5 transition-all hover:bg-card/80 hover:shadow-primary/10"
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
function SectionHeading({
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

/* -------------------- My Journey (About) -------------------- */
const STATS = [
  { n: "20+", label: "Projects" },
  { n: "2+", label: "Years Learning" },
  { n: "100%", label: "Passion" },
];
export function AboutSection() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="01 / My Journey"
        title="I build at the intersection of technology and impact."
        subtitle="My current focus is web development, robotics, AI, and community-driven platforms — products that combine craft with real social value."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/30 group-hover:scale-150" />
            <div className="text-5xl font-semibold tracking-tight">
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/40 bg-clip-text text-transparent">
                {s.n}
              </span>
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Featured + other projects -------------------- */
const OTHER = [
  { title: "Flight Booking Website", tech: ["React", "Node", "MySQL"], desc: "Search, book and manage flights with a clean booking flow.", icon: Code2 },
  { title: "Outbreak Dash", tech: ["Unity", "C#"], desc: "Top-down arcade game about surviving a city-wide outbreak.", icon: Gamepad2 },
  { title: "MicroMaze Robot", tech: ["Arduino", "C++", "Sensors"], desc: "Maze-solving micro-mouse robot built for robotics competitions.", icon: Cpu },
  { title: "Python Projects", tech: ["Python", "Automation"], desc: "A growing collection of scripts, scrapers and CLI tools.", icon: Sparkles },
  { title: "SQL Projects", tech: ["MySQL", "Schemas"], desc: "Data modeling, queries and dashboards from coursework.", icon: Code2 },
  { title: "Frontend Experiments", tech: ["React", "Framer"], desc: "Animations and micro-interactions playground.", icon: Sparkles },
];

export function WorkSection() {
  return (
    <section id="built" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="02 / Things I've Built"
        title="A featured product, plus a workshop full of side quests."
      />

      {/* Featured */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/70 backdrop-blur-2xl shadow-xl transition-all hover:border-primary/30 hover:shadow-primary/5"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
            <div className="absolute inset-0 aurora-bg" />
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative flex h-full items-center justify-center p-10">
              <div className="text-center">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Featured</div>
                <div className="mt-2 text-6xl font-semibold bg-gradient-to-br from-foreground to-foreground/40 bg-clip-text text-transparent">
                  ForFuture
                </div>
                <div className="mt-2 font-mono text-xs text-muted-foreground">civic · youth · impact</div>
              </div>
            </div>
          </div>
          <div className="p-8 md:p-10">
            <h3 className="text-3xl font-semibold tracking-tight">ForFuture</h3>
            <p className="mt-3 text-muted-foreground">
              A youth-powered platform that turns civic frustration into coordinated action —
              campaigns, petitions, volunteer matching, and transparent progress tracking.
            </p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Problem</dt>
                <dd className="mt-1 text-muted-foreground">Young people care, but lack a structured way to act together.</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Solution</dt>
                <dd className="mt-1 text-muted-foreground">A single hub to launch, join and measure local civic initiatives.</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "TypeScript", "Tailwind", "Node", "Firebase"].map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110" href="#">
                Live Demo <ArrowUpRight className="h-4 w-4" />
              </a>
              <a className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm transition hover:border-foreground" href="#">
                <GitBranch className="h-4 w-4" /> GitHub
              </a>
              <a className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm transition hover:border-accent" href="#">
                Case Study
              </a>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Other projects */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OTHER.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative flex flex-col rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-card/90 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h4 className="text-lg font-semibold">{p.title}</h4>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3 text-xs text-muted-foreground">
                <span className="link-underline">Demo</span>
                <span className="link-underline">GitHub</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------- Toolbox (Skills) -------------------- */
const TOOLBOX = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { group: "Backend", items: ["Node", "Express", "Python"] },
  { group: "Database", items: ["MySQL", "Firebase"] },
  { group: "Tools", items: ["Git", "Figma", "VS Code", "Docker"] },
];
export function ToolboxSection() {
  return (
    <section id="toolbox" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="03 / My Toolbox"
        title="The instruments I reach for, daily."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {TOOLBOX.map((g, i) => (
          <motion.div
            key={g.group}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl transition-all hover:bg-card/80 hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">{g.group}</h4>
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-sm transition hover:border-primary hover:bg-primary/10 hover:text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Experience timeline -------------------- */
const TIMELINE = [
  { icon: GraduationCap, title: "Software Engineering Student", org: "University", date: "2024 — Present", desc: "Building foundations in CS, software design, and systems." },
  { icon: Trophy, title: "Robotics Competition — MicroMaze", org: "National Level", date: "2025", desc: "Designed and programmed a maze-solving robot from scratch." },
  { icon: Sparkles, title: "Hackathon Finalist", org: "Multiple Hackathons", date: "2024 — 2025", desc: "Shipped prototypes spanning civic-tech, AI assistants and games." },
  { icon: Users, title: "Leadership", org: "Tech Community Lead", date: "2024 — Present", desc: "Mentoring peers and organizing community coding sessions." },
  { icon: Heart, title: "Volunteer Work", org: "Local Initiatives", date: "Ongoing", desc: "Volunteering for education and youth empowerment programs." },
];
export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="04 / Experience"
        title="A timeline of the things that shaped me."
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

/* -------------------- Certificates -------------------- */
const CERTS = [
  { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "2024" },
  { title: "Python for Everybody", issuer: "Coursera", date: "2024" },
  { title: "Intro to Robotics", issuer: "Open University", date: "2025" },
  { title: "JavaScript Algorithms", issuer: "freeCodeCamp", date: "2025" },
];
export function CertificatesSection() {
  return (
    <section id="certificates" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="05 / Certificates"
        title="Receipts from the learning rabbit holes."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CERTS.map((c, i) => (
          <motion.a
            key={c.title}
            href="#"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="aspect-[4/3] rounded-lg border border-border/50 bg-gradient-to-br from-primary/10 via-secondary to-accent/10 transition-colors group-hover:from-primary/20" />
            <div className="mt-4 text-sm font-semibold">{c.title}</div>
            <div className="mt-1 flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>{c.issuer}</span>
              <span>{c.date}</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-accent">
              View PDF <ArrowUpRight className="h-3 w-3" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Blog -------------------- */
const POSTS = [
  { title: "What I learned building ForFuture", read: "6 min read", date: "May 2026" },
  { title: "My React Journey", read: "4 min read", date: "Mar 2026" },
  { title: "Lessons from Robotics", read: "5 min read", date: "Jan 2026" },
];
export function BlogSection() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="06 / Field Notes"
        title="Things I wrote down so I wouldn't forget."
      />
      <ul className="divide-y divide-border/50 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-lg">
        {POSTS.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <a
              href="#"
              className="group flex items-center justify-between gap-6 px-6 py-6 transition hover:bg-secondary/30"
            >
              <div>
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">
                  {p.date} · {p.read}
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
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
    { icon: GitBranch, label: "github.com/ahamednusaif", href: "https://github.com/ahamednusaif" },
    { icon: FileText, label: "Download Resume", href: "#" },
  ];
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="07 / Say hi"
          title="Let's build something meaningful together."
          subtitle="I'm open to internships, collaborations, and weird side projects with people who care."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <a
                key={l.label}
                href={l.href}
                className="group flex items-center justify-between rounded-2xl border border-border/50 bg-card/60 px-6 py-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card/90 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-sm">{l.label}</span>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
