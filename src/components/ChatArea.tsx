import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { PackChips, SkillsBar } from "./SkillChips";
import { SkillsModal } from "./SkillsModal";
import { skillPacks } from "@/data/skills";
import type { ChatMessage } from "@/types/chat";

interface ChatAreaProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  selectedPackIndex: number | null;
  onSelectPack: (index: number) => void;
  selectedSkill: string | null;
  onSelectSkill: (skill: string) => void;
  inputDraft: string;
  onInputDraftChange: (draft: string) => void;
}

export function ChatArea({
  messages,
  onSendMessage,
  selectedPackIndex,
  onSelectPack,
  selectedSkill,
  onSelectSkill,
  inputDraft,
  onInputDraftChange,
}: ChatAreaProps) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    const text = inputDraft.trim();
    if (!text) return;
    onSendMessage(text);
    onInputDraftChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = messages.length > 0;
  const activePack = selectedPackIndex !== null ? skillPacks[selectedPackIndex] : null;

  return (
    <div className="flex flex-1 flex-col bg-chat">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {!hasMessages && (
          <div className="flex h-full flex-col items-center justify-end pb-4">
            <PackChips onSelectPack={onSelectPack} selectedPackIndex={selectedPackIndex} />
          </div>
        )}
        {hasMessages && (
          <div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-chat-bubble-user text-chat-bubble-user-fg"
                      : "bg-chat-bubble-assistant text-chat-bubble-assistant-fg"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Skills bar */}
      <div className="mx-auto w-full max-w-2xl px-4">
        {hasMessages && !activePack && (
          <PackChips onSelectPack={onSelectPack} selectedPackIndex={selectedPackIndex} />
        )}
        {activePack && (
          <SkillsBar
            pack={activePack}
            selectedSkill={selectedSkill}
            onSelectSkill={onSelectSkill}
            onOpenAbout={() => setAboutOpen(true)}
          />
        )}
      </div>

      {/* Input */}
      <div className="mx-auto w-full max-w-2xl px-4 pb-4 pt-2">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm">
          <textarea
            value={inputDraft}
            onChange={(e) => onInputDraftChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputDraft.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {activePack && (
        <SkillsModal open={aboutOpen} onOpenChange={setAboutOpen} pack={activePack} />
      )}
    </div>
  );
}
