import { NextRequest } from "next/server";
import { chatStore } from "@/lib/chat-store";
import { verifyJWT } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return new Response("Missing sessionId parameter", { status: 400 });
  }

  // Security check: if the client registers as "admin", check their admin token
  if (sessionId === "admin") {
    const adminToken = request.cookies.get("admin_token")?.value;
    if (!adminToken) {
      return new Response("Unauthorized", { status: 401 });
    }
    const payload = await verifyJWT(adminToken);
    if (!payload || payload.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  let keepAliveInterval: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {
      // Register client in the store
      chatStore.registerSSE(sessionId, controller);

      // Mark session as online if it is a visitor
      if (sessionId !== "admin") {
        chatStore.setSessionOnlineStatus(sessionId, true);
      }

      // Send initial connection success message
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode("data: {\"type\":\"connected\"}\n\n"));

      // Set up a keep-alive pulse every 15 seconds to prevent browser/proxy timeouts
      keepAliveInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": keepalive\n\n"));
        } catch (error) {
          // Stream might be closed already
          clearInterval(keepAliveInterval);
        }
      }, 15000);
    },
    cancel(reason) {
      console.log(`[SSE] Client ${sessionId} disconnected:`, reason);
      clearInterval(keepAliveInterval);
      
      // Get a reference to the global chatStore and unregister
      // Note: We use the imported chatStore directly
      const dummyController = {} as ReadableStreamDefaultController; // Handled internally
      
      // Let's mark visitor session offline
      if (sessionId !== "admin") {
        chatStore.setSessionOnlineStatus(sessionId, false);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
