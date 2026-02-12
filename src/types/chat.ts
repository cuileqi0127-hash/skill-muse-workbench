export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Session {
  id: string;
  title: string;
  messages: ChatMessage[];
  selectedPackIndex: number | null;
  selectedSkill: string | null;
  skillsExpanded: boolean;
  createdAt: Date;
}
