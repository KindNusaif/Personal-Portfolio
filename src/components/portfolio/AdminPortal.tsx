import { useState } from "react";
import contentData from "@/data/index";
import type { PortfolioContent, Project, ProjectLink } from "@/types/content";
import {
  createEmptyCapability,
  createEmptyCertificate,
  createEmptyFieldNote,
  createEmptyMissionLog,
  createEmptyProject,
} from "@/types/content";

type SaveStatus = { loading: boolean; error: string; success: string };

const inputClass =
  "w-full bg-background/50 border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary";
const textareaClass = `${inputClass} min-h-[80px]`;
const labelClass = "block text-xs font-medium mb-1";

function updateProjectAt(
  projects: Project[],
  index: number,
  updater: (project: Project) => Project
): Project[] {
  return projects.map((project, i) => (i === index ? updater(project) : project));
}

export function AdminPortal() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState<PortfolioContent>(contentData);
  const [status, setStatus] = useState<SaveStatus>({ loading: false, error: "", success: "" });

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
      const data: { error?: string; message?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save");
      }

      setStatus({ loading: false, error: "", success: data.message ?? "Saved" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save";
      setStatus({ loading: false, error: message, success: "" });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-5">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-card/40 backdrop-blur-md p-8 rounded-2xl border border-border/50 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-6">Admin Login</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-medium rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
            >
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
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">{status.error}</div>
        )}
        {status.success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg">{status.success}</div>
        )}

        <div className="grid gap-8">
          {/* Identity */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Identity</h2>
            <div className="space-y-4">
              {(["headlineLine1", "headlineLine2", "headlineAccent"] as const).map((key) => (
                <div key={key}>
                  <label className={labelClass}>{key}</label>
                  <input
                    value={content.identity[key]}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        identity: { ...content.identity, [key]: e.target.value },
                      })
                    }
                    className={inputClass}
                  />
                </div>
              ))}
              <div>
                <label className={labelClass}>Summary</label>
                <textarea
                  value={content.identity.summary}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      identity: { ...content.identity, summary: e.target.value },
                    })
                  }
                  className={textareaClass}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
                {(Object.keys(content.identity.profile) as Array<keyof typeof content.identity.profile>).map((key) => (
                  <div key={key}>
                    <label className={labelClass}>{key}</label>
                    <input
                      value={content.identity.profile[key]}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          identity: {
                            ...content.identity,
                            profile: { ...content.identity.profile, [key]: e.target.value },
                          },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Origin */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Origin Timeline</h2>
            <div className="space-y-4 mb-4">
              <label className={labelClass}>Legacy quote</label>
              <textarea
                value={content.about.legacyQuote}
                onChange={(e) =>
                  setContent({ ...content, about: { ...content.about, legacyQuote: e.target.value } })
                }
                className={textareaClass}
              />
            </div>
            <div className="space-y-6">
              {content.about.timeline.map((item, idx) => (
                <div key={idx} className="p-4 border border-border/50 rounded-xl space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const timeline = content.about.timeline.filter((_, i) => i !== idx);
                      setContent({ ...content, about: { ...content.about, timeline } });
                    }}
                    className="absolute top-4 right-4 px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                  <input
                    value={item.iconName}
                    placeholder="Icon name (MapPin, Rocket, …)"
                    onChange={(e) => {
                      const timeline = [...content.about.timeline];
                      timeline[idx] = { ...timeline[idx], iconName: e.target.value };
                      setContent({ ...content, about: { ...content.about, timeline } });
                    }}
                    className={inputClass}
                  />
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const timeline = [...content.about.timeline];
                      timeline[idx] = { ...timeline[idx], title: e.target.value };
                      setContent({ ...content, about: { ...content.about, timeline } });
                    }}
                    className={inputClass}
                  />
                  <textarea
                    value={item.desc}
                    onChange={(e) => {
                      const timeline = [...content.about.timeline];
                      timeline[idx] = { ...timeline[idx], desc: e.target.value };
                      setContent({ ...content, about: { ...content.about, timeline } });
                    }}
                    className={textareaClass}
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(item.highlight)}
                      onChange={(e) => {
                        const timeline = [...content.about.timeline];
                        timeline[idx] = { ...timeline[idx], highlight: e.target.checked };
                        setContent({ ...content, about: { ...content.about, timeline } });
                      }}
                    />
                    Highlight
                  </label>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setContent({
                    ...content,
                    about: {
                      ...content.about,
                      timeline: [
                        ...content.about.timeline,
                        { iconName: "Rocket", title: "New milestone", desc: "" },
                      ],
                    },
                  })
                }
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add timeline item
              </button>
            </div>
          </section>

          {/* Projects */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
            <div className="space-y-8">
              {content.projects.map((proj, idx) => (
                <div key={idx} className="p-4 border border-border/50 rounded-xl space-y-4 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const projects = content.projects.filter((_, i) => i !== idx);
                      setContent({ ...content, projects });
                    }}
                    className="absolute top-4 right-4 px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500/20"
                  >
                    Delete Project
                  </button>
                  {(
                    [
                      "title",
                      "type",
                      "role",
                      "status",
                      "timeline",
                      "impact",
                      "imageUrl",
                    ] as const
                  ).map((field) => (
                    <div key={field}>
                      <label className={labelClass}>{field}</label>
                      <input
                        value={proj[field]}
                        onChange={(e) => {
                          const projects = updateProjectAt(content.projects, idx, (p) => ({
                            ...p,
                            [field]: e.target.value,
                          }));
                          setContent({ ...content, projects });
                        }}
                        className={inputClass}
                      />
                    </div>
                  ))}
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      value={proj.desc}
                      onChange={(e) => {
                        const projects = updateProjectAt(content.projects, idx, (p) => ({
                          ...p,
                          desc: e.target.value,
                        }));
                        setContent({ ...content, projects });
                      }}
                      className={textareaClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Tech stack (comma separated)</label>
                    <input
                      value={proj.tech.join(", ")}
                      onChange={(e) => {
                        const tech = e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean);
                        const projects = updateProjectAt(content.projects, idx, (p) => ({ ...p, tech }));
                        setContent({ ...content, projects });
                      }}
                      className={inputClass}
                    />
                  </div>
                  {(["why", "problem", "solution", "next"] as const).map((storyKey) => (
                    <div key={storyKey}>
                      <label className={labelClass}>Story / {storyKey}</label>
                      <textarea
                        value={proj.story[storyKey]}
                        onChange={(e) => {
                          const projects = updateProjectAt(content.projects, idx, (p) => ({
                            ...p,
                            story: { ...p.story, [storyKey]: e.target.value },
                          }));
                          setContent({ ...content, projects });
                        }}
                        className={textareaClass}
                      />
                    </div>
                  ))}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Links</h3>
                    {proj.links.map((link, linkIdx) => (
                      <div key={linkIdx} className="grid sm:grid-cols-3 gap-2 bg-white/5 p-3 rounded-lg border border-white/10">
                        <input
                          value={link.label}
                          placeholder="Label"
                          onChange={(e) => {
                            const projects = updateProjectAt(content.projects, idx, (p) => {
                              const links = p.links.map((l, i) =>
                                i === linkIdx ? { ...l, label: e.target.value } : l
                              );
                              return { ...p, links };
                            });
                            setContent({ ...content, projects });
                          }}
                          className={inputClass}
                        />
                        <input
                          value={link.href}
                          placeholder="URL"
                          onChange={(e) => {
                            const projects = updateProjectAt(content.projects, idx, (p) => {
                              const links = p.links.map((l, i) =>
                                i === linkIdx ? { ...l, href: e.target.value } : l
                              );
                              return { ...p, links };
                            });
                            setContent({ ...content, projects });
                          }}
                          className={inputClass}
                        />
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={link.primary}
                            onChange={(e) => {
                              const projects = updateProjectAt(content.projects, idx, (p) => {
                                const links = p.links.map((l, i) =>
                                  i === linkIdx ? { ...l, primary: e.target.checked } : l
                                );
                                return { ...p, links };
                              });
                              setContent({ ...content, projects });
                            }}
                          />
                          Primary
                        </label>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newLink: ProjectLink = { label: "Link", href: "#", primary: false };
                        const projects = updateProjectAt(content.projects, idx, (p) => ({
                          ...p,
                          links: [...p.links, newLink],
                        }));
                        setContent({ ...content, projects });
                      }}
                      className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg"
                    >
                      + Add link
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setContent({ ...content, projects: [...content.projects, createEmptyProject()] })
                }
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add Project
              </button>
            </div>
          </section>

          {/* Current focus */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Current Focus</h2>
            <div className="space-y-4">
              {(["title", "description", "version", "status"] as const).map((key) => (
                <div key={key}>
                  <label className={labelClass}>{key}</label>
                  {key === "description" ? (
                    <textarea
                      value={content.currentFocus.description}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          currentFocus: { ...content.currentFocus, description: e.target.value },
                        })
                      }
                      className={textareaClass}
                    />
                  ) : (
                    <input
                      value={content.currentFocus[key]}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          currentFocus: { ...content.currentFocus, [key]: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Building the future */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Building the Future</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Text</label>
                <textarea
                  value={content.building.text}
                  onChange={(e) =>
                    setContent({ ...content, building: { ...content.building, text: e.target.value } })
                  }
                  className={`${textareaClass} min-h-[100px]`}
                />
              </div>
              <div>
                <label className={labelClass}>Tags (comma separated)</label>
                <input
                  value={content.building.tags.join(", ")}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      building: {
                        ...content.building,
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Builder notes */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Builder Notes</h2>
            <textarea
              value={content.builderNotes.quote}
              onChange={(e) =>
                setContent({ ...content, builderNotes: { quote: e.target.value } })
              }
              className={textareaClass}
            />
          </section>

          {/* Capability matrix */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Capability Matrix</h2>
            <div className="space-y-6">
              {content.capabilities.map((cap, idx) => (
                <div key={idx} className="p-4 border border-border/50 rounded-xl space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const capabilities = content.capabilities.filter((_, i) => i !== idx);
                      setContent({ ...content, capabilities });
                    }}
                    className="absolute top-4 right-4 px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded"
                  >
                    Delete
                  </button>
                  <input
                    value={cap.category}
                    onChange={(e) => {
                      const capabilities = [...content.capabilities];
                      capabilities[idx] = { ...capabilities[idx], category: e.target.value };
                      setContent({ ...content, capabilities });
                    }}
                    className={inputClass}
                    placeholder="Category"
                  />
                  <input
                    value={cap.status}
                    onChange={(e) => {
                      const capabilities = [...content.capabilities];
                      capabilities[idx] = { ...capabilities[idx], status: e.target.value };
                      setContent({ ...content, capabilities });
                    }}
                    className={inputClass}
                    placeholder="Status"
                  />
                  <select
                    value={cap.statusColor}
                    onChange={(e) => {
                      const capabilities = [...content.capabilities];
                      capabilities[idx] = {
                        ...capabilities[idx],
                        statusColor: e.target.value,
                      };
                      setContent({ ...content, capabilities });
                    }}
                    className={inputClass}
                  >
                    <option value="text-primary">Primary accent</option>
                    <option value="text-accent">Accent</option>
                  </select>
                  <textarea
                    value={cap.desc}
                    onChange={(e) => {
                      const capabilities = [...content.capabilities];
                      capabilities[idx] = { ...capabilities[idx], desc: e.target.value };
                      setContent({ ...content, capabilities });
                    }}
                    className={textareaClass}
                  />
                  <input
                    value={cap.tech}
                    onChange={(e) => {
                      const capabilities = [...content.capabilities];
                      capabilities[idx] = { ...capabilities[idx], tech: e.target.value };
                      setContent({ ...content, capabilities });
                    }}
                    className={inputClass}
                    placeholder="Tech line"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setContent({
                    ...content,
                    capabilities: [...content.capabilities, createEmptyCapability()],
                  })
                }
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add capability
              </button>
            </div>
          </section>

          {/* Mission logs */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Mission Logs</h2>
            <div className="space-y-4">
              {content.missionLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <input
                    value={log.year}
                    onChange={(e) => {
                      const missionLogs = [...content.missionLogs];
                      missionLogs[idx] = { ...missionLogs[idx], year: e.target.value };
                      setContent({ ...content, missionLogs });
                    }}
                    className="w-28 bg-background/50 border border-border rounded-lg px-3 py-2"
                  />
                  <textarea
                    value={log.log}
                    onChange={(e) => {
                      const missionLogs = [...content.missionLogs];
                      missionLogs[idx] = { ...missionLogs[idx], log: e.target.value };
                      setContent({ ...content, missionLogs });
                    }}
                    className={`${textareaClass} flex-1 min-h-[60px]`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const missionLogs = content.missionLogs.filter((_, i) => i !== idx);
                      setContent({ ...content, missionLogs });
                    }}
                    className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setContent({
                    ...content,
                    missionLogs: [...content.missionLogs, createEmptyMissionLog()],
                  })
                }
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add log entry
              </button>
            </div>
          </section>

          {/* Field notes */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Field Notes</h2>
            <div className="space-y-4">
              {content.fieldNotes.map((note, idx) => (
                <div key={idx} className="grid sm:grid-cols-3 gap-2 items-start">
                  <input
                    value={note.title}
                    onChange={(e) => {
                      const fieldNotes = [...content.fieldNotes];
                      fieldNotes[idx] = { ...fieldNotes[idx], title: e.target.value };
                      setContent({ ...content, fieldNotes });
                    }}
                    className={inputClass}
                    placeholder="Title"
                  />
                  <input
                    value={note.date}
                    onChange={(e) => {
                      const fieldNotes = [...content.fieldNotes];
                      fieldNotes[idx] = { ...fieldNotes[idx], date: e.target.value };
                      setContent({ ...content, fieldNotes });
                    }}
                    className={inputClass}
                    placeholder="Date"
                  />
                  <input
                    value={note.read}
                    onChange={(e) => {
                      const fieldNotes = [...content.fieldNotes];
                      fieldNotes[idx] = { ...fieldNotes[idx], read: e.target.value };
                      setContent({ ...content, fieldNotes });
                    }}
                    className={inputClass}
                    placeholder="Read time"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const fieldNotes = content.fieldNotes.filter((_, i) => i !== idx);
                      setContent({ ...content, fieldNotes });
                    }}
                    className="sm:col-span-3 text-xs text-red-400 text-left"
                  >
                    Remove note
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setContent({
                    ...content,
                    fieldNotes: [...content.fieldNotes, createEmptyFieldNote()],
                  })
                }
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add field note
              </button>
            </div>
          </section>

          {/* Certificates */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Certificates</h2>
            <div className="space-y-6">
              {content.certificates.map((cert, idx) => (
                <div key={cert.id} className="p-4 bg-background/40 border border-border/50 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-semibold text-primary">Certificate #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const certificates = content.certificates.filter((_, i) => i !== idx);
                        setContent({ ...content, certificates });
                      }}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(
                      [
                        "title",
                        "issuer",
                        "issueDate",
                        "expiryDate",
                        "credentialId",
                        "credentialUrl",
                        "imageUrl",
                      ] as const
                    ).map((field) => (
                      <div key={field} className={field === "imageUrl" ? "sm:col-span-2" : undefined}>
                        <label className={labelClass}>{field}</label>
                        <input
                          value={cert[field]}
                          onChange={(e) => {
                            const certificates = [...content.certificates];
                            certificates[idx] = { ...certificates[idx], [field]: e.target.value };
                            setContent({ ...content, certificates });
                          }}
                          className={inputClass}
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Skills (comma separated)</label>
                      <input
                        value={cert.skills.join(", ")}
                        onChange={(e) => {
                          const certificates = [...content.certificates];
                          certificates[idx] = {
                            ...certificates[idx],
                            skills: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          };
                          setContent({ ...content, certificates });
                        }}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setContent({
                    ...content,
                    certificates: [...content.certificates, createEmptyCertificate()],
                  })
                }
                className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
              >
                + Add Certificate
              </button>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {(["email", "linkedin", "github", "resume"] as const).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1">{key}</label>
                  <input
                    value={content.contact[key]}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, [key]: e.target.value },
                      })
                    }
                    className={inputClass}
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <textarea
                  value={content.contact.subtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, subtitle: e.target.value },
                    })
                  }
                  className={`${inputClass} min-h-[80px]`}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
