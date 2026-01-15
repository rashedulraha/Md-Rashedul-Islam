export interface Message {
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

export interface QuickReply {
  id: string;
  text: string;
  emoji: string;
}
