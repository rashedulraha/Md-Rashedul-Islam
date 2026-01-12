// ChatBubble.tsx
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bot,
  User,
  Clock,
  Check,
  CheckCheck,
  MoreVertical,
  Copy,
  Trash2,
  Volume2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

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

interface ChatBubbleProps {
  message: Message;
  onReaction: (messageId: string, type: "thumbsUp" | "thumbsDown") => void;
  onCopy: (content: string) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  onReaction,
  onCopy,
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      } mb-4`}>
      <div
        className={`flex max-w-[85%] ${
          message.sender === "user" ? "flex-row-reverse" : "flex-row"
        }`}>
        {/* Avatar */}
        <div
          className={`shrink-0 ${message.sender === "user" ? "ml-3" : "mr-3"}`}>
          <Avatar className="h-8 w-8 border-2 border-background shadow-md">
            {message.sender === "bot" ? (
              <>
                <AvatarImage src="/bot-avatar.png" />
                <AvatarFallback className="bg-linear-to-br from-primary to-primary/70">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </AvatarFallback>
              </>
            ) : (
              <>
                <AvatarImage src="/user-avatar.png" />
                <AvatarFallback className="bg-linear-to-br from-chart-1 to-chart-1/70">
                  <User className="h-4 w-4 text-primary-foreground" />
                </AvatarFallback>
              </>
            )}
          </Avatar>
        </div>

        {/* Message Content */}
        <div
          className={`space-y-1 ${
            message.sender === "user" ? "items-end" : "items-start"
          }`}>
          <div
            className={`rounded-2xl px-4 py-3 ${
              message.sender === "user"
                ? "bg-primary text-primary-foreground rounded-tr-none"
                : "bg-muted border border-border rounded-tl-none"
            } shadow-sm`}>
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>

          {/* Message Footer */}
          <div
            className={`flex items-center gap-3 text-xs text-muted-foreground ${
              message.sender === "user" ? "flex-row-reverse" : ""
            }`}>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(message.timestamp)}
            </span>

            {message.sender === "user" && (
              <span className="flex items-center">
                {message.read ? (
                  <CheckCheck className="h-3 w-3 text-primary" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
              </span>
            )}

            {/* Reactions */}
            {message.sender === "bot" && message.reactions && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onReaction(message.id, "thumbsUp")}>
                  <ThumbsUp className="h-3 w-3" />
                  {message.reactions.thumbsUp > 0 && (
                    <span className="ml-1">{message.reactions.thumbsUp}</span>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onReaction(message.id, "thumbsDown")}>
                  <ThumbsDown className="h-3 w-3" />
                  {message.reactions.thumbsDown > 0 && (
                    <span className="ml-1">{message.reactions.thumbsDown}</span>
                  )}
                </Button>
              </div>
            )}

            {/* Message Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={message.sender === "user" ? "end" : "start"}>
                <DropdownMenuItem onClick={() => onCopy(message.content)}>
                  <Copy className="h-3 w-3 mr-2" />
                  Copy
                </DropdownMenuItem>
                {message.sender === "user" && (
                  <DropdownMenuItem>
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Volume2 className="h-3 w-3 mr-2" />
                  Read aloud
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
