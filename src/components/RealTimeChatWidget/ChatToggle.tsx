// ChatToggle.tsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircle } from "lucide-react";

interface ChatToggleProps {
  unreadCount: number;
  online: boolean;
  onToggle: () => void;
}

export const ChatToggle: React.FC<ChatToggleProps> = ({
  unreadCount,
  online,
  onToggle,
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onToggle}
              className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 hover:shadow-3xl transition-all relative group">
              <MessageCircle className="h-6 w-6" />

              {/* Notification Badge */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}

              {/* Online Status */}
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                  online ? "bg-green-500" : "bg-muted-foreground"
                }`}
              />

              {/* Pulsing Effect */}
              {online && (
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Chat with AI Assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};
