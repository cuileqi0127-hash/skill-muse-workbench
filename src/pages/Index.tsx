import { useState, useCallback } from "react";
import { FloatingToolbar } from "@/components/FloatingToolbar";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { ChatArea } from "@/components/ChatArea";
import { FilesPanel } from "@/components/FilesPanel";
import { skillPacks } from "@/data/skills";
import type { ChatMessage, Session } from "@/types/chat";
import type { Skill } from "@/data/skills";

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function createSession(): Session {
  return {
    id: createId(),
    title: "New Session",
    messages: [],
    selectedPackIndex: null,
    selectedSkill: null,
    skillsExpanded: false,
    createdAt: new Date(),
  };
}

const Index = () => {
  const [sessions, setSessions] = useState<Session[]>([createSession()]);
  const [currentSessionId, setCurrentSessionId] = useState(sessions[0].id);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [inputDraft, setInputDraft] = useState("");

  const currentSession = sessions.find((s) => s.id === currentSessionId)!;

  const updateSession = useCallback(
    (updater: (s: Session) => Session) => {
      setSessions((prev) =>
        prev.map((s) => (s.id === currentSessionId ? updater(s) : s))
      );
    },
    [currentSessionId]
  );

  const handleNewSession = () => {
    const newSession = createSession();
    setSessions((prev) => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
    setInputDraft("");
  };

  const handleSelectSession = (id: string) => {
    setCurrentSessionId(id);
    setInputDraft("");
  };

  // Single click: select/deselect pack (no expand)
  const handleSelectPack = (index: number) => {
    updateSession((s) => ({
      ...s,
      selectedPackIndex: s.selectedPackIndex === index ? null : index,
      selectedSkill: s.selectedPackIndex === index ? null : s.selectedSkill,
      skillsExpanded: s.selectedPackIndex === index ? false : s.skillsExpanded,
    }));
  };

  // Double click: expand skills panel
  const handleDoubleClickPack = (index: number) => {
    updateSession((s) => ({
      ...s,
      selectedPackIndex: index,
      skillsExpanded: true,
    }));
  };

  // Click skill: update guidance card + prefill draft (no chat message)
  const handleSelectSkill = (skill: string) => {
    const pack = currentSession.selectedPackIndex !== null
      ? skillPacks[currentSession.selectedPackIndex]
      : null;
    if (!pack) return;

    const skillData = pack.skills.find((s) => s.skill === skill);
    if (!skillData) return;

    updateSession((s) => ({
      ...s,
      selectedSkill: skill,
    }));

    setInputDraft(skillData.input_draft);
  };

  // Get active skill data for guidance card
  const activeSkillData: Skill | null = (() => {
    if (!currentSession.selectedSkill || currentSession.selectedPackIndex === null) return null;
    const pack = skillPacks[currentSession.selectedPackIndex];
    return pack?.skills.find((s) => s.skill === currentSession.selectedSkill) ?? null;
  })();

  const handleSendMessage = (content: string) => {
    const userMsg: ChatMessage = {
      id: createId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    const assistantMsg: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: "Thanks for the details! Let me analyze this and put together a comprehensive plan for you. I'll break it down into actionable steps.",
      timestamp: new Date(),
    };

    updateSession((s) => {
      const title = s.messages.length === 0
        ? content.slice(0, 40) + (content.length > 40 ? "..." : "")
        : s.title;
      return { ...s, messages: [...s.messages, userMsg, assistantMsg], title };
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <FloatingToolbar
        onNewSession={handleNewSession}
        onOpenHistory={() => setHistoryOpen(true)}
      />

      <HistoryDrawer
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
      />

      <div className="flex flex-1 pl-14">
        <ChatArea
          messages={currentSession.messages}
          onSendMessage={handleSendMessage}
          selectedPackIndex={currentSession.selectedPackIndex}
          onSelectPack={handleSelectPack}
          onDoubleClickPack={handleDoubleClickPack}
          selectedSkill={currentSession.selectedSkill}
          onSelectSkill={handleSelectSkill}
          skillsExpanded={currentSession.skillsExpanded}
          activeSkillData={activeSkillData}
          inputDraft={inputDraft}
          onInputDraftChange={setInputDraft}
        />

        <div className="hidden lg:block">
          <FilesPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
