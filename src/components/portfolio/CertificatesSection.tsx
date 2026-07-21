import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  ExternalLink, 
  Search, 
  Calendar, 
  Building2, 
  X, 
  Maximize2,
  ShieldCheck
} from "lucide-react";
import { SectionHeading } from "./sections";
import contentData from "@/data/index";
import type { Certificate } from "@/types/content";

export type CertificateItem = Certificate;

export function CertificatesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const certificates: CertificateItem[] = contentData.certificates;

  const filteredCerts = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <section id="certificates" className="mx-auto max-w-6xl px-5 py-28 relative">
      <SectionHeading
        eyebrow="05 / Certifications & Achievements"
        title="Verified Credentials & Standards."
        subtitle="Validated knowledge across software engineering, cloud architectures, and emerging technologies."
      />

      {/* Search and Filters Bar */}
      <div className="mt-12 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search certificates by title, issuer, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary/50 focus:bg-white/10 focus:ring-2 focus:ring-primary/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Award className="h-4 w-4 text-primary" />
          <span>Showing {filteredCerts.length} verified credential{filteredCerts.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Grid of Certificate Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {filteredCerts.map((cert, index) => (
          <motion.div
            key={cert.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Ambient Lighting / Glow */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />

            <div>
              {/* Header: Badge / Image Preview & Action Buttons */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1">
                  {cert.imageUrl ? (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Award className="h-7 w-7" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {cert.imageUrl && (
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/20 hover:text-primary"
                      title="Preview Certificate"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-mono font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Verify <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Verified Pill */}
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-3 w-3" /> Verified Certificate
                </span>
              </div>

              {/* Title & Issuer */}
              <h3 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                  <Building2 className="h-3.5 w-3.5 text-primary" /> {cert.issuer}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar className="h-3.5 w-3.5 text-accent" /> {cert.issueDate}
                  {cert.expiryDate && ` · Exp: ${cert.expiryDate}`}
                </span>
              </div>

              {cert.credentialId && (
                <p className="mt-2 font-mono text-[11px] text-muted-foreground/70">
                  Credential ID: <span className="text-foreground/90">{cert.credentialId}</span>
                </p>
              )}
            </div>

            {/* Tags / Skills Covered */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCerts.length === 0 && (
        <div className="mt-12 rounded-3xl border border-white/10 bg-card/20 p-12 text-center backdrop-blur-md">
          <Award className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-lg font-semibold">No certificates match your query</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try searching with another keyword or skill name.</p>
        </div>
      )}

      {/* Lightbox / Modal Certificate Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-3xl border border-white/10 bg-card p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedCert.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCert.issuer} · Issued {selectedCert.issueDate}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {selectedCert.imageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-black/40">
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    className="w-full max-h-[60vh] object-contain"
                  />
                </div>
              ) : (
                <div className="p-12 text-center text-muted-foreground">
                  No preview image available for this certificate.
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-mono">
                      {s}
                    </span>
                  ))}
                </div>
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-mono font-semibold text-primary-foreground hover:brightness-110 transition"
                  >
                    View Official Credential <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
