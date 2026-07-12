import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, Code2, Rocket, Users, Cloud, GraduationCap, 
  Search, ChevronDown, ExternalLink, ShieldCheck 
} from "lucide-react";
import { SectionHeading } from "./sections";

// Mock data structure waiting for user's real LinkedIn data
const CATEGORIES = [
  { id: "ai", label: "Artificial Intelligence & Emerging Technologies", icon: Brain },
  { id: "software", label: "Software Engineering", icon: Code2 },
  { id: "innovation", label: "Innovation & Entrepreneurship", icon: Rocket },
  { id: "leadership", label: "Leadership & Community", icon: Users },
  { id: "cloud", label: "Cloud & Modern Technologies", icon: Cloud },
  { id: "academic", label: "Academic & Professional Development", icon: GraduationCap },
];

const JOURNEY_DATA = [
  {
    id: "1",
    categoryId: "ai",
    title: "[Needs Content] Generative AI Specialization",
    organization: "DeepLearning.AI",
    date: "Aug 2025",
    credentialId: "UC-12345678",
    credentialUrl: "#",
    skills: ["Generative AI", "Large Language Models", "Python"],
    verified: true,
  },
  {
    id: "2",
    categoryId: "software",
    title: "[Needs Content] Full Stack React Developer",
    organization: "Meta",
    date: "May 2025",
    credentialId: "META-9999",
    credentialUrl: "#",
    skills: ["React", "JavaScript", "Frontend Development"],
    verified: true,
  },
  {
    id: "3",
    categoryId: "innovation",
    title: "[Needs Content] National Hackathon Winner",
    organization: "Tech Innovators Sri Lanka",
    date: "Dec 2024",
    credentialId: "",
    credentialUrl: "#",
    skills: ["Problem Solving", "Innovation", "Product Design"],
    verified: false,
  }
];

export function LearningJourney() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(CATEGORIES.map(c => c.id));

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const filteredData = JOURNEY_DATA.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter ? item.categoryId === activeFilter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="learning-journey" className="mx-auto max-w-6xl px-5 py-28 relative">
      <SectionHeading
        eyebrow="05 / LEARNING JOURNEY"
        title="Continuous Learning Never Stops."
      />
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 max-w-2xl text-muted-foreground leading-relaxed"
      >
        Every certificate represents curiosity, discipline, and a commitment to continuous improvement. I believe the best developers never stop learning.
      </motion.p>

      {/* Animated Statistics */}
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Certifications", value: "25+" },
          { label: "Workshops", value: "15+" },
          { label: "Hackathons", value: "8+" },
          { label: "Leadership Programs", value: "5+" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center backdrop-blur-md"
          >
            <div className="font-display text-3xl font-semibold text-foreground">{stat.value}</div>
            <div className="mt-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="mt-16 sticky top-20 z-40 mb-12 rounded-2xl border border-white/10 bg-background/80 p-4 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search skills, titles, or orgs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50 focus:bg-white/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter(null)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${!activeFilter ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${activeFilter === cat.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`}
              >
                {cat.label.split(" &")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Categories */}
      <div className="space-y-12">
        {CATEGORIES.filter(cat => activeFilter ? activeFilter === cat.id : true).map((category, catIndex) => {
          const catItems = filteredData.filter(d => d.categoryId === category.id);
          if (catItems.length === 0 && searchQuery) return null; // Hide empty categories when searching
          
          const isExpanded = expandedCategories.includes(category.id);
          const Icon = category.icon;

          return (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
            >
              {/* Category Header */}
              <button 
                onClick={() => toggleCategory(category.id)}
                className="flex w-full items-center justify-between p-6 md:p-8 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">{category.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{catItems.length} {catItems.length === 1 ? 'Achievement' : 'Achievements'}</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
              </button>

              {/* Category Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/5 overflow-hidden"
                  >
                    <div className="p-6 md:p-8 space-y-6">
                      {catItems.length > 0 ? catItems.map((item, i) => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="group relative flex flex-col md:flex-row gap-6 rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:border-primary/20 hover:bg-white/[0.05] transition-all duration-300"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {item.verified && (
                                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                                  <ShieldCheck className="h-3 w-3" /> Verified
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">{item.date}</span>
                            </div>
                            <h4 className="text-lg font-semibold text-foreground/90 group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{item.organization}</p>
                            
                            {item.credentialId && (
                              <p className="text-xs font-mono text-muted-foreground/60 mt-3">ID: {item.credentialId}</p>
                            )}
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.skills.map(skill => (
                                <span key={skill} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="md:self-center">
                            <a 
                              href={item.credentialUrl}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground"
                            >
                              View Credential <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </motion.div>
                      )) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No items match your search criteria.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
