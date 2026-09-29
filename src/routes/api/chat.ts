import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

type ChatRequestBody = { messages?: unknown };

const SYSTEM_PROMPT = `You are Yogesh Pawar's friendly AI assistant on his portfolio website. Answer visitor questions clearly and concisely about Yogesh.

About Yogesh:
- IT Engineering student and Java Spring Boot Developer
- Skills: Java 21, Spring Boot, Docker, Kubernetes, Linux, REST APIs, PostgreSQL, Git, Maven
- Also works with React, Node.js, TypeScript, Python, FastAPI, Express, MongoDB, LangChain, RAG
- Internships: Product Developer Intern at BMC Helix (May–Jul 2025), Software Engineering Intern at Infosys Springboard (Dec 2024–Feb 2025), Web Development Intern at TechnoHacks Solutions (Dec 2024–Feb 2025)
- Education: B.E. IT at Pune Institute of Computer Technology (PICT) with 9.65 CGPA, Diploma IT at Government Polytechnic Ambad (93.03%)
- Projects: AI-Powered School ERP — SmartAttend Rural, NovaDB — Custom Relational Database Management System, GramSetu AI — AI-Powered Rural Village Assistant
- Based in Pune, India. Open to internships and graduate roles starting 2026
- Contact: yogeshpawar.pict@gmail.com

Keep replies short, helpful, and professional. If asked something you don't know about Yogesh, suggest emailing him.`;

function getFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("tech stack") || msg.includes("technologies") || msg.includes("skills") || msg.includes("stack") || msg.includes("tool")) {
    return `Yogesh's core tech stack is focused on backend engineering and Java technologies:
• Core Backend: Java 21, Spring Boot, Spring Cloud, REST APIs, FastAPI, Maven
• Databases & Cloud: PostgreSQL, MongoDB, Docker, Kubernetes, AWS, Firebase, Cloudinary, FAISS Vector Search
• Frontend: React 19, Next.js, JavaScript, TypeScript, Tailwind CSS, Vite
• Languages & AI: Java, Python, C++, SQL, LangChain, RAG, Groq API, Whisper, gTTS

He is highly proficient in building scalable database engines, microservices, and AI-powered applications!`;
  }
  
  if (msg.includes("project") || msg.includes("portfolio") || msg.includes("built") || msg.includes("work")) {
    return `Yogesh has built three flagship projects:
1. AI-Powered School ERP — SmartAttend Rural: MERN stack platform with Gemini AI insights, multilingual support (i18next), Socket.IO, and Cloudinary.
2. NovaDB — Custom Relational Database Management System: Custom RDBMS built in Java 21 & Spring Boot with custom SQL parser, binary storage, indexing, and transaction management.
3. GramSetu AI — Rural Village Assistant: AI assistance platform built with React, FastAPI, LangChain, RAG, Groq API, FAISS, OpenAI Whisper voice input, and gTTS.

You can click on any project in the "Projects" section of his portfolio to open a detailed slide-over panel showing its key features and architecture!`;
  }
  
  if (msg.includes("intern") || msg.includes("experience") || msg.includes("work") || msg.includes("job") || msg.includes("bmc") || msg.includes("infosys")) {
    return `Yogesh has professional experience across three key software engineering roles:
1. Product Developer Intern at BMC Helix (May 2025 — Jul 2025): Hands-on exposure to ITSM workflows, product architecture, and enterprise software development.
2. Software Engineering Intern at Infosys Springboard (Dec 2024 — Feb 2025): Developed Node.js & Spring Boot REST APIs, optimized PostgreSQL query performance by 35% with indexed views.
3. Web Development Intern at TechnoHacks Solutions (Dec 2024 — Feb 2025): Built responsive web apps using React and Tailwind CSS, integrated Razorpay payments and email automation.

You can view details in the "Education & Experience" section of his portfolio!`;
  }
  
  if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("touch") || msg.includes("linkedin")) {
    return `You can get in touch with Yogesh Pawar using the following channels:
• Email: yogeshpawar.pict@gmail.com (usually replies within 24 hours)
• LinkedIn: linkedin.com/in/yogeshpawar
• GitHub: github.com/yogeshpawar
• Location: Pune, India

You can also use the contact form at the bottom of the page to compose an email draft directly!`;
  }

  if (msg.includes("education") || msg.includes("college") || msg.includes("university") || msg.includes("cgpa") || msg.includes("pict") || msg.includes("degree")) {
    return `Yogesh's educational background:
• Bachelor of Engineering in IT at SCTR's Pune Institute of Computer Technology (PICT), Pune with 9.65 CGPA.
• Diploma in Computer Engineering at Government Polytechnic Ambad with 93.03% (Distinction).`;
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greet")) {
    return `Hello! I'm Yogesh's AI assistant. Ask me anything about his skills, projects, internships, or contact details, or select one of the quick suggestions!`;
  }
  
  return `I'm here to help you learn about Yogesh Pawar!
I can tell you about:
• His core technologies (Spring Boot, Java, Docker, PostgreSQL)
• His projects (Microservices, OpenCV Attendance, DevConnect)
• His internships (Infosys Springboard, TechnoHacks)
• How to contact him or his education details.

What would you like to know?`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        console.log("=== CHAT API REQUEST RECEIVED ===");
        try {
          const body = await request.json() as ChatRequestBody;
          console.log("Request Body:", JSON.stringify(body));
          
          const { messages } = body;
          if (!Array.isArray(messages)) {
            console.log("Validation error: messages is not an array");
            return new Response("Messages are required", { status: 400 });
          }

          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            console.log("LOVABLE_API_KEY missing - running fallback streaming response");
            const lastMessageObj = messages[messages.length - 1] as any;
            let lastUserMessage = "";
            if (lastMessageObj) {
              if (typeof lastMessageObj.content === "string") {
                lastUserMessage = lastMessageObj.content;
              } else if (Array.isArray(lastMessageObj.parts)) {
                lastUserMessage = lastMessageObj.parts
                  .map((p: any) => (p.type === "text" ? p.text : ""))
                  .join("");
              }
            }
            console.log("Last User Message:", lastUserMessage);

            const responseText = getFallbackResponse(lastUserMessage);
            console.log("Generated Fallback Response:", responseText);

            const encoder = new TextEncoder();
            const words = responseText.split(/(\s+)/);

            const stream = new ReadableStream({
              async start(controller) {
                // Stream text parts in AI SDK format: 0:"word"\n
                for (const word of words) {
                  if (word) {
                    const chunk = `0:${JSON.stringify(word)}\n`;
                    controller.enqueue(encoder.encode(chunk));
                    // Smooth delay to simulate typing effect
                    await new Promise((resolve) => setTimeout(resolve, 15));
                  }
                }
                
                // Enqueue the finish token part: d:{"finishReason":"stop"}\n
                const finishChunk = `d:{"finishReason":"stop"}\n`;
                controller.enqueue(encoder.encode(finishChunk));
                
                controller.close();
              },
            });

            console.log("Returning streaming Response...");
            return new Response(stream, {
              headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "X-AI-Stream-Protocol": "v1",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
              },
            });
          }

          console.log("LOVABLE_API_KEY present - calling real Gemini provider");
          const gateway = createLovableAiGatewayProvider(key);
          const result = streamText({
            model: gateway("google/gemini-3-flash-preview"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages as UIMessage[]),
          });

          console.log("Returning result.toUIMessageStreamResponse...");
          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
          });
        } catch (error) {
          console.error("API error:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      },
    },
  },
});
