export type Project = {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  live: string;
  github: string | null;
  image: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    title: "Coinview",
    description:
      "Real-time crypto dashboard with live price charts, market data, and a streaming activity feed.",
    longDescription:
      "Crypto dashboard built with Vue 3 and TypeScript, using the CoinGecko API to surface real-time market data, live price charts, and streaming activity updates.",
    tech: ["Vue 3", "TypeScript", "CoinGecko API"],
    live: "https://coinview-rose.vercel.app/",
    github: "https://github.com/EmmaTheVibe/coinview",
    image: "/coinview.avif",
    featured: true,
  },
  {
    title: "Weather Now",
    description:
      "Weather application with auto geolocation, city search, 7-day forecasts and hourly breakdowns.",
    longDescription:
      "Built with Next.js, uses Open-Meteo API for accurate weather forecasts and BigDataCloud for location services. Features include auto geolocation, city search with autocomplete, customizable unit preferences, 7-day forecasts, and hourly breakdowns.",
    tech: ["Next.js", "TypeScript", "Open-Meteo API"],
    live: "https://weather-now-seven-kohl.vercel.app/",
    github: "https://github.com/EmmaTheVibe/weather-now",
    image: "/weather.avif",
    featured: true,
  },
  {
    title: "Jadoo Landing Page",
    description:
      "Modern landing page for a travel agency featuring animated card stacks and carousels.",
    longDescription:
      "Demo landing page for a travel agency built with Next.js. Features cool UI components such as animated card stacks, carousels, and smooth interactions that showcase frontend engineering craft.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    live: "https://jadootravel-alpha.vercel.app/",
    github: "https://github.com/EmmaTheVibe/agency-landing-page",
    image: "/jadoo.avif",
    featured: true,
  },
  {
    title: "WAEC Attendance Tracker",
    description:
      "Nationwide digital attendance monitoring system for CBWASSCE examinations.",
    longDescription:
      "Enables nationwide digital attendance monitoring during CBWASSCE examinations, reducing attendance reconciliation time by approximately 50%. Built to handle scale across multiple examination centres simultaneously.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    live: "https://waec-attendance-checker.vercel.app/",
    github: "https://github.com/EmmaTheVibe/attendance-checker",
    image: "/waec.avif",
    featured: true,
  },
  {
    title: "Habit Tracker",
    description:
      "PWA for tracking daily habits with streak tracking, offline support, and no backend required.",
    longDescription:
      "Offline-ready habit tracking PWA built with Next.js, TypeScript, and Tailwind CSS. It supports daily habit completion, streak tracking, and local-first usage without a backend.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    live: "https://habit-tracker-hng.vercel.app/",
    github: "https://github.com/EmmaTheVibe/habit-tracker",
    image: "/habit-tracker.avif",
    featured: true,
  },
  {
    title: "IP Address Tracker",
    description:
      "IP lookup and interactive map visualization using the ipify API and Leaflet.js.",
    longDescription:
      "IP address lookup tool that combines the ipify API with Leaflet.js to show location data on an interactive map with a responsive search experience.",
    tech: ["Next.js", "Leaflet.js", "ipify API"],
    live: "https://ip-address-tracker-sigma-two.vercel.app/",
    github: "https://github.com/EmmaTheVibe/ip-address-tracker",
    image: "/ip.avif",
    featured: true,
  },
];

export const skills = [
  { name: "Next.js", icon: "⬛" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Svelte", icon: "🔥" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "Node.js", icon: "🟢" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Git", icon: "🔀" },
  { name: "Vercel", icon: "▲" },
  { name: "Firebase", icon: "🔥" },
];

export const toolbox = [
  { label: "Frontend Development", icon: "⬜" },
  { label: "Responsive Design", icon: "📱" },
  { label: "Performance Optimization", icon: "⚡" },
  { label: "Clean Code", icon: "🧹" },
  { label: "Problem Solving", icon: "🧠" },
];

export const social = {
  github: "https://github.com/EmmaTheVibe",
  linkedin: "https://www.linkedin.com/in/emmanuel-onagaumah-44a969252/",
  twitter: "https://x.com/shiemofr?s=21&t=rX9JrzoTa74OLT4KNPETFw",
  email: "emmathevibe@gmail.com",
  resume:
    "https://drive.google.com/file/d/1k3EzdPAlxMORjPNLGo_9ifq4jb5BzUfc/view?usp=sharing",
};
