import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
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
  Search,
  BookOpen,
  Award,
  ExternalLink,
  CheckCircle2,
  Menu,
  X,
  FileText,
  Copy,
  Check,
  GraduationCap,
  Sparkles,
  Phone,
  Instagram,
  ArrowUp,
} from "lucide-react";
import yogeshPhoto from "@/assets/yogesh.jpg";
import { ChatWidget } from "@/components/ChatWidget";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yogesh Pawar — Java Spring Boot Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Yogesh Pawar — IT Engineering student building distributed Spring Boot microservices, full-stack platforms, and ML projects.",
      },
      { property: "og:title", content: "Yogesh Pawar — Java Spring Boot Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Yogesh Pawar — IT Engineering student building distributed Spring Boot microservices, full-stack platforms, and ML projects.",
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
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  {
    icon: Code2,
    title: "Languages",
    items: [
      { name: "Java", level: "Core", tooltip: "Used for Spring Boot microservices and data structures" },
      { name: "Python", level: "Core", tooltip: "Used for OpenCV face-recognition and TF-IDF NLP model" },
      { name: "JavaScript / TypeScript", level: "Core", tooltip: "Used for React interface, Next.js, and Node.js REST API backend" },
      { name: "SQL", level: "Core", tooltip: "Used for PostgreSQL schema design and indexing optimization" },
      { name: "C++", level: "Familiar", tooltip: "Used for competitive programming and core DSA" },
    ],
  },
  {
    icon: Cpu,
    title: "Frameworks",
    items: [
      { name: "Spring Boot", level: "Core", tooltip: "Used for microservices, JWT security, and RabbitMQ backend" },
      { name: "React", level: "Core", tooltip: "Used for DevConnect, Smart Attendance dashboard, and this portfolio" },
      { name: "Next.js", level: "Familiar", tooltip: "Used for Campus Marketplace e-commerce front-end" },
      { name: "Node.js & Express", level: "Core", tooltip: "Used for REST APIs and real-time Socket.io integrations" },
      { name: "TensorFlow", level: "Familiar", tooltip: "Used for neural network models and machine learning pipelines" },
    ],
  },
  {
    icon: Database,
    title: "Databases & Cloud",
    items: [
      { name: "PostgreSQL", level: "Core", tooltip: "Optimized indexed views and query efficiency by 35%" },
      { name: "MongoDB", level: "Core", tooltip: "Stored user profiles, posts, and real-time messages in DevConnect" },
      { name: "Docker", level: "Core", tooltip: "Containerized Java Spring Boot microservices for deployment pipelines" },
      { name: "Kubernetes", level: "Familiar", tooltip: "Configured local clusters for service orchestration and scaling" },
      { name: "Supabase / Firebase", level: "Familiar", tooltip: "Used for real-time authentication and database backends" },
    ],
  },
  {
    icon: Wrench,
    title: "DevOps & Tools",
    items: [
      { name: "Git & GitHub", level: "Core", tooltip: "Used for version control, branch management, and CI/CD actions" },
      { name: "Linux & Shell", level: "Core", tooltip: "Proficient in bash scripting, service configuration, and server setups" },
      { name: "Postman", level: "Core", tooltip: "Used for API contract testing and endpoints documentation" },
      { name: "AWS", level: "Familiar", tooltip: "Managed EC2 compute, S3 assets, and RDS databases" },
      { name: "Figma", level: "Familiar", tooltip: "Created prototypes and visual wireframes for UI layouts" },
    ],
  },
];

const PROJECTS = [
  {
    title: "Distributed E-Commerce Microservices",
    description: "Cloud-native backend using Spring Boot, Spring Cloud, Docker, and PostgreSQL, implementing Eureka discovery and JWT security.",
    longDescription: "A fully containerized e-commerce backend built with Java and Spring Boot. It uses a microservices architecture to segregate ordering, inventory, billing, and notifications. Services register with Eureka discovery and communicate asynchronously via RabbitMQ to ensure high availability and resistance to network partitions. Endpoints are secured via a unified Spring Cloud API Gateway handling JWT validation.",
    category: "Java / Spring Boot",
    tags: ["Java", "Spring Boot", "Spring Cloud", "Docker", "RabbitMQ", "PostgreSQL"],
    features: [
      "Eureka Discovery Server for microservice registration",
      "API Gateway handling routing and JWT-based authentication",
      "Resilience4j implementation for circuit breaking and rate limiting",
      "RabbitMQ messaging for decoupling order creation and notification delivery",
      "Containerized orchestration with Docker Compose files"
    ],
    github: "https://github.com/yogeshpawar/ecommerce-microservices",
    link: "https://github.com/yogeshpawar/ecommerce-microservices"
  },
  {
    title: "Smart Attendance System",
    description: "Face-recognition based attendance platform using OpenCV and Flask, with a React dashboard for teachers and CSV exports.",
    longDescription: "A touchless student attendance system built to automate registration processes in classrooms. It leverages Python and OpenCV to detect and recognize faces from a live camera feed. Recognized students are marked present in a MongoDB database in real-time, and teachers can manage rolls, view charts, and export attendance spreadsheets through a secure React client dashboard.",
    category: "Machine Learning / Python",
    tags: ["Python", "OpenCV", "Flask", "React", "MongoDB"],
    features: [
      "LBPH Face Recognition algorithm for high accuracy face verification",
      "Real-time video feed streaming and face overlay annotations",
      "CSV exports for attendance sheets",
      "Interactive charts showing student attendance trends over time",
      "Teacher dashboard with admin controls"
    ],
    github: "https://github.com/yogeshpawar/smart-attendance",
    link: "https://github.com/yogeshpawar/smart-attendance"
  },
  {
    title: "DevConnect — Developer Social Hub",
    description: "Full-stack MERN application where developers share snippets, follow peers, and showcase projects with real-time notifications.",
    longDescription: "A MERN stack social hub designed for web developers to share code snippets, write technical blogs, follow peers, and chat in real-time. It integrates with the GitHub API to automatically fetch and showcase users' repositories on their profiles. It leverages Socket.io for instantaneous typing notifications, chat messaging, and system alerts.",
    category: "Full-Stack Web",
    tags: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    features: [
      "GitHub API integration to pull user repository portfolios",
      "Real-time text messaging and online status updates with Socket.io",
      "Rich text editor supporting markdown code blocks with syntax highlighting",
      "Feed page with likes, comments, and sorting algorithms"
    ],
    github: "https://github.com/yogeshpawar/devconnect",
    link: "https://github.com/yogeshpawar/devconnect"
  },
  {
    title: "AI Resume Analyzer",
    description: "NLP tool that scores resumes against job descriptions using TF-IDF and transformer embeddings, deployed on Streamlit.",
    longDescription: "An automated recruitment assistant built with Python and Streamlit. It parses PDF resumes, extracts text content, and computes similarity scores against a user-provided job description. By employing natural language processing techniques (TF-IDF vectorizers and Sentence-Transformers), it highlights missing keywords, measures structural compliance, and suggests resume adjustments.",
    category: "Machine Learning / Python",
    tags: ["Python", "NLP", "Streamlit", "Transformers", "Scikit-Learn"],
    features: [
      "PyPDF2 parser to handle raw resume extractions",
      "Cosine similarity comparison using sentence embeddings",
      "Keyword extraction with NLTK to identify missing skills",
      "Interactive feedback report showing match percentages and advice",
      "Streamlit UI allowing fast PDF uploads and real-time analysis"
    ],
    github: "https://github.com/yogeshpawar/resume-analyzer",
    link: "https://github.com/yogeshpawar/resume-analyzer"
  },
  {
    title: "Campus Marketplace",
    description: "A buy-sell platform for college students with authentication, chat, and image uploads, built on Next.js and Supabase.",
    longDescription: "A secure, closed e-commerce platform built for college students to trade textbooks, instruments, and electronics. Using Next.js for SSR pages and Supabase as the backend database and authentication provider, it includes instant messaging, image uploading to Supabase Storage, and listing categorizations with location filters.",
    category: "Full-Stack Web",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    features: [
      "Supabase User Authentication and OAuth integration",
      "Supabase Database with Row Level Security (RLS) policies",
      "Supabase Bucket storage for managing product images",
      "Real-time inbox linking buyers and sellers via instant chat"
    ],
    github: "https://github.com/yogeshpawar/campus-marketplace",
    link: "https://github.com/yogeshpawar/campus-marketplace"
  }
];

const TIMELINE = [
  {
    type: "experience",
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
    type: "experience",
    role: "Web Development Intern",
    company: "TechnoHacks Solutions",
    period: "Dec 2024 — Feb 2025",
    points: [
      "Developed responsive landing pages in React + Tailwind for 3 client projects.",
      "Integrated Razorpay payments and email automation via Nodemailer.",
      "Collaborated using Git, Jira and weekly agile standups.",
    ],
  },
  {
    type: "education",
    role: "Bachelor of Engineering in Information Technology",
    company: "Savitribai Phule Pune University",
    period: "2022 — 2026 (Expected)",
    points: [
      "Maintaining a solid cumulative CGPA of 8.7/10.",
      "Relevant Coursework: Database Management Systems, Distributed Systems, Cloud Architecture, Object Oriented Programming, Data Structures & Algorithms.",
      "Active member and organizer at student tech symposia and code hacks.",
    ],
  },
];

const CERTIFICATIONS = [
  {
    title: "Oracle Certified Associate, Java SE Programmer",
    issuer: "Oracle Corporation",
    date: "Aug 2025",
    pdf: "/Yogesh_Pawar_Resume.pdf",
  },
  {
    title: "Spring Boot Framework Developer Certification",
    issuer: "Spring Academy",
    date: "Jun 2025",
    pdf: "/Yogesh_Pawar_Resume.pdf",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Apr 2025",
    pdf: "/Yogesh_Pawar_Resume.pdf",
  },
  {
    title: "HackerRank 5★ Java & Problem Solving",
    issuer: "HackerRank",
    date: "Ongoing",
    pdf: "/Yogesh_Pawar_Resume.pdf",
  }
];

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects 
            filteredProjects={filteredProjects} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedProject={setSelectedProject}
          />
          <Experience />
          <Certifications />
          <Contact />
        </main>
        <Footer />
        <ChatWidget />

        {/* Project Details Sheet (Drawer) */}
        <Sheet open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
          {selectedProject && (
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto glass-panel p-5 sm:p-8 border-l border-border/80">
              <SheetHeader className="mt-4 pb-4 border-b border-border/60">
                <span className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 font-mono text-xs font-semibold w-max mb-2">
                  {selectedProject.category}
                </span>
                <SheetTitle className="text-2xl font-bold font-display text-foreground leading-tight">
                  {selectedProject.title}
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider font-mono">Overview</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.longDescription}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider font-mono">Key Features</h4>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider font-mono">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-foreground shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border/60 flex flex-col gap-3">
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-secondary transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <Github className="h-4 w-4" /> GitHub Repository
                  </a>
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 transition-all hover:scale-[1.01] shadow-glow cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4" /> Go Live
                  </a>
                </div>
              </div>
            </SheetContent>
          )}
        </Sheet>
      </div>
    </TooltipProvider>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary cursor-pointer"
    >
      {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
    </button>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3 group select-none">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Code2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display text-base font-extrabold tracking-tight text-foreground leading-tight">
  Yogesh Pawar
</span>
            <span className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-2.5 w-2.5 animate-pulse" /> Spring Developer
            </span>
          </div>
        </a>
        
        {/* Desktop Navbar */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {NAV.map((n) => (
            <a 
              key={n.id} 
              href={`#${n.id}`} 
              className="transition-colors hover:text-foreground relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-primary after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {n.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-full border border-border/60 bg-secondary px-5 py-2 text-sm font-semibold transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary sm:inline-flex cursor-pointer active:scale-95 shadow-sm hover:shadow-glow"
          >
            Get In Touch
          </a>
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav className="md:hidden border-t border-border/50 bg-background px-6 py-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV.map((n) => (
            <a 
              key={n.id} 
              href={`#${n.id}`} 
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground py-2 border-b border-border/30 last:border-0"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="rounded-xl bg-primary text-primary-foreground text-center py-2.5 text-sm font-semibold shadow-glow mt-2"
          >
            Get In Touch
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-glow border-b border-border/40 pt-8 pb-14 lg:pt-12 lg:pb-20">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Details */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/65 px-4 py-1.5 font-sans text-xs sm:text-sm font-semibold text-muted-foreground backdrop-blur-md shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Actively Seeking Placement Opportunities
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/65 px-4 py-1.5 font-sans text-xs sm:text-sm font-semibold text-muted-foreground backdrop-blur-md shadow-sm">
                <MapPin className="h-4 w-4 text-primary" /> Pune, India
              </span>
            </div>
            
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl text-foreground">
              Hi, I'm <span className="text-gradient">Yogesh Pawar</span>
            </h1>
            
            <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">
              Java Spring Boot Developer
            </p>
            
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              Information Technology Engineering student with extensive experience building enterprise-grade backend systems using <span className="text-foreground font-semibold">Java</span>, <span className="text-foreground font-semibold">Spring Boot</span>, <span className="text-foreground font-semibold">Docker</span>, and <span className="text-foreground font-semibold">Linux</span>. Focused on creating resilient microservices, optimizing database pipelines, and designing clean code architecture.
            </p>
            
            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] cursor-pointer hover:opacity-95"
              >
                View Projects <ArrowUpRight className="h-4.5 w-4.5" />
              </a>
              <a
                href="/Yogesh_Pawar_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary cursor-pointer"
              >
                <Download className="h-4.5 w-4.5" /> Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary cursor-pointer"
              >
                <Mail className="h-4.5 w-4.5" /> Contact
              </a>
            </div>
          </div>
          
          {/* Right Column: 3D profile picture frame */}
          <div className="relative mx-auto max-w-sm lg:max-w-md w-full animate-float">
            {/* Background glowing gradients */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary to-accent opacity-30 blur-2xl animate-pulse-slow" />
            
            <div className="relative rounded-3xl border border-border/80 bg-card p-3.5 shadow-card transition-transform duration-300 hover:scale-[1.01]">
              <div className="overflow-hidden rounded-2xl aspect-[4/5] relative bg-secondary">
                <img
                  src={yogeshPhoto}
                  alt="Yogesh Pawar"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border/60 py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl text-foreground">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" title="About Me">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            I'm a final-year Information Technology Engineering student with a passion for transforming complex computational concepts into robust, accessible, and user-centric software. My core expertise is situated in the backend, designing scalable relational schemas and managing microservice synchronization.
          </p>
          <p>
            I enjoy problem-solving on a systems level: containerizing applications via Docker, deploying service registries in Spring Cloud, or automating administrative scripts on Linux nodes. I'm focused on writing unit-tested, self-documenting code and optimizing operations for peak efficiency.
          </p>
          
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: "8.7", v: "Cumulative CGPA", desc: "SPPU University" },
            { k: "12+", v: "Completed Projects", desc: "Backend & Web" },
            { k: "2", v: "Internships Completed", desc: "Industry Experience" },
            { k: "5★", v: "HackerRank Rank", desc: "Java & Problem Solving" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border border-border/80 bg-card p-5.5 shadow-card hover:border-primary/40 transition-colors"
            >
              <div className="font-display text-3xl font-extrabold text-gradient">{s.k}</div>
              <div className="mt-1 text-sm font-bold text-foreground">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary/50 group"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
              <category.icon className="h-5.5 w-5.5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">{category.title}</h3>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer shadow-sm">
                      {skill.name}
                      <span className={`h-1.5 w-1.5 rounded-full ${skill.level === "Core" ? "bg-primary" : "bg-muted-foreground/60"}`} />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="max-w-[200px] text-center">{skill.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

interface ProjectsProps {
  filteredProjects: typeof PROJECTS;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  setSelectedProject: (proj: typeof PROJECTS[0]) => void;
}

function Projects({
  filteredProjects,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  setSelectedProject,
}: ProjectsProps) {
  const categories = ["All", "Java / Spring Boot", "Full-Stack Web", "Machine Learning / Python"];

  return (
    <Section id="projects" title="Projects">
      <div className="space-y-8">
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects by name or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-10 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-1.5 bg-secondary/40 border border-border/50 p-1.5 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.split(" / ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <button
                key={p.title}
                onClick={() => setSelectedProject(p)}
                className="group flex flex-col text-left rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/50 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 w-full">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
                    {p.category.split(" / ")[0]}
                  </span>
                  <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground leading-tight">{p.title}</h3>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>
                
                <div className="mt-5 pt-4 border-t border-border/40 flex flex-wrap gap-1.5 w-full">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-border/60 bg-secondary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 4 && (
                    <span className="rounded-lg border border-border/60 bg-secondary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      +{p.tags.length - 4} more
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/80 p-12 text-center text-muted-foreground">
            No projects found matching your search parameters. Try adjusting filters!
          </div>
        )}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative max-w-3xl mx-auto pl-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-border/60">
        <div className="space-y-10">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Connector dot */}
              <span className="absolute -left-[25px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-background bg-card text-primary shadow-sm ring-4 ring-background transition-colors group-hover:bg-primary z-10">
                <span className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-primary-foreground" />
              </span>
              
              <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card transition-all hover:border-primary/35">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {item.type === "experience" ? <Briefcase className="h-3.5 w-3.5" /> : <GraduationCap className="h-3.5 w-3.5" />}
                      </span>
                      <h3 className="font-display text-lg font-bold text-foreground leading-snug">{item.role}</h3>
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground pl-9">{item.company}</p>
                  </div>
                  <span className="self-start sm:self-center shrink-0 rounded-full border border-border bg-secondary/80 px-3.5 py-1 font-mono text-[10px] font-bold text-muted-foreground pl-3 pr-3">
                    {item.period}
                  </span>
                </div>
                
                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground pl-9 list-disc marker:text-primary">
                  {item.points.map((pt, idx) => (
                    <li key={idx}>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications" title="Certifications & Badges">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CERTIFICATIONS.map((cert) => (
          <div 
            key={cert.title}
            className="rounded-2xl border border-border bg-card p-5.5 shadow-card hover:border-primary/40 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Award className="h-4.5 w-4.5" />
              </span>
              <h3 className="font-display text-base font-bold text-foreground leading-tight">{cert.title}</h3>
              <p className="text-xs font-semibold text-muted-foreground">{cert.issuer}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/40 flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground font-bold uppercase tracking-wider">
                <span>Issued</span>
                <span>{cert.date}</span>
              </div>
              <a
                href={cert.pdf}
                download
                className="mt-1 flex items-center justify-center gap-1.5 w-full rounded-lg bg-secondary/80 hover:bg-primary hover:text-primary-foreground py-2 text-xs font-bold text-foreground transition-all cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const toastId = toast.loading("Formulating message draft...");
    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Draft prepared!", { id: toastId });
      setIsSuccess(true);

      const subject = encodeURIComponent(`Contact from portfolio — ${data.name}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      );
      window.location.href = `mailto:yogeshpawar.pict@gmail.com?subject=${subject}&body=${body}`;
    } catch (e) {
      toast.error("An error occurred. Please try again.", { id: toastId });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("yogeshpawar.pict@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    reset();
  };

  return (
    <Section id="contact" title="Let's build something">
      <div className="grid gap-10 rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-card lg:grid-cols-[1.2fr_1fr] lg:p-12">
        <div>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            I am actively seeking software engineering internships and full-time graduation roles starting in 2026. If you have an opportunity or want to collaborate on a Spring Boot, React, or Python application, get in touch!
          </p>
          <div className="mt-8 space-y-4 text-sm font-medium">
            <button
              onClick={handleCopy}
              className="flex items-center gap-3.5 text-foreground transition-colors hover:text-primary text-left cursor-pointer group"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-bold">Email Address</p>
                <p className="flex items-center gap-1.5 break-all">
                  yogeshpawar.pict@gmail.com 
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground/60" />}
                </p>
              </div>
            </button>

            <a
              href="tel:+919322158749"
              className="flex items-center gap-3.5 text-foreground transition-colors hover:text-primary group"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-bold">Mobile Number</p>
                <p>+91 93221 58749</p>
              </div>
            </a>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 text-foreground transition-colors hover:text-primary group"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Github className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-bold">GitHub</p>
                <p>github.com/yogeshpawar</p>
              </div>
            </a>
            
            <a
              href="https://www.linkedin.com/in/yogesh-pawar-45029922a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 text-foreground transition-colors hover:text-primary group"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Linkedin className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-bold">LinkedIn</p>
                <p>linkedin.com/in/yogeshpawar</p>
              </div>
            </a>
            
            <a
              href="https://www.instagram.com/mr.yog9322/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 text-foreground transition-colors hover:text-primary group"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Instagram className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-bold">Instagram</p>
                <p>instagram.com/yogeshpawar</p>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="relative">
          {isSuccess ? (
            <div className="rounded-2xl border border-border/80 bg-secondary/20 p-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-500">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">Message Drafted Successfully!</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A mail composer was opened to dispatch the message. If it didn't trigger, you can directly email <a href="mailto:yogeshpawar.pict@gmail.com" className="underline font-semibold text-primary">yogeshpawar.pict@gmail.com</a> or click below to reset.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary cursor-pointer"
                >
                  Copy Email
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95 shadow-glow cursor-pointer"
                >
                  Write Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <input
                  {...register("name")}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.name ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border/80"
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] font-semibold text-destructive pl-1">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@domain.com"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.email ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border/80"
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] font-semibold text-destructive pl-1">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Write a message about your opportunity or project details..."
                  disabled={isSubmitting}
                  className={`w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.message ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border/80"
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] font-semibold text-destructive pl-1">{errors.message.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:opacity-95 disabled:opacity-50 shadow-glow cursor-pointer hover:scale-[1.01] active:scale-100"
              >
                {isSubmitting ? (
                  <>Preparing draft...</>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/15 py-10 transition-colors">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-semibold text-foreground">© {new Date().getFullYear()} Yogesh Pawar. All rights reserved.</p>
        </div>
        <a 
          href="#top"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-all hover:scale-[1.02] active:scale-100 shadow-glow cursor-pointer hover:opacity-95"
        >
          Back To Top <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
