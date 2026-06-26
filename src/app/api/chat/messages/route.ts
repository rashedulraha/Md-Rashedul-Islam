import { NextRequest, NextResponse } from "next/server";
import { chatStore } from "@/lib/chat-store";
import { verifyJWT } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/chat/messages
// Can return all sessions (if admin) or single session history (if user or admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    
    // Check if the requester is admin
    const adminToken = request.cookies.get("admin_token")?.value;
    let isAdmin = false;
    if (adminToken) {
      const payload = await verifyJWT(adminToken);
      if (payload && payload.role === "admin") {
        isAdmin = true;
      }
    }

    if (!sessionId) {
      // If no sessionId is provided, check if user is admin and return all sessions
      if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const sessions = chatStore.getSessions();
      return NextResponse.json({ sessions });
    }

    // If a specific sessionId is provided, return its history
    // Mark as read if admin is fetching it
    if (isAdmin && sessionId !== "admin") {
      chatStore.markAsRead(sessionId);
    }

    const session = chatStore.getSession(sessionId);
    if (!session) {
      // Return empty session structure
      return NextResponse.json({
        sessionId,
        userName: "Anonymous Visitor",
        messages: [],
        online: false,
        lastActive: new Date().toISOString(),
      });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("GET messages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/chat/messages
// Sends a message (from user or admin)
export async function POST(request: NextRequest) {
  try {
    const { sessionId, content, sender, userName } = await request.json();

    if (!sessionId || !content || !sender) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Security: Only verified admin can send messages as "admin"
    if (sender === "admin") {
      const adminToken = request.cookies.get("admin_token")?.value;
      if (!adminToken) {
        return NextResponse.json({ error: "Unauthorized: Admin session required" }, { status: 401 });
      }
      const payload = await verifyJWT(adminToken);
      if (!payload || payload.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized: Invalid admin token" }, { status: 401 });
      }
    }

    // Initialize/retrieve session and save the message
    if (userName && sender === "user") {
      chatStore.getOrCreateSession(sessionId, userName);
    }

    const message = chatStore.addMessage(sessionId, content, sender);

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("POST messages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
