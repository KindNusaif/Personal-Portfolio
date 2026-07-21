import { useState } from "react";
import contentData from "@/data/content.json";

export function AdminPortal() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState(contentData);
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setIsLoggedIn(true);
    }
  };

  const handleSave = async () => {
    setStatus({ loading: true, error: "", success: "" });
    try {
      const res = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, content }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to save");
      }
      
      setStatus({ loading: false, error: "", success: data.message });
    } catch (err: any) {
      setStatus({ loading: false, error: err.message, success: "" });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-card/40 backdrop-blur-md p-8 rounded-2xl border border-border/50 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6">Admin Login</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground font-medium rounded-lg px-4 py-2 hover:opacity-90 transition-opacity">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-5 md:p-10 pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 border-b border-border/50">
          <h1 className="text-3xl font-semibold">Content Manager</h1>
          <button
            onClick={handleSave}
            disabled={status.loading}
            className="bg-primary text-primary-foreground font-medium rounded-lg px-6 py-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status.loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {status.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">
            {status.error}
          </div>
        )}
        {status.success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg">
            {status.success}
          </div>
        )}

        <div className="grid gap-8">
          {/* About Section */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">About Section</h2>
            <div className="space-y-4">
              {content.about.paragraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    value={p}
                    onChange={(e) => {
                      const newParagraphs = [...content.about.paragraphs];
                      newParagraphs[i] = e.target.value;
                      setContent({ ...content, about: { paragraphs: newParagraphs } });
                    }}
                    className="flex-1 bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary min-h-[60px]"
                  />
                  <button 
                    onClick={() => {
                      const newParagraphs = content.about.paragraphs.filter((_, index) => index !== i);
                      setContent({ ...content, about: { paragraphs: newParagraphs } });
                    }}
                    className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={() => setContent({ ...content, about: { paragraphs: [...content.about.paragraphs, ""] } })}
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add Paragraph
              </button>
            </div>
          </section>

          {/* Projects Section */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="space-y-8">
              {content.projects.map((proj, idx) => (
                <div key={idx} className="p-4 border border-border/50 rounded-xl space-y-4 relative">
                  <button 
                    onClick={() => {
                      const newProj = content.projects.filter((_, i) => i !== idx);
                      setContent({ ...content, projects: newProj });
                    }}
                    className="absolute top-4 right-4 px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500/20"
                  >
                    Delete Project
                  </button>
                  <div>
                    <label className="block text-xs font-medium mb-1">Title</label>
                    <input
                      value={proj.title}
                      onChange={(e) => {
                        const newProj = [...content.projects];
                        newProj[idx].title = e.target.value;
                        setContent({ ...content, projects: newProj });
                      }}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea
                      value={proj.desc}
                      onChange={(e) => {
                        const newProj = [...content.projects];
                        newProj[idx].desc = e.target.value;
                        setContent({ ...content, projects: newProj });
                      }}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 min-h-[80px] focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Tech Stack (comma separated)</label>
                    <input
                      value={proj.tech.join(", ")}
                      onChange={(e) => {
                        const newProj = [...content.projects];
                        newProj[idx].tech = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                        setContent({ ...content, projects: newProj });
                      }}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                    />
                  </div>
                  
                  {/* Links */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {proj.links.map((link, linkIdx) => (
                      <div key={linkIdx} className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <label className="block text-xs font-medium mb-1">{linkIdx === 0 ? "Live Demo URL" : "GitHub URL"}</label>
                        <input
                          value={link.href}
                          onChange={(e) => {
                            const newProj = [...content.projects];
                            newProj[idx].links[linkIdx].href = e.target.value;
                            setContent({ ...content, projects: newProj });
                          }}
                          className="w-full bg-background/80 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={() => setContent({ ...content, projects: [...content.projects, { title: "New Project", desc: "", tech: [], links: [{ label: "Live Demo", href: "#", primary: true }, { label: "GitHub", href: "#", primary: false }] }] })}
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add Project
              </button>
            </div>
          </section>

          {/* Building Section */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">"Building the Future" Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Text Description</label>
                <textarea
                  value={content.building.text}
                  onChange={(e) => setContent({ ...content, building: { ...content.building, text: e.target.value } })}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 min-h-[100px] focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input
                  value={content.building.tags.join(", ")}
                  onChange={(e) => setContent({ ...content, building: { ...content.building, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) } })}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Skills (Arsenal)</h2>
            <div className="space-y-3">
              {content.skills.map((skill, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <input
                    value={skill.group}
                    placeholder="Group Name (e.g. Frontend)"
                    onChange={(e) => {
                      const newSkills = [...content.skills];
                      newSkills[idx].group = e.target.value;
                      setContent({ ...content, skills: newSkills });
                    }}
                    className="flex-1 bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={skill.level}
                    onChange={(e) => {
                      const newSkills = [...content.skills];
                      newSkills[idx].level = parseInt(e.target.value) || 0;
                      setContent({ ...content, skills: newSkills });
                    }}
                    className="w-24 bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  />
                  <button 
                    onClick={() => {
                      const newSkills = content.skills.filter((_, i) => i !== idx);
                      setContent({ ...content, skills: newSkills });
                    }}
                    className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={() => setContent({ ...content, skills: [...content.skills, { group: "New Skill", level: 5 }] })}
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition mt-2"
              >
                + Add Skill
              </button>
            </div>
          </section>

          {/* Experience Section */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Experience Timeline</h2>
            <div className="space-y-6">
              {content.experience.map((exp, idx) => (
                <div key={idx} className="p-4 border border-border/50 rounded-xl space-y-4 relative bg-background/30">
                  <button 
                    onClick={() => {
                      const newExp = content.experience.filter((_, i) => i !== idx);
                      setContent({ ...content, experience: newExp });
                    }}
                    className="absolute top-4 right-4 px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500/20"
                  >
                    Delete Entry
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Title</label>
                      <input
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...content.experience];
                          newExp[idx].title = e.target.value;
                          setContent({ ...content, experience: newExp });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Organization</label>
                      <input
                        value={exp.org}
                        onChange={(e) => {
                          const newExp = [...content.experience];
                          newExp[idx].org = e.target.value;
                          setContent({ ...content, experience: newExp });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Date</label>
                      <input
                        value={exp.date}
                        onChange={(e) => {
                          const newExp = [...content.experience];
                          newExp[idx].date = e.target.value;
                          setContent({ ...content, experience: newExp });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Icon Name</label>
                      <select
                        value={exp.iconName}
                        onChange={(e) => {
                          const newExp = [...content.experience];
                          newExp[idx].iconName = e.target.value;
                          setContent({ ...content, experience: newExp });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                      >
                        <option value="GraduationCap">GraduationCap</option>
                        <option value="Trophy">Trophy</option>
                        <option value="Sparkles">Sparkles</option>
                        <option value="Users">Users</option>
                        <option value="Heart">Heart</option>
                        <option value="Code2">Code2</option>
                        <option value="Rocket">Rocket</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea
                      value={exp.desc}
                      onChange={(e) => {
                        const newExp = [...content.experience];
                        newExp[idx].desc = e.target.value;
                        setContent({ ...content, experience: newExp });
                      }}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-sm min-h-[60px] focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setContent({ ...content, experience: [...content.experience, { title: "New Entry", org: "Org", date: "Present", iconName: "Rocket", desc: "" }] })}
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add Experience Entry
              </button>
            </div>
          </section>

          {/* Certificates Section */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Certificates & Credentials</h2>
            <div className="space-y-6">
              {(content.certificates || []).map((cert: any, idx: number) => (
                <div key={cert.id || idx} className="p-4 bg-background/40 border border-border/50 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-semibold text-primary">Certificate #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const newCerts = content.certificates.filter((_: any, i: number) => i !== idx);
                        setContent({ ...content, certificates: newCerts });
                      }}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Title</label>
                      <input
                        value={cert.title}
                        onChange={(e) => {
                          const newCerts = [...content.certificates];
                          newCerts[idx].title = e.target.value;
                          setContent({ ...content, certificates: newCerts });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Issuer / Organization</label>
                      <input
                        value={cert.issuer}
                        onChange={(e) => {
                          const newCerts = [...content.certificates];
                          newCerts[idx].issuer = e.target.value;
                          setContent({ ...content, certificates: newCerts });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Issue Date</label>
                      <input
                        value={cert.issueDate}
                        onChange={(e) => {
                          const newCerts = [...content.certificates];
                          newCerts[idx].issueDate = e.target.value;
                          setContent({ ...content, certificates: newCerts });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Expiry Date</label>
                      <input
                        value={cert.expiryDate || ""}
                        onChange={(e) => {
                          const newCerts = [...content.certificates];
                          newCerts[idx].expiryDate = e.target.value;
                          setContent({ ...content, certificates: newCerts });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Credential ID</label>
                      <input
                        value={cert.credentialId || ""}
                        onChange={(e) => {
                          const newCerts = [...content.certificates];
                          newCerts[idx].credentialId = e.target.value;
                          setContent({ ...content, certificates: newCerts });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Credential Verification URL</label>
                      <input
                        value={cert.credentialUrl || ""}
                        onChange={(e) => {
                          const newCerts = [...content.certificates];
                          newCerts[idx].credentialUrl = e.target.value;
                          setContent({ ...content, certificates: newCerts });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium mb-1">Image / Badge URL</label>
                      <input
                        value={cert.imageUrl || ""}
                        onChange={(e) => {
                          const newCerts = [...content.certificates];
                          newCerts[idx].imageUrl = e.target.value;
                          setContent({ ...content, certificates: newCerts });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium mb-1">Skills (comma separated)</label>
                      <input
                        value={cert.skills ? cert.skills.join(", ") : ""}
                        onChange={(e) => {
                          const newCerts = [...content.certificates];
                          newCerts[idx].skills = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
                          setContent({ ...content, certificates: newCerts });
                        }}
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const currentCerts = content.certificates || [];
                  setContent({
                    ...content,
                    certificates: [
                      ...currentCerts,
                      {
                        id: String(Date.now()),
                        title: "New Certificate",
                        issuer: "Issuer / Academy",
                        issueDate: "2026",
                        expiryDate: "No Expiration",
                        credentialId: "",
                        credentialUrl: "",
                        imageUrl: "",
                        skills: ["Skill 1", "Skill 2"]
                      }
                    ]
                  });
                }}
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add Certificate
              </button>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Contact Section</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={content.contact.email}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={content.contact.linkedin}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, linkedin: e.target.value } })}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={content.contact.github}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, github: e.target.value } })}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resume Path</label>
                <input
                  type="text"
                  value={content.contact.resume}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, resume: e.target.value } })}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <textarea
                  value={content.contact.subtitle}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, subtitle: e.target.value } })}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary min-h-[80px]"
                />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
