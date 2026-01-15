import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import type { QuickReply } from "./Types";

interface QuickRepliesProps {
  quickReplies: QuickReply[];
  onQuickReply: (reply: QuickReply) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({
  quickReplies,
  onQuickReply,
}) => {
  return (
    <div className="px-4 py-3 border-t border-border/50 shrink-0">
      <ScrollArea className="h-20" data-lenis-prevent>
        <div className="flex gap-2 pb-2">
          {quickReplies.map((reply) => (
            <Button
              key={reply.id}
              variant="outline"
              size="sm"
              onClick={() => onQuickReply(reply)}
              className="rounded-full gap-2 whitespace-nowrap">
              <span>{reply.emoji}</span>
              {reply.text}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
