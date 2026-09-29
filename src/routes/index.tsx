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
  { id: "experience", label: "Education & Experience" },
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
      { name: "Node.js & Express", level: "Core", tooltip: "Used for REST APIs and real-time Socket.io integrations" },
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
    ],
  },
];

const PROJECTS = [
  {
    title: "AI-Powered School ERP — SmartAttend Rural",
    description: "An AI-powered School ERP designed to digitize school operations for rural schools with attendance tracking, leave management, multilingual support, and Gemini AI insights.",
    longDescription: "An AI-powered School ERP designed to digitize school operations for rural schools. The platform streamlines attendance tracking, leave management, notices, reports, and parent–teacher communication through role-based dashboards for administrators, teachers, and parents. It integrates multilingual support, real-time notifications, cloud-based image storage, and Gemini AI-powered attendance insights and report generation.",
    category: "Full-Stack Web",
    tags: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Gemini API", "Firebase", "Cloudinary", "i18next"],
    features: [
      "Role-Based Access Control with dedicated Admin, Teacher, and Parent dashboards using JWT authentication",
      "Attendance & Leave Management for tracking student attendance, managing leave requests, and monitoring records",
      "Gemini AI Integration for attendance insights, report generation, and AI-powered assistance",
      "Real-Time Notifications using Socket.IO and Firebase Cloud Messaging",
      "Multilingual Support with English, Hindi, and Marathi using i18next",
      "Cloud Image Storage using Cloudinary, with responsive UI for desktop and mobile devices"
    ],
    github: "https://github.com/yogeshpawar/smartattend-rural",
    link: "https://smartattend-rural.vercel.app"  
  },
  {
    title: "NovaDB — Mini Database Engine",
    description: "A lightweight relational database management system (RDBMS) built from scratch using Java 21, featuring a custom SQL query engine, binary file storage, indexing, and transaction management.",
    longDescription: "A lightweight relational database management system (RDBMS) built from scratch using Java 21, featuring a custom SQL query engine, binary file storage, indexing, and transaction management. It provides a RESTful API secured with JWT authentication and role-based access control (RBAC), alongside a React-based database administration console for managing databases, tables, and SQL queries.",
    category: "Java / Spring Boot / React",
    tags: ["Java 21", "Spring Boot", "React 19", "Vite", "Maven", "SQL", "JWT", "Spring Security", "REST APIs", "Binary File Storage", "Indexing", "Transactions"],
    features: [
      "Custom SQL tokenizer, recursive-descent parser, and query execution engine",
      "Binary file-based storage with persistent catalog and table data",
      "SQL operations including CREATE, INSERT, SELECT, UPDATE, DELETE, and filtering",
      "Index management for efficient data retrieval",
      "Transaction management with BEGIN, COMMIT, and ROLLBACK",
      "JWT authentication with SUPER_ADMIN, DEVELOPER, and READ_ONLY roles",
      "REST API integration using Spring Boot",
      "Interactive React dashboard for database exploration and SQL execution"
    ],
    github: "https://github.com/yogeshpawar/novadb",
    link: "https://github.com/yogeshpawar/novadb"
  },
  {
    title: "GramSetu AI — AI-Powered Rural Village Assistant",
    description: "An AI-powered rural assistance platform designed to provide accessible information and intelligent support to rural communities using RAG, LLMs, and voice interaction.",
    longDescription: "An AI-powered rural assistance platform designed to provide accessible information and intelligent support to rural communities. Built using React, Python, and FastAPI, it integrates Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), and voice-based interaction to deliver context-aware responses to user queries. The platform combines document-based knowledge retrieval, speech-to-text processing, and text-to-speech capabilities to make information more accessible.",
    category: "AI/ Machine Learning / Python",
    tags: ["Python", "FastAPI", "React", "Vite", "LangChain", "RAG", "Groq API", "Hugging Face", "FAISS", "Whisper", "gTTS", "NLP"],
    features: [
      "AI-powered conversational assistant for rural information and queries",
      "Retrieval-Augmented Generation (RAG) for context-aware responses using knowledge documents",
      "LangChain integration for retrieval and LLM orchestration",
      "Groq API integration for AI-powered response generation",
      "Hugging Face embeddings and FAISS vector search for semantic document retrieval",
      "Voice input using OpenAI Whisper for speech-to-text conversion",
      "Text-to-speech responses using gTTS",
      "FastAPI-based backend exposing REST APIs",
      "Interactive React dashboard built with Vite",
      "Document-based knowledge processing and indexing for information retrieval"
    ],
    github: "https://github.com/yogeshpawar/gramsetu-ai",
    link: "https://github.com/yogeshpawar/gramsetu-ai"
  }
];

const EDUCATION = [
  {
    role: "Bachelor of Engineering in Information Technology",
    company: "SCTR's Pune Institute of Computer Technology, Pune",
    period: "2024 — Present",
    score: "Score: 9.65/10.0 CGPA",
    description: "Currently pursuing a bachelor's degree with a strong academic record and focus on core IT concepts.",
    points: [
      "Relevant Coursework: Database Management Systems, Distributed Systems, Cloud Architecture, Object Oriented Programming, Data Structures & Algorithms.",
    ]
  },
  {
    role: "Diploma in Computer Engineering",
    company: "Government Polytechnic Ambad",
    period: "2021 — 2024",
    score: "Score: 93.03% / Distinction",
    description: "Completed diploma with distinction in Computer Engineering and fundamental engineering principles.",
    points: [
      "Specialized in core programming, web development fundamentals, and database systems."
    ]
  }
];

const EXPERIENCE = [
  {
    role: "Product Developer Intern",
    company: "BMC Helix",
    period: "Jan 2026 — Jun 2026",
    points: [
  "Containerized the Remote REST API Plugin using Docker to enable consistent deployment across environments.",
  "Implemented Server-Sent Events (SSE) to replace request polling with real-time event streaming.",
  "Worked with REST APIs, Docker, Git, and Linux in an enterprise development environment.",
  "Gained practical experience in IT service management (ITSM), enterprise workflows, and professional software development practices."
]
  },
 {
  role: "Android Developer Intern",
  company: "Mountreach Solution Pvt. Ltd., Amravati",
  period: "Jan 2024 — Apr 2024",
  points: [
    "Developed Android applications using Java, XML, Firebase, and Android Studio.",
    "Implemented Android features using Fragments, Text-to-Speech, Google Maps API, Bluetooth, and MediaPlayer.",
    "Integrated Firebase services for backend connectivity and application data management."
  ]
}
];

const CERTIFICATIONS = [
  {
  title: "Machine Learning Certificate",
  issuer: "Infosys Springboard",
  date: "Jul 2026",
  pdf: "/ML certificate springboard.pdf",
},
{
  title: "Java Certification",
  issuer: "Infosys Springboard",
  date: "Jul 2026",
  pdf: "/Java Infosys Springboard certificate yogesh.pdf",
},
{
  title: "Impetus Certificate",
  issuer: "Pune Institute of Computer Technology",
  date: "Mar 2025",
  pdf: "/IM-AD1027,Pune Institute of Computer Technology,Yogesh Pawar.pdf",
},
{
  title: "AR/VR Certificate of Achievement",
  issuer: "CDAC",
  date: "Feb 2025",
  pdf: "/Mr. Yogesh Sanjay Pawar.pdf",
},
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
              <Sparkles className="h-2.5 w-2.5 animate-pulse" /> Java Developer
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
              Java Developer
            </p>
            
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            Information Technology Engineering student with knowledge of <span>Java</span>, <span>Spring Boot</span>, <span>REST APIs</span>, <span>SQL</span>, and <span>Docker</span>. Interested in <span>backend development</span> and building practical software applications. Eager to learn new technologies and apply <span>problem-solving skills</span> to real-world projects.
            </p>
            
            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] cursor-pointer hover:opacity-95"
              >
                View Projects <ArrowUpRight className="h-4.5 w-4.5" />
              </a>
              <a
                href="/S24IT014_YogeshPawar_Resume.pdf"
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
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border/60 py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`mb-8 ${subtitle ? "text-center max-w-2xl mx-auto space-y-2" : "mb-6"}`}>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl text-foreground">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground leading-relaxed">{subtitle}</p>}
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
  I'm a final-year Information Technology Engineering student and a PPO recipient at BMC Helix, interested in building practical software applications. I have knowledge of Java, Spring Boot, REST APIs, SQL, React, Git, and Docker.

I enjoy developing backend applications, working with databases, solving coding problems, and learning new technologies. I aim to write clean code and improve my development skills through real-world projects.
</p>
<p>
  I enjoy problem-solving on a systems level: containerizing applications via Docker, deploying service registries in Spring Cloud, or automating administrative scripts on Linux nodes. I'm focused on writing unit-tested, self-documenting code and optimizing operations for peak efficiency.
</p>
          
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: "9.65", v: "Cumulative CGPA", desc: "SPPU University" },
            { k: "3+", v: "Completed Projects", desc: "Backend & Web" },
            { k: "2", v: "Internships Completed", desc: "Industry Experience" },
            { k: "PPO", v: "PPO Received", desc: "BMC Helix" },
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
    <Section id="experience" title="Education & Experience">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left Column: Education */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-xl font-bold text-foreground">Education</h3>
            <div className="h-0.5 w-10 rounded-full bg-primary" />
          </div>

          <div className="relative pl-7 space-y-8 before:absolute before:left-2.5 before:top-2.5 before:bottom-2.5 before:w-[2px] before:bg-border/70">
            {EDUCATION.map((item, idx) => (
              <div key={idx} className="relative group space-y-2.5">
                {/* Node dot */}
                <span className="absolute -left-[23px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background ring-4 ring-background transition-colors group-hover:bg-primary z-10">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-primary-foreground" />
                </span>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-foreground leading-snug">
                    {item.role}
                  </h4>
                </div>

                <div>
                  <span className="inline-block rounded-md border border-border bg-secondary/80 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
                    {item.period}
                  </span>
                </div>

                <p className="text-xs font-semibold italic text-muted-foreground underline decoration-border/60 underline-offset-4">
                  {item.company}
                </p>

                {item.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.score && (
                  <p className="text-xs font-bold text-foreground">
                    {item.score}
                  </p>
                )}

                {item.points && item.points.length > 0 && (
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-disc pl-4 marker:text-primary pt-1">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Professional Experience */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-xl font-bold text-foreground">Professional Experience</h3>
            <div className="h-0.5 w-10 rounded-full bg-primary" />
          </div>

          <div className="relative pl-7 space-y-8 before:absolute before:left-2.5 before:top-2.5 before:bottom-2.5 before:w-[2px] before:bg-border/70">
            {EXPERIENCE.map((item, idx) => (
              <div key={idx} className="relative group space-y-2.5">
                {/* Node dot */}
                <span className="absolute -left-[23px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background ring-4 ring-background transition-colors group-hover:bg-primary z-10">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-primary-foreground" />
                </span>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-display text-base font-bold text-foreground leading-snug">
                    {item.role}
                  </h4>
                </div>

                <div>
                  <span className="inline-block rounded-md border border-border bg-secondary/80 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
                    {item.period}
                  </span>
                </div>

                <p className="text-xs font-semibold italic text-muted-foreground underline decoration-border/60 underline-offset-4">
                  {item.company}
                </p>

                <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground list-disc pl-4 marker:text-primary pt-1">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
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
