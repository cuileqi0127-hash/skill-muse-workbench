import { useRef, useEffect, useState } from "react";
import { Send, ImagePlus, Bot, ChevronDown } from "lucide-react";
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

const AI_MODELS = [
  { id: "claude-sonnet-4-5", label: "Claude Sonnet 4.5" },
  { id: "claude-opus-4", label: "Claude Opus 4" },
];

function ModelSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(AI_MODELS[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        title="Select AI Model"
      >
        <Bot className="h-4 w-4" />
        <span className="text-xs font-medium max-w-[100px] truncate">{selected.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-1 min-w-[180px] rounded-xl border border-border bg-card p-1 shadow-lg z-50">
          {AI_MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => { setSelected(m); setOpen(false); }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors ${
                selected.id === m.id ? "bg-accent text-accent-foreground font-medium" : "text-foreground hover:bg-muted/50"
              }`}
            >
              <Bot className="h-3.5 w-3.5" />
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendMessage(`[📎 Uploaded image: ${file.name}]`);
    }
    e.target.value = "";
  };

  const hasMessages = messages.length > 0;
  const activePack = selectedPackIndex !== null ? skillPacks[selectedPackIndex] : null;
  const showWelcome = !hasMessages;

  const composerBadge = (() => {
    if (selectedSkill) return formatSkillName(selectedSkill);
    if (activePack) return `${activePack.icon} ${activePack.name}`;
    return null;
  })();

  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Messages or Welcome */}
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
        {showWelcome ? (
          <div className="flex flex-col items-center justify-center w-full gap-6 py-8">
            <PackChips
              onSelectPack={onSelectPack}
              onDoubleClickPack={onDoubleClickPack}
              selectedPackIndex={selectedPackIndex}
            />

            {activePack && skillsExpanded && (
              <div className="w-full max-w-2xl px-4 flex-shrink-0">
                <div className="max-h-[400px] overflow-y-auto rounded-2xl bg-card shadow-[0_2px_16px_-4px_hsl(var(--foreground)/0.08)] scrollbar-thin">
                  <div className="sticky top-0 z-10 flex items-center justify-between bg-card px-5 py-3.5 border-b border-border/30 rounded-t-2xl">
                    <span className="text-[15px] font-semibold text-foreground">Available Skills</span>
                    <span className="text-xs text-muted-foreground">{activePack.skills.length} skills</span>
                  </div>
                  <div className="flex flex-col gap-1 p-2">
                    {activePack.skills.map((s) => {
                      const isActive = selectedSkill === s.skill;
                      return (
                        <button
                          key={s.skill}
                          onClick={() => onSelectSkill(s.skill)}
                          className={`flex w-full flex-col gap-1.5 rounded-xl px-4 py-3 text-left transition-all duration-150 ${
                            isActive
                              ? "bg-accent border-l-[3px] border-l-primary shadow-sm"
                              : "hover:bg-muted/50 border-l-[3px] border-l-transparent"
                          }`}
                        >
                          <span
                            className={`text-[15px] font-semibold leading-snug ${
                              isActive ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {formatSkillName(s.skill)}
                          </span>
                          <span className="text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
                            {s.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-thin w-full">
            <div className="mx-auto w-full max-w-2xl space-y-4 px-4 py-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
                      <Bot className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
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

      {/* Skills chips strip above composer */}
      {!showWelcome && selectedPackIndex !== null && skillsExpanded && activePack && (
        <div className="mx-auto w-full max-w-2xl px-4 pb-1.5">
          <SkillsBar
            pack={activePack}
            selectedSkill={selectedSkill}
            onSelectSkill={onSelectSkill}
          />
        </div>
      )}

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
          {composerBadge && (
            <div className="px-3 pt-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-chip-active-border bg-chip-active px-2.5 py-0.5 text-[11px] font-medium text-chip-active-foreground">
                {composerBadge}
              </span>
            </div>
          )}
          <div className="flex items-end gap-1.5 p-2">
            {/* AI Agent model selector */}
            <ModelSelector />

            <textarea
              value={inputDraft}
              onChange={(e) => onInputDraftChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Image upload button */}
            <button
              onClick={handleImageUpload}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              title="Upload image"
            >
              <ImagePlus className="h-4 w-4" />
            </button>

            {/* Send button */}
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
