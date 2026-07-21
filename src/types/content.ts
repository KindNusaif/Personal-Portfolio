export interface ProjectLink {
  label: string;
  href: string;
  primary: boolean;
}

export interface ProjectStory {
  why: string;
  problem: string;
  solution: string;
  next: string;
}

export interface Project {
  title: string;
  type: string;
  role: string;
  status: string;
  timeline: string;
  impact: string;
  imageUrl: string;
  desc: string;
  tech: string[];
  story: ProjectStory;
  links: ProjectLink[];
}

export interface MissionLog {
  year: string;
  log: string;
}

export interface Capability {
  category: string;
  status: string;
  statusColor: string;
  desc: string;
  tech: string;
}

export interface FieldNote {
  title: string;
  read: string;
  date: string;
}

export interface IdentityProfile {
  id: string;
  name: string;
  role: string;
  location: string;
  focus: string;
  mission: string;
  level: string;
}

export interface Identity {
  headlineLine1: string;
  headlineLine2: string;
  headlineAccent: string;
  summary: string;
  profile: IdentityProfile;
}

export interface CurrentFocus {
  title: string;
  description: string;
  version: string;
  progress: number;
  updateCadence: string;
}

export interface BuilderNotes {
  quote: string;
}

export interface OriginTimelineItem {
  iconName: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

export interface About {
  timeline: OriginTimelineItem[];
  legacyQuote: string;
}

export interface Building {
  text: string;
  tags: string[];
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  resume: string;
  subtitle: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl: string;
  skills: string[];
}

export interface PortfolioContent {
  identity: Identity;
  about: About;
  projects: Project[];
  building: Building;
  currentFocus: CurrentFocus;
  builderNotes: BuilderNotes;
  capabilities: Capability[];
  missionLogs: MissionLog[];
  fieldNotes: FieldNote[];
  certificates: Certificate[];
  contact: Contact;
}

export function createEmptyProject(): Project {
  return {
    title: "New Project",
    type: "Project Type",
    role: "Your Role",
    status: "In Progress",
    timeline: "2026 - Present",
    impact: "Describe the impact",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    desc: "",
    tech: [],
    story: {
      why: "",
      problem: "",
      solution: "",
      next: "",
    },
    links: [
      { label: "Launch Project →", href: "#", primary: true },
      { label: "Source Code →", href: "#", primary: false },
    ],
  };
}

export function createEmptyCapability(): Capability {
  return {
    category: "NEW CAPABILITY",
    status: "ACTIVE",
    statusColor: "text-primary",
    desc: "",
    tech: "",
  };
}

export function createEmptyMissionLog(): MissionLog {
  return { year: "2026", log: "" };
}

export function createEmptyFieldNote(): FieldNote {
  return { title: "New field note", read: "5 min read", date: "2026" };
}

export function createEmptyCertificate(): Certificate {
  return {
    id: String(Date.now()),
    title: "New Certificate",
    issuer: "Issuer / Academy",
    issueDate: "2026",
    expiryDate: "No Expiration",
    credentialId: "",
    credentialUrl: "",
    imageUrl: "",
    skills: [],
  };
}
