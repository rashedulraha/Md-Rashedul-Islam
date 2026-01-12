// ChatInput.tsx
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Smile, Mic } from "lucide-react";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
}) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-border/50 bg-linear-to-t from-background via-background to-transparent">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputMessage(e.target.value)
            }
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            className="min-h-10 max-h-32 resize-none pr-12 rounded-2xl border-border/50 focus:border-primary"
            rows={1}
          />

          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          onClick={onSendMessage}
          disabled={!inputMessage.trim()}
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 hover:shadow-lg transition-all">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
