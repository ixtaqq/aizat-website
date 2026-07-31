export type AppId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "contact"
  | "resume"
  | "chat"
  | "terminal"
  | "trash"
  | "tips";

export type AppMeta = {
  id: AppId;
  title: string;
  icon: string;
  color: string;
  /** true = dark (ink) titlebar text on a light background, false = white text */
  dark: boolean;
  w: number;
  h: number;
};

export type Rect = { x: number; y: number; w: number; h: number };

export type WinState = {
  min: boolean;
  max: boolean;
  rect: Rect;
  prevRect: Rect | null;
  zIndex: number;
  bye: boolean;
  pop: number;
};

export type Theme = "day" | "night";

export const DOCK_ORDER: AppId[] = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
  "resume",
  "chat",
  "terminal",
  "trash",
];

export const ALL_APP_IDS: AppId[] = [...DOCK_ORDER, "tips"];

export const APPS: Record<AppId, AppMeta> = {
  about: { id: "about", title: "README.txt", icon: "📄", color: "#ffd400", dark: true, w: 640, h: 580 },
  experience: { id: "experience", title: "CHANGELOG.md", icon: "💼", color: "#2456ff", dark: false, w: 580, h: 560 },
  projects: { id: "projects", title: "projects/", icon: "📁", color: "#ff4b2e", dark: false, w: 720, h: 600 },
  skills: { id: "skills", title: "skills.cfg", icon: "🎛️", color: "#00b159", dark: false, w: 540, h: 580 },
  education: { id: "education", title: "education.log", icon: "🎓", color: "#a78bfa", dark: false, w: 560, h: 520 },
  contact: { id: "contact", title: "contact.vcf", icon: "✉️", color: "#ff8a00", dark: true, w: 480, h: 580 },
  resume: { id: "resume", title: "resume.pdf", icon: "📎", color: "#e8e8e2", dark: true, w: 560, h: 640 },
  chat: { id: "chat", title: "assistant.ai", icon: "🤖", color: "#12b3c7", dark: false, w: 420, h: 560 },
  terminal: { id: "terminal", title: "terminal", icon: "💻", color: "#141414", dark: false, w: 600, h: 440 },
  trash: { id: "trash", title: "Trash", icon: "🗑️", color: "#cfd4d6", dark: true, w: 440, h: 430 },
  tips: { id: "tips", title: "Tips & shortcuts", icon: "💡", color: "#ffe27a", dark: true, w: 480, h: 500 },
};
