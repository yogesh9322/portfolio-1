import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

type ChatRequestBody = { messages?: unknown };

const SYSTEM_PROMPT = `You are Yogesh Pawar's friendly AI assistant on his portfolio website. Answer visitor questions clearly and concisely about Yogesh.

About Yogesh:
- IT Engineering student and Java Spring Boot Developer
- Skills: Java, Spring Boot, Docker, Kubernetes, Linux, REST APIs, PostgreSQL, Git
- Also works with React, Node.js, TypeScript, Python
- Internships: Software Engineering Intern at Infosys Springboard (May–Jul 2025), Web Development Intern at TechnoHacks Solutions (Dec 2024–Feb 2025)
- Projects: Distributed E-Commerce Microservices, Smart Attendance System, DevConnect, AI Resume Analyzer, Campus Marketplace
- Based in Pune, India. Open to internships and graduate roles starting 2026
- Contact: yogeshpawar.pict@gmail.com

Keep replies short, helpful, and professional. If asked something you don't know about Yogesh, suggest emailing him.`;

function getFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("tech stack") || msg.includes("technologies") || msg.includes("skills") || msg.includes("stack") || msg.includes("tool")) {
    return `Yogesh's core tech stack is focused on backend engineering and Java technologies:
• Core Backend: Java, Spring Boot, Spring Cloud, REST APIs
• Databases & Cloud: PostgreSQL, MongoDB, Docker, Kubernetes, AWS, Firebase
• Frontend: React, Next.js, JavaScript, TypeScript, Tailwind CSS
• Languages: Java, Python, C++, SQL

He is highly proficient in building scalable, containerized microservices and optimizing database schemas!`;
  }
  
  if (msg.includes("project") || msg.includes("portfolio") || msg.includes("built") || msg.includes("work")) {
    return `Yogesh has built several impressive projects:
1. Distributed E-Commerce Microservices: A Spring Boot, Eureka, RabbitMQ, and Docker cloud backend.
2. Smart Attendance System: Contactless face-recognition attendance using Python, OpenCV, Flask, and React.
3. DevConnect: A MERN stack social hub for developers featuring real-time chats and Github integration.
4. AI Resume Analyzer: An NLP Streamlit application using BERT embeddings to score resumes.
5. Campus Marketplace: A peer-to-peer buy-sell portal built with Next.js and Supabase.

You can click on any project in the "Projects" section of his portfolio to open a detailed slide-over panel showing its key features and architecture!`;
  }
  
  if (msg.includes("intern") || msg.includes("experience") || msg.includes("work") || msg.includes("job") || msg.includes("infosys")) {
    return `Yogesh has completed two software engineering internships:
1. Software Engineering Intern at Infosys Springboard (May 2025 — Jul 2025): Developed internal Node.js REST APIs, optimized PostgreSQL queries by 35% using indexed views, and wrote unit tests with Jest.
2. Web Development Intern at TechnoHacks Solutions (Dec 2024 — Feb 2025): Built responsive web apps using React and Tailwind CSS, and integrated payments (Razorpay) and email automation.

He is currently looking for backend engineering internships and full-time roles starting in 2026!`;
  }
  
  if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("touch") || msg.includes("linkedin")) {
    return `You can get in touch with Yogesh Pawar using the following channels:
• Email: yogeshpawar.pict@gmail.com (usually replies within 24 hours)
• LinkedIn: linkedin.com/in/yogeshpawar
• GitHub: github.com/yogeshpawar
• Location: Pune, India

You can also use the contact form at the bottom of the page to compose an email draft directly!`;
  }

  if (msg.includes("education") || msg.includes("college") || msg.includes("university") || msg.includes("cgpa") || msg.includes("degree")) {
    return `Yogesh is pursuing a Bachelor of Engineering in Information Technology at Savitribai Phule Pune University (graduating in 2026).
He maintains an excellent cumulative CGPA of 8.7/10. His coursework includes Database Systems, Distributed Systems, Cloud Architecture, Object Oriented Programming, and Data Structures & Algorithms.`;
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
