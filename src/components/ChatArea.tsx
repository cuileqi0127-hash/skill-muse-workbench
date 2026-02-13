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

function formatSkillName(skill: string) {
  return skill.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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

  // Composer badge label
  const composerBadge = (() => {
    if (selectedSkill) return formatSkillName(selectedSkill);
    if (activePack) return `${activePack.icon} ${activePack.name}`;
    return null;
  })();

  return (
    <div className="flex flex-1 flex-col bg-chat">
      {/* Messages or Welcome */}
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
        {showWelcome ? (
          <div className="flex flex-col items-center justify-center w-full gap-6 py-8">
            {/* Pack chips */}
            <PackChips
              onSelectPack={onSelectPack}
              onDoubleClickPack={onDoubleClickPack}
              selectedPackIndex={selectedPackIndex}
            />

            {/* Skills list panel - compact fixed height card */}
            {activePack && skillsExpanded && (
              <div className="w-full max-w-2xl px-4 flex-shrink-0">
                <div className="max-h-80 overflow-y-auto rounded-xl border border-border bg-card scrollbar-thin">
                  <div className="sticky top-0 z-10 flex items-center justify-between bg-card px-4 py-2.5 border-b border-border">
                    <span className="text-sm font-semibold text-foreground">Available Skills</span>
                    <span className="text-xs text-muted-foreground">{activePack.skills.length} skills</span>
                  </div>
                  {activePack.skills.map((s, idx) => {
                    const isActive = selectedSkill === s.skill;
                    return (
                      <button
                        key={s.skill}
                        onClick={() => onSelectSkill(s.skill)}
                        className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors ${
                          idx < activePack.skills.length - 1 ? "border-b border-border/40" : ""
                        } ${
                          isActive
                            ? "bg-primary/8 border-l-2 border-l-primary"
                            : "hover:bg-muted/40"
                        }`}
                      >
                        <span
                          className={`text-sm font-semibold ${
                            isActive ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {formatSkillName(s.skill)}
                        </span>
                        <span className="text-xs leading-snug text-muted-foreground line-clamp-2">
                          {s.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-thin">
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
          </div>
        )}
      </div>

      {/* Skills chips strip above composer - only show when has messages */}
      {!showWelcome && selectedPackIndex !== null && skillsExpanded && activePack && (
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
          {/* Skill badge */}
          {composerBadge && (
            <div className="px-3 pt-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-chip-active-border bg-chip-active px-2.5 py-0.5 text-[11px] font-medium text-chip-active-foreground">
                {composerBadge}
              </span>
            </div>
          )}
          {/* Input row */}
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
