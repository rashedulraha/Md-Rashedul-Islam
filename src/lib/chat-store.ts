import fs from "fs";
import path from "path";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "admin" | "bot";
  timestamp: string;
  read: boolean;
}

export interface ChatSession {
  sessionId: string;
  userName: string;
  userEmail?: string;
  messages: Message[];
  online: boolean;
  lastActive: string;
}

interface SSEClient {
  targetId: string; // "admin" or the specific sessionId
  controller: ReadableStreamDefaultController;
}

const DB_FILE_PATH = "/tmp/portfolio-chats-db.json";

class ChatStore {
  private sessions: Map<string, ChatSession> = new Map();
  private sseClients: Set<SSEClient> = new Set();
  private isLoaded = false;

  constructor() {
    this.loadFromDisk();
  }

  // Load chat sessions from local disk JSON
  private loadFromDisk() {
    if (this.isLoaded) return;
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const fileContent = fs.readFileSync(DB_FILE_PATH, "utf-8");
        const data = JSON.parse(fileContent);
        if (typeof data === "object") {
          Object.keys(data).forEach((key) => {
            this.sessions.set(key, data[key]);
          });
        }
        console.log(`[ChatStore] Loaded ${this.sessions.size} sessions from ${DB_FILE_PATH}`);
      } else {
        console.log("[ChatStore] No existing chat DB file found. Starting fresh.");
      }
    } catch (error) {
      console.error("[ChatStore] Error loading from disk:", error);
    } finally {
      this.isLoaded = true;
    }
  }

  // Persist chat sessions to disk JSON
  private saveToDisk() {
    try {
      const obj: Record<string, ChatSession> = {};
      this.sessions.forEach((val, key) => {
        obj[key] = val;
      });
      // Ensure the directory exists
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(obj, null, 2), "utf-8");
    } catch (error) {
      console.error("[ChatStore] Error saving to disk:", error);
    }
  }

  // Get all chat sessions (for admin) sorted by lastActive descending
  public getSessions(): ChatSession[] {
    this.loadFromDisk();
    return Array.from(this.sessions.values()).sort(
      (a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
    );
  }

  // Get a single session
  public getSession(sessionId: string): ChatSession | undefined {
    this.loadFromDisk();
    return this.sessions.get(sessionId);
  }

  // Create a new session or fetch existing
  public getOrCreateSession(sessionId: string, userName = "Anonymous Visitor"): ChatSession {
    this.loadFromDisk();
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        userName,
        messages: [],
        online: true,
        lastActive: new Date().toISOString(),
      };
      this.sessions.set(sessionId, session);
      this.saveToDisk();
      this.broadcastToAdmins({ type: "session_created", session });
    }
    return session;
  }

  // Add message to a session
  public addMessage(sessionId: string, content: string, sender: "user" | "admin" | "bot"): Message {
    this.loadFromDisk();
    const session = this.getOrCreateSession(sessionId);
    
    const message: Message = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      content,
      sender,
      timestamp: new Date().toISOString(),
      read: sender === "user" ? false : true,
    };

    session.messages.push(message);
    session.lastActive = message.timestamp;
    
    // Save updated session to disk
    this.saveToDisk();

    // Broadcast the message update in real-time
    this.broadcastMessage(sessionId, message);

    return message;
  }

  // Mark all messages as read for a session
  public markAsRead(sessionId: string) {
    this.loadFromDisk();
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messages.forEach((msg) => {
        msg.read = true;
      });
      this.saveToDisk();
      this.broadcastToAdmins({ type: "messages_read", sessionId });
    }
  }

  // Set visitor online status
  public setSessionOnlineStatus(sessionId: string, online: boolean) {
    this.loadFromDisk();
    const session = this.sessions.get(sessionId);
    if (session) {
      session.online = online;
      session.lastActive = new Date().toISOString();
      this.saveToDisk();
      this.broadcastToAdmins({ type: "status_change", sessionId, online });
    }
  }

  // Register an SSE client
  public registerSSE(targetId: string, controller: ReadableStreamDefaultController) {
    const client = { targetId, controller };
    this.sseClients.add(client);
    console.log(`[ChatStore] SSE Client registered for: ${targetId}. Total clients: ${this.sseClients.size}`);
  }

  // Unregister an SSE client
  public unregisterSSE(targetId: string, controller: ReadableStreamDefaultController) {
    for (const client of this.sseClients) {
      if (client.targetId === targetId && client.controller === controller) {
        this.sseClients.delete(client);
        console.log(`[ChatStore] SSE Client unregistered for: ${targetId}. Remaining clients: ${this.sseClients.size}`);
        break;
      }
    }
  }

  // Send SSE payload to specific client or admin
  private broadcastMessage(sessionId: string, message: Message) {
    const payload = JSON.stringify({ type: "message", sessionId, message });
    const encoder = new TextEncoder();
    const sseFormat = `data: ${payload}\n\n`;

    this.sseClients.forEach((client) => {
      // Send to the admin panel, OR send to the specific visitor session
      if (client.targetId === "admin" || client.targetId === sessionId) {
        try {
          client.controller.enqueue(encoder.encode(sseFormat));
        } catch (err) {
          console.error(`[ChatStore] Error sending SSE to client ${client.targetId}:`, err);
        }
      }
    });
  }

  // Broadcast helper for admins
  private broadcastToAdmins(eventData: object) {
    const payload = JSON.stringify(eventData);
    const encoder = new TextEncoder();
    const sseFormat = `data: ${payload}\n\n`;

    this.sseClients.forEach((client) => {
      if (client.targetId === "admin") {
        try {
          client.controller.enqueue(encoder.encode(sseFormat));
        } catch (err) {
          console.error(`[ChatStore] Error sending SSE to admin:`, err);
        }
      }
    });
  }
}

// Global singleton instance
export const chatStore = new ChatStore();
export default chatStore;
