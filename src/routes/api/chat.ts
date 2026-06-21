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
- Projects: Smart Attendance System, DevConnect, AI Resume Analyzer, Campus Marketplace
- Based in Pune, India. Open to internships and graduate roles starting 2026
- Contact: yogesh.pawar@example.com

Keep replies short, helpful, and professional. If asked something you don't know about Yogesh, suggest emailing him.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
