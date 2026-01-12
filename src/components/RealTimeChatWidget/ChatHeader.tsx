// ChatHeader.tsx
import React from "react";
import Rashed from "../../assets/rashedul.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bot,
  Sparkles,
  Bell,
  Settings,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";

interface ChatHeaderProps {
  online: boolean;
  isMinimized: boolean;
  notificationSound: boolean;
  onToggleMinimize: () => void;
  onToggleNotification: () => void;
  onOpenSettings: () => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  online,
  isMinimized,
  notificationSound,
  onToggleMinimize,
  onToggleNotification,
  onOpenSettings,
  onClose,
}) => {
  return (
    <div className="bg-primary/5 p-4 border-b border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-background shadow-md">
              <AvatarImage src={Rashed} />
              <AvatarFallback className="bg-linear-to-br from-primary to-primary/70">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </AvatarFallback>
            </Avatar>

            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                online ? "bg-green-500" : "bg-muted-foreground"
              }`}
            />
          </div>
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              Rashedul
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                PRO
              </Badge>
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {online ? (
                <>Ready to help</>
              ) : (
                <>
                  <span className="h-2 w-2 bg-muted-foreground rounded-full" />
                  Offline • Will respond later
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleMinimize}
                  className="h-8 w-8">
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMinimized ? "Maximize" : "Minimize"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleNotification}
                  className="h-8 w-8">
                  <Bell
                    className={`h-4 w-4 ${
                      notificationSound ? "text-primary" : ""
                    }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {notificationSound
                    ? "Mute notifications"
                    : "Unmute notifications"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenSettings}
                  className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
