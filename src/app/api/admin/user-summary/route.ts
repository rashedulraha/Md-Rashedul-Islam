import { NextRequest, NextResponse } from "next/server";
import { chatStore } from "@/lib/chat-store";
import { verifyJWT } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = "force-dynamic";

// Initialize Gemini AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyADzRMvuIMjGLav-ORSBALLfdtrbFUcQtQ";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function GET(request: NextRequest) {
  try {
    // 1. Authorize Request
    const adminToken = request.cookies.get("admin_token")?.value;
    if (!adminToken) {
      return NextResponse.json({ error: "Unauthorized: Admin session required" }, { status: 401 });
    }
    const payload = await verifyJWT(adminToken);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: Invalid admin token" }, { status: 401 });
    }

    // 2. Get sessionId
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId parameter" }, { status: 400 });
    }

    // 3. Retrieve Chat History
    const session = chatStore.getSession(sessionId);
    if (!session || session.messages.length === 0) {
      return NextResponse.json({
        summary: {
          visitorIntent: "No conversation history found.",
          coreTechMentioned: [],
          potentialProjectBudgetOrLeadScore: "N/A",
          suggestedNextReply: "Say hello and ask how you can help!",
        }
      });
    }

    // 4. Format chat logs for the prompt
    const chatLogs = session.messages
      .map((msg) => `${msg.sender === "user" ? "Visitor" : "Assistant"}: ${msg.content}`)
      .join("\n");

    const prompt = `
You are an expert CRM/Sales Assistant. Analyze the following conversation between a portfolio website visitor and the AI assistant. 
Generate a structured JSON summary representing the visitor's profile.

Conversation logs:
"""
${chatLogs}
"""

Please respond ONLY with a valid JSON object matching this schema:
{
  "userIntent": "Brief description of why the visitor is communicating (e.g., Contract work, Permanent hiring, General inquiry)",
  "technicalDepth": "Detailed evaluation of the technical sophistication/depth of the inquiry (e.g., High (requires Multi-stage Docker & Nginx Reverse Proxy), Medium, Low)",
  "actionPlan": ["Step 1 to close lead/respond", "Step 2", "Step 3"],
  "suggestedNextReply": "A highly tailored, professional suggested reply that the portfolio owner (Rashedul) can send next to close this lead or answer effectively."
}
`;

    // 5. Call Gemini
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    
    // Parse response
    const summary = JSON.parse(textResponse);

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("AI summary API error:", error);
    return NextResponse.json({ 
      error: "Failed to generate summary", 
      details: error.message || error 
    }, { status: 500 });
  }
}
