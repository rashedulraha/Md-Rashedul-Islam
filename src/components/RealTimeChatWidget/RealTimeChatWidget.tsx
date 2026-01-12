import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Zap, Copy, Trash2, Download, Paperclip, X } from "lucide-react";
import { useLenis } from "@/Hooks/useLenis";

// Import components
import { ChatBubble } from "./ChatBubble";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatToggle } from "./ChatToggle";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  read: boolean;
  reactions?: {
    thumbsUp: number;
    thumbsDown: number;
  };
}

interface QuickReply {
  id: string;
  text: string;
  emoji: string;
}

const MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 3600000),
    read: true,
    reactions: { thumbsUp: 3, thumbsDown: 0 },
  },
  {
    id: "2",
    content: "I need help with my project setup",
    sender: "user",
    timestamp: new Date(Date.now() - 3500000),
    read: true,
  },
  {
    id: "3",
    content:
      "Sure! I can help you with that. What specific issues are you facing?",
    sender: "bot",
    timestamp: new Date(Date.now() - 3400000),
    read: true,
  },
];

const QUICK_REPLIES: QuickReply[] = [
  { id: "qr1", text: "Need project help", emoji: "💻" },
  { id: "qr2", text: "Technical support", emoji: "🔧" },
  { id: "qr3", text: "Schedule a call", emoji: "📅" },
  { id: "qr4", text: "See portfolio", emoji: "🎨" },
  { id: "qr5", text: "Pricing info", emoji: "💰" },
  { id: "qr6", text: "Other questions", emoji: "❓" },
];

const BOT_RESPONSES = [
  "I'm analyzing your request...",
  "Let me check that for you...",
  "Based on your query, I recommend...",
  "Here's what I found:",
  "Would you like more details?",
];

const RealTimeChatWidget = () => {
  // Initialize Lenis for smooth scrolling
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
    "chat"
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate bot typing
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        sendBotResponse();
      }, 1500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping]);

  // Simulate online status
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
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);
  };

  const sendBotResponse = () => {
    const randomResponse =
      BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
    const botMessage: Message = {
      id: Date.now().toString(),
      content: randomResponse,
      sender: "bot",
      timestamp: new Date(),
      read: false,
      reactions: { thumbsUp: 0, thumbsDown: 0 },
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);

    // Play notification sound
    if (notificationSound && isOpen) {
      playNotificationSound();
    }

    // Increase unread count if minimized
    if (isMinimized) {
      setUnreadCount((prev) => prev + 1);
    }
  };

  const playNotificationSound = () => {
    // Simple notification sound using Web Audio API
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
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("Audio context not supported");
    }
  };

  const handleQuickReply = (reply: QuickReply) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: reply.text,
      sender: "user",
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
  };

  const handleReaction = (
    messageId: string,
    type: "thumbsUp" | "thumbsDown"
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
      })
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
      {/* Chat Toggle Button */}
      <ChatToggle
        unreadCount={unreadCount}
        online={online}
        onToggle={toggleChat}
      />

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
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
            } rounded-2xl shadow-2xl border border-border overflow-hidden bg-background`}>
            {/* Header */}
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

            {/* Chat Content - Only show when not minimized */}
            {!isMinimized && (
              <>
                {/* Tabs */}
                <div className="border-b border-border/50">
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

                {/* Messages Area */}
                {activeTab === "chat" && (
                  <>
                    <ScrollArea className="h-96 px-4 py-4" data-lenis-prevent>
                      <div className="space-y-4">
                        {/* Welcome Message */}
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

                        {/* Messages */}
                        {messages.map((message) => (
                          <ChatBubble
                            key={message.id}
                            message={message}
                            onReaction={handleReaction}
                            onCopy={copyMessage}
                          />
                        ))}

                        {/* Typing Indicator */}
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

                    {/* Quick Replies */}
                    <div className="px-4 py-3 border-t border-border/50 ">
                      <ScrollArea className="h-20" data-lenis-prevent>
                        <div className="flex gap-2 pb-2">
                          {QUICK_REPLIES.map((reply) => (
                            <Button
                              key={reply.id}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickReply(reply)}
                              className="rounded-full gap-2 whitespace-nowrap">
                              <span>{reply.emoji}</span>
                              {reply.text}
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Input Area */}
                    <ChatInput
                      inputMessage={inputMessage}
                      setInputMessage={setInputMessage}
                      onSendMessage={sendMessage}
                    />
                  </>
                )}

                {/* Files Tab */}
                {activeTab === "files" && (
                  <div className="p-4 h-96">
                    <div className="text-center py-12">
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

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <ScrollArea className="h-96 p-4" data-lenis-prevent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-4">Chat Settings</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Notification Sound</p>
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
                              <p className="font-medium"> Response Speed</p>
                              <p className="text-sm text-muted-foreground">
                                Fast responses
                              </p>
                            </div>
                            <Badge variant="secondary" className="gap-1">
                              <Zap className="h-3 w-3" />
                              Fast
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border/50 pt-6">
                        <h4 className="font-semibold mb-4">Actions</h4>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2">
                            <Copy className="h-4 w-4" />
                            Copy Chat History
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2">
                            <Trash2 className="h-4 w-4" />
                            Clear Chat
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2">
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
              </>
            )}

            {/* Minimized View */}
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
