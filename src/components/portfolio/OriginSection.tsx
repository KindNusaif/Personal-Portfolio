import { motion } from "framer-motion";
import { 
  MapPin, 
  BrainCircuit, 
  Code2, 
  Rocket,
  Zap,
  Target,
  TrendingUp,
  Heart
} from "lucide-react";

export function OriginSection() {
  const timelineItems = [
    {
      icon: MapPin,
      title: "Born in Puttalam.",
      desc: "Curiosity is my foundation.",
    },
    {
      icon: BrainCircuit,
      title: "Raised by curiosity.",
      desc: "Innovation is my mindset.",
    },
    {
      icon: Code2,
      title: "Chose technology over tradition.",
      desc: "Impact is my mission.",
    },
    {
      icon: Rocket,
      title: "Building products for the next generation of Sri Lanka.",
      desc: "Building technology that shapes the future.",
      highlight: true
    }
  ];

  const stats = [
    { icon: Zap, title: "FOCUS", desc: "Clarity in every step." },
    { icon: Target, title: "MISSION", desc: "Impact at scale." },
    { icon: TrendingUp, title: "GROWTH", desc: "Always evolving." },
    { icon: Heart, title: "COUNTRY", desc: "Sri Lanka First." },
  ];

  return (
    <section id="journey" className="relative mx-auto max-w-7xl px-5 py-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center relative z-10">
        
        {/* Left Column - Timeline */}
        <div>
          <div className="mb-12">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4 flex items-center gap-2">
              <span>01 / ORIGIN</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
              Who <span className="text-primary">I am.</span>
            </h2>
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              ROOTED IN <span className="text-primary">PURPOSE</span>. DRIVEN BY <span className="text-primary">IMPACT</span>.
            </p>
          </div>

          <div className="relative space-y-10">
            {/* Vertical Line */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

            {timelineItems.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative flex gap-6 group"
              >
                <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary/30 bg-background transition-colors group-hover:border-primary group-hover:bg-primary/10">
                  <item.icon className={`h-5 w-5 ${item.highlight ? 'text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'text-primary/70'}`} />
                  {item.highlight && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10" />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - System Core & Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center justify-center gap-12"
        >
          {/* Main Circle Graphic */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Outer rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-primary/30 border-t-primary animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-primary/10 border-b-primary animate-[spin_6s_linear_reverse_infinite]" />
            
            {/* Center Content */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/5 to-transparent backdrop-blur-sm" />
            <div className="text-center z-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-2">SYSTEM.CORE</p>
              <h4 className="text-6xl font-bold tracking-tighter mb-2">100%</h4>
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">PASSION</p>
              <div className="mt-4 w-12 h-px bg-primary/50 mx-auto mb-4" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">FUELED BY PURPOSE</p>
            </div>
          </div>

          {/* 4 Mini Stats */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className="text-center flex flex-col items-center"
              >
                <stat.icon className="h-6 w-6 text-primary mb-3" />
                <h5 className="font-mono text-xs uppercase tracking-widest text-foreground/90 mb-1">{stat.title}</h5>
                <p className="text-[10px] text-muted-foreground max-w-[80px] leading-tight">{stat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Legacy Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="w-full relative rounded-2xl border border-primary/20 bg-background/50 p-6 text-center backdrop-blur-md overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <p className="font-mono text-sm sm:text-base italic text-foreground/90">
              <span className="text-primary font-bold">"</span> Not just building products. Building a <span className="text-primary font-semibold not-italic">legacy</span>. <span className="text-primary font-bold">"</span>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
