import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { PackChips, SkillsBar } from "./SkillChips";
import { skillPacks } from "@/data/skills";
import type { ChatMessage } from "@/types/chat";

interface ChatAreaProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  selectedPackIndex: number | null;
  onSelectPack: (index: number) => void;
  onDoubleClickPack: (index: number) => void;
  selectedSkill: string | null;
  onSelectSkill: (skill: string) => void;
  skillsExpanded: boolean;
  inputDraft: string;
  onInputDraftChange: (draft: string) => void;
}

export function ChatArea({
  messages,
  onSendMessage,
  selectedPackIndex,
  onSelectPack,
  onDoubleClickPack,
  selectedSkill,
  onSelectSkill,
  skillsExpanded,
  inputDraft,
  onInputDraftChange,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
  const showWelcome = !hasMessages;

  return (
    <div className="flex flex-1 flex-col bg-chat">
      {/* Messages or Welcome */}
      <div className="flex flex-1 overflow-y-auto scrollbar-thin">
        {showWelcome ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <PackChips
              onSelectPack={onSelectPack}
              onDoubleClickPack={onDoubleClickPack}
              selectedPackIndex={selectedPackIndex}
            />
          </div>
        ) : (
          <div className="mx-auto w-full max-w-2xl space-y-4 px-4 py-6">
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

      {/* Skills chips strip above composer */}
      {selectedPackIndex !== null && skillsExpanded && activePack && (
        <div className="mx-auto w-full max-w-2xl px-4 pb-1.5">
          <SkillsBar
            pack={activePack}
            selectedSkill={selectedSkill}
            onSelectSkill={onSelectSkill}
          />
        </div>
      )}

      {/* When has messages and no pack selected, show pack chips above composer */}
      {hasMessages && selectedPackIndex === null && (
        <div className="mx-auto w-full max-w-2xl px-4 pb-1.5">
          <PackChips
            onSelectPack={onSelectPack}
            onDoubleClickPack={onDoubleClickPack}
            selectedPackIndex={selectedPackIndex}
          />
        </div>
      )}

      {/* Composer */}
      <div className="mx-auto w-full max-w-2xl px-4 pb-4 pt-1">
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-end gap-2 p-2">
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
      </div>
    </div>
  );
}
