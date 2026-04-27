import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Zap, Copy, Trash2, Download, Paperclip, X } from "lucide-react";
import { useLenis } from "@/Hooks/useLenis";

import { ChatBubble } from "./ChatBubble";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatToggle } from "./ChatToggle";

import type { Message } from "./Types";

const PORTFOLIO_CONTEXT = `Role: You are an intelligent AI assistant for Rashedul Islam's personal portfolio. 
Tone: Professional, friendly, and helpful. 
Language: Respond in the language used by the user (Bangla or English).

--- USER INFORMATION ---
Name: Rashedul Islam (Raha)
Profession: Full-Stack Web Developer, Software Engineer, and System Architect.
Location: Naogaon, Rajshahi, Bangladesh.
Education: Honours Student at Naogaon Government College (Expected Graduation: 2028).

--- TECHNICAL EXPERTISE ---
Frontend: Next.js 16+, React 19, TypeScript, Tailwind CSS, Redux, Zustand, TanStack Query.
Backend: Node.js, Golang, Python, FastAPI, WebSockets, gRPC.
Database: PostgreSQL (Prisma), MongoDB, Redis.
DevOps & Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD (GitHub Actions), Terraform.
AI Focus: LLM Integration, RAG Systems, Vector Databases (Pinecone), Prompt Engineering.
DSA: Expert in C, C++, Python; solved 500+ problems on various online judges.

--- FEATURED PROJECTS ---
1. Koda (formerly Velocity): A high-performance project management tool inspired by Linear.app. Built with Next.js, TypeScript, Tailwind, and Prisma.
2. AI-Powered Medical Assistant: A RAG system using Next.js, FastAPI, LangChain, and OpenAI for summarizing medical reports.
3. Scalable E-Commerce Platform: Microservices-based platform using Golang, PostgreSQL, and AWS.
4. Blood Bridge: A MERN stack blood donation platform.
5. Sharebite: A community food-sharing platform using Firebase and React.

--- CONTACT & SOCIAL ---
Email: rashedulraha.bd@gmail.com
LinkedIn: linkedin.com/in/rashedulraha
GitHub: github.com/rashedulraha
X (Twitter): x.com/rashedulraha
Portfolio: rashedulraha.github.io/Main-exzazon/

--- GUIDELINES FOR RESPONSE ---
- If a user asks about services, mention Full-Stack development or AI integration.
- If a user asks for contact, provide the email and LinkedIn link.
- If asked about location, mention Naogaon, Bangladesh.
- For irrelevant or inappropriate questions, politely redirect them to Rashedul's professional work.
- Use "I" or "Rashedul" based on the question (e.g., "Rashedul is an expert in..." or "I can help you with...").`;

const MESSAGES: Message[] = [
  {
    id: "1",
    content:
      "Hi! I'm Rashedul's AI assistant. Ask me anything about his skills, projects, or how to get in touch!",
    sender: "bot",
    timestamp: new Date(Date.now() - 3600000),
    read: true,
    reactions: { thumbsUp: 0, thumbsDown: 0 },
  },
];

const GEMINI_API_KEY = "AIzaSyADzRMvuIMjGLav-ORSBALLfdtrbFUcQtQ";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const RealTimeChatWidget = () => {
  useLenis();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [online, setOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationSound, setNotificationSound] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "files" | "settings">(
    "chat",
  );

  const chatHistoryRef = useRef<{ role: string; parts: { text: string }[] }[]>(
    [],
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnline(Math.random() > 0.1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    chatHistoryRef.current.push({
      role: "user",
      parts: [{ text: inputMessage }],
    });

    setInputMessage("");
    setIsTyping(true);
    sendBotResponse();
  };

  const sendBotResponse = async () => {
    try {
      const payload = {
        contents: chatHistoryRef.current,
        systemInstruction: {
          parts: [{ text: PORTFOLIO_CONTEXT }],
        },
      };

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "API Error");
      }

      const botText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that. Please try again.";

      chatHistoryRef.current.push({
        role: "model",
        parts: [{ text: botText }],
      });

      if (chatHistoryRef.current.length > 20) {
        chatHistoryRef.current = chatHistoryRef.current.slice(-16);
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botText,
        sender: "bot",
        timestamp: new Date(),
        read: false,
        reactions: { thumbsUp: 0, thumbsDown: 0 },
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (notificationSound && !isMinimized) {
        playNotificationSound();
      }

      if (isMinimized) {
        setUnreadCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Gemini API Error:", error);

      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `Sorry, I'm having trouble responding right now.  You can also contact me via WhatsApp SMS or send email.
        Phone: 01992284845
        Email: rashedulraha.bd@gmail.com`,
        sender: "bot",
        timestamp: new Date(),
        read: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const playNotificationSound = () => {
    try {
      const audioContext = new window.AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("Audio context not supported");
    }
  };

  const handleReaction = (
    messageId: string,
    type: "thumbsUp" | "thumbsDown",
  ) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId && msg.reactions) {
          return {
            ...msg,
            reactions: {
              ...msg.reactions,
              [type]: msg.reactions[type] + 1,
            },
          };
        }
        return msg;
      }),
    );
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <ChatToggle
        unreadCount={unreadCount}
        online={online}
        onToggle={toggleChat}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: isMinimized ? 100 : 0,
              scale: 1,
              height: isMinimized ? 80 : 600,
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? "w-80" : "w-96"
            } rounded-2xl shadow-2xl border border-border overflow-hidden bg-background flex flex-col`}>
            <ChatHeader
              online={online}
              isMinimized={isMinimized}
              notificationSound={notificationSound}
              onToggleMinimize={toggleMinimize}
              onToggleNotification={() =>
                setNotificationSound(!notificationSound)
              }
              onOpenSettings={() => setActiveTab("settings")}
              onClose={toggleChat}
            />

            {!isMinimized && (
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="border-b border-border/50 shrink-0">
                  <div className="flex px-4">
                    <button
                      onClick={() => setActiveTab("chat")}
                      className={`flex-1 py-3 text-sm font-medium relative ${
                        activeTab === "chat"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}>
                      Chat
                      {activeTab === "chat" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("files")}
                      className={`flex-1 py-3 text-sm font-medium relative ${
                        activeTab === "files"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}>
                      Files
                      {activeTab === "files" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className={`flex-1 py-3 text-sm font-medium relative ${
                        activeTab === "settings"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}>
                      Settings
                      {activeTab === "settings" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col">
                  {activeTab === "chat" && (
                    <>
                      <ScrollArea
                        className="flex-1 px-4 py-4"
                        data-lenis-prevent
                        style={{ maxHeight: "calc(100% - 140px)" }}>
                        <div className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center mb-6">
                            <Card className="inline-block px-4 py-2 bg-primary/5 border-primary/20">
                              <p className="text-sm text-muted-foreground">
                                Today at {formatTime(new Date())}
                              </p>
                            </Card>
                          </motion.div>

                          {messages.map((message) => (
                            <ChatBubble
                              key={message.id}
                              message={message}
                              onReaction={handleReaction}
                              onCopy={copyMessage}
                            />
                          ))}

                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-start gap-3 mb-4">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-linear-to-br from-primary to-primary/70">
                                  <Bot className="h-4 w-4 text-primary-foreground" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex items-center space-x-2 bg-muted rounded-2xl px-4 py-3 rounded-tl-none">
                                <div className="flex space-x-1">
                                  <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 0.6,
                                    }}
                                    className="h-2 w-2 bg-muted-foreground rounded-full"
                                  />
                                  <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 0.6,
                                      delay: 0.2,
                                    }}
                                    className="h-2 w-2 bg-muted-foreground rounded-full"
                                  />
                                  <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 0.6,
                                      delay: 0.4,
                                    }}
                                    className="h-2 w-2 bg-muted-foreground rounded-full"
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  please wait...
                                </span>
                              </div>
                            </motion.div>
                          )}

                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>

                      <ChatInput
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        onSendMessage={sendMessage}
                      />
                    </>
                  )}

                  {activeTab === "files" && (
                    <div className="p-4 h-full flex items-center justify-center">
                      <div className="text-center">
                        <Paperclip className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">
                          No files shared yet
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Share files with the AI assistant
                        </p>
                        <Button variant="outline" className="gap-2">
                          <Paperclip className="h-4 w-4" />
                          Upload File
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeTab === "settings" && (
                    <ScrollArea className="h-full p-4" data-lenis-prevent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-4">Chat Settings</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  Notification Sound
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Play sound for new messages
                                </p>
                              </div>
                              <Button
                                variant={
                                  notificationSound ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() =>
                                  setNotificationSound(!notificationSound)
                                }>
                                {notificationSound ? "On" : "Off"}
                              </Button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Dark Mode</p>
                                <p className="text-sm text-muted-foreground">
                                  Toggle dark theme
                                </p>
                              </div>
                              <Button
                                variant={darkMode ? "default" : "outline"}
                                size="sm"
                                onClick={() => setDarkMode(!darkMode)}>
                                {darkMode ? "On" : "Off"}
                              </Button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Response Speed</p>
                                <p className="text-sm text-muted-foreground">
                                  Powered by Gemini AI
                                </p>
                              </div>
                              <Badge variant="secondary" className="gap-1">
                                <Zap className="h-3 w-3" />
                                AI
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-6">
                          <h4 className="font-semibold mb-4">Actions</h4>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full justify-start gap-2"
                              onClick={() => {
                                const text = messages
                                  .map(
                                    (m) =>
                                      `${m.sender === "user" ? "You" : "Bot"}: ${m.content}`,
                                  )
                                  .join("\n\n");
                                navigator.clipboard.writeText(text);
                              }}>
                              <Copy className="h-4 w-4" />
                              Copy Chat History
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start gap-2"
                              onClick={() => {
                                setMessages(MESSAGES);
                                chatHistoryRef.current = [];
                              }}>
                              <Trash2 className="h-4 w-4" />
                              Clear Chat
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start gap-2"
                              onClick={() => {
                                const text = messages
                                  .map(
                                    (m) =>
                                      `${m.sender === "user" ? "You" : "Bot"}: ${m.content}`,
                                  )
                                  .join("\n\n");
                                const blob = new Blob([text], {
                                  type: "text/plain",
                                });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = "chat-history.txt";
                                a.click();
                                URL.revokeObjectURL(url);
                              }}>
                              <Download className="h-4 w-4" />
                              Export Chat
                            </Button>
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-6 text-center">
                          <p className="text-sm text-muted-foreground">
                            Md Rashedul Islam
                          </p>
                          <Button variant="link" size="sm">
                            Privacy Policy
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </div>
            )}

            {isMinimized && (
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-linear-to-br from-primary to-primary/70">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">AI Assistant</p>
                    <p className="text-xs text-muted-foreground">
                      {unreadCount > 0
                        ? `${unreadCount} new messages`
                        : "Click to expand"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Badge className="animate-pulse">{unreadCount}</Badge>
                  )}
                  <Button variant="ghost" size="icon" onClick={toggleChat}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RealTimeChatWidget;
