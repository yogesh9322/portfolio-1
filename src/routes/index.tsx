import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  ArrowUpRight,
  Code2,
  Database,
  Cpu,
  Wrench,
  Briefcase,
  Send,
  Sun,
  Moon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yogesh Pawar — Computer Engineering Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Yogesh Pawar — Computer Engineering student building full-stack apps, ML projects and elegant software.",
      },
      { property: "og:title", content: "Yogesh Pawar — Computer Engineering Portfolio" },
      {
        property: "og:description",
        content:
          "Portfolio of Yogesh Pawar — Computer Engineering student building full-stack apps, ML projects and elegant software.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  {
    icon: Code2,
    title: "Languages",
    items: ["Python", "JavaScript / TypeScript", "C++", "Java", "SQL"],
  },
  {
    icon: Cpu,
    title: "Frameworks",
    items: ["React", "Node.js", "Express", "Next.js", "TensorFlow"],
  },
  {
    icon: Database,
    title: "Databases & Cloud",
    items: ["PostgreSQL", "MongoDB", "Firebase", "AWS", "Docker"],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: ["Git & GitHub", "VS Code", "Postman", "Figma", "Linux"],
  },
];

const PROJECTS = [
  {
    title: "Smart Attendance System",
    description:
      "Face-recognition based attendance platform using OpenCV and Flask, with a React dashboard for teachers and CSV exports.",
    tags: ["Python", "OpenCV", "Flask", "React"],
    link: "#",
  },
  {
    title: "DevConnect — Developer Social App",
    description:
      "Full-stack MERN application where developers share snippets, follow peers and showcase projects with real-time notifications.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    link: "#",
  },
  {
    title: "AI Resume Analyzer",
    description:
      "NLP tool that scores resumes against job descriptions using TF-IDF and transformer embeddings, deployed on Streamlit.",
    tags: ["Python", "NLP", "Streamlit"],
    link: "#",
  },
  {
    title: "Campus Marketplace",
    description:
      "A buy-sell platform for college students with authentication, chat and image uploads, built on Next.js and Supabase.",
    tags: ["Next.js", "Supabase", "TypeScript"],
    link: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    company: "Infosys Springboard",
    period: "May 2025 — Jul 2025",
    points: [
      "Built internal REST APIs in Node.js consumed by 4 frontend teams.",
      "Improved query performance by 35% by introducing indexed PostgreSQL views.",
      "Wrote unit tests with Jest reaching 80% coverage on new modules.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "TechnoHacks Solutions",
    period: "Dec 2024 — Feb 2025",
    points: [
      "Developed responsive landing pages in React + Tailwind for 3 client projects.",
      "Integrated Razorpay payments and email automation via Nodemailer.",
      "Collaborated using Git, Jira and weekly agile standups.",
    ],
  },
];

const EDUCATION = [
  {
    school: "Savitribai Phule Pune University",
    degree: "B.E. in Computer Engineering",
    period: "2022 — 2026",
    detail: "CGPA: 8.7 / 10 · Coursework in DSA, OS, DBMS, ML, Computer Networks.",
  },
  {
    school: "Vidya Niketan Jr. College",
    degree: "Higher Secondary (PCM + CS)",
    period: "2020 — 2022",
    detail: "Percentage: 89% · State board with Computer Science elective.",
  },
];

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-display text-lg font-semibold">
          YP<span className="text-gradient">.</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
        >
          Let's talk
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-glow">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1.4fr_1fr] md:py-32">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Open to internships & grad roles
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl">
            Yogesh Pawar
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground sm:text-xl">
            Computer Engineering student crafting{" "}
            <span className="text-foreground">full-stack apps</span>,{" "}
            <span className="text-foreground">ML experiments</span> and tools that feel fast and
            thoughtful.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              View my work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-muted-foreground">
            <a href="https://github.com" aria-label="GitHub" className="transition-colors hover:text-foreground">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:yogesh@example.com" aria-label="Email" className="transition-colors hover:text-foreground">
              <Mail className="h-5 w-5" />
            </a>
            <span className="ml-2 inline-flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4" /> Pune, India
            </span>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
          <div className="relative rounded-3xl border border-border bg-card/80 p-6 shadow-card">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/70" />
              <span className="h-3 w-3 rounded-full bg-chart-4/70" />
              <span className="h-3 w-3 rounded-full bg-primary/70" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">~/yogesh</span>
            </div>
            <pre className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
{`> whoami
yogesh.pawar

> focus
- backend systems
- applied ml
- clean ui

> currently
building DevConnect &
learning system design`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">{eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="A bit about me">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            I'm a final-year Computer Engineering student who enjoys turning rough ideas into
            polished, working software. My favourite part of the stack is wherever the hardest
            problem lives that day — be it shaping a clean database schema, fine-tuning a model, or
            sweating the pixels on a landing page.
          </p>
          <p>
            Outside coursework I contribute to open source, write small Python utilities, and
            sketch out side projects with friends. I care about readable code, fast feedback loops
            and shipping things that respect the user's time.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { k: "8.7", v: "CGPA" },
            { k: "12+", v: "Projects" },
            { k: "2", v: "Internships" },
            { k: "5★", v: "HackerRank" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <div className="font-display text-3xl font-semibold text-gradient">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="02 — Skills" title="Tools I reach for">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s) => (
          <div
            key={s.title}
            className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/50"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {s.items.map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary/70" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="03 — Projects" title="Things I've built">
      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href={p.link}
            className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/50"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="04 — Experience" title="Internships">
      <div className="space-y-5">
        {EXPERIENCE.map((e) => (
          <div
            key={e.company}
            className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Briefcase className="h-4 w-4" />
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">{e.role}</h3>
                <p className="text-muted-foreground">{e.company}</p>
              </div>
              <span className="shrink-0 rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
                {e.period}
              </span>
            </div>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {e.points.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="05 — Education" title="Academic path">
      <div className="space-y-5">
        {EDUCATION.map((e) => (
          <div
            key={e.school}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:flex sm:items-center sm:justify-between md:p-8"
          >
            <div className="min-w-0">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <GraduationCap className="h-4 w-4" />
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">{e.school}</h3>
              <p className="text-muted-foreground">{e.degree}</p>
              <p className="mt-2 text-sm text-muted-foreground">{e.detail}</p>
            </div>
            <span className="shrink-0 rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
              {e.period}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="06 — Contact" title="Let's build something">
      <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-card md:grid-cols-[1.2fr_1fr] md:p-12">
        <div>
          <p className="text-lg text-muted-foreground">
            I'm currently looking for software engineering internships and full-time grad roles
            starting 2026. The fastest way to reach me is email — I usually reply within a day.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <a
              href="mailto:yogesh.pawar@example.com"
              className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" /> yogesh.pawar@example.com
            </a>
            <a
              href="https://github.com"
              className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4 text-primary" /> github.com/yogeshpawar
            </a>
            <a
              href="https://linkedin.com"
              className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4 text-primary" /> linkedin.com/in/yogeshpawar
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent(`Hello from ${data.get("name") || "your site"}`);
            const body = encodeURIComponent(String(data.get("message") || ""));
            window.location.href = `mailto:yogesh.pawar@example.com?subject=${subject}&body=${body}`;
          }}
          className="space-y-3"
        >
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="What are you working on?"
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            Send message <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Yogesh Pawar. Built with care.</p>
        <p className="font-mono text-xs">Designed & coded in Pune, India.</p>
      </div>
    </footer>
  );
}
