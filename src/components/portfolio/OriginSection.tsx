import { motion } from "framer-motion";
import {
  MapPin,
  BrainCircuit,
  Code2,
  Rocket,
  Zap,
  Target,
  TrendingUp,
  Heart,
  type LucideIcon,
  GraduationCap,
  Trophy,
  Sparkles,
  Users,
} from "lucide-react";
import contentData from "@/data/index";

const ORIGIN_ICONS: Record<string, LucideIcon> = {
  MapPin,
  BrainCircuit,
  Code2,
  Rocket,
  GraduationCap,
  Trophy,
  Sparkles,
  Users,
  Heart,
  Zap,
  Target,
};

export function OriginSection() {
  const { about } = contentData;

  return (
    <section id="journey" className="relative mx-auto max-w-7xl px-5 py-32 overflow-hidden">
      {/* Premium Ambient Effects */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-3xl relative z-10">
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-primary/60 to-transparent" />
            <span>01 / ORIGIN</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-5">
            Why <span className="text-primary">I build.</span>
          </h2>
          <p className="text-lg text-muted-foreground/90 leading-relaxed max-w-2xl">
            I'm not just learning software engineering. I'm building products that solve real problems, and this portfolio is the living record of that journey.
          </p>
        </div>

        <div className="relative space-y-14">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          {about.timeline.map((item, idx) => {
            const Icon = ORIGIN_ICONS[item.iconName] ?? Rocket;
            return (
              <motion.div
                key={`${item.title}-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative flex gap-6 group"
              >
                <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm transition-colors group-hover:border-primary group-hover:bg-primary/10">
                  <Icon
                    className={`h-5 w-5 ${item.highlight ? "text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "text-primary/70"}`}
                  />
                  {item.highlight && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10" />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-medium">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 relative rounded-2xl border border-primary/10 bg-background/30 p-10 text-center backdrop-blur-md overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <p className="font-mono text-sm sm:text-base italic text-foreground/90">
            <span className="text-primary font-bold">&ldquo;</span> {about.legacyQuote}{" "}
            <span className="text-primary font-bold">&rdquo;</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
