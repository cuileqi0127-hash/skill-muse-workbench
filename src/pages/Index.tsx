import { useState, useCallback } from "react";
import { FloatingToolbar } from "@/components/FloatingToolbar";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { ChatArea } from "@/components/ChatArea";
import { FilesPanel } from "@/components/FilesPanel";
import { FileEditor } from "@/components/FileEditor";
import { UserBadge } from "@/components/UserBadge";
import { LoginPage } from "@/components/LoginPage";
import { useAuth } from "@/contexts/AuthContext";
import { skillPacks } from "@/data/skills";
import type { ChatMessage, Session } from "@/types/chat";

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

// Mock file contents
const fileContents: Record<string, string> = {
  "analytics-report.md": "# Analytics Report\n\n## Overview\nMonthly traffic: 45,000 sessions\nConversion rate: 3.2%\n\n## Key Findings\n- Organic search grew 15% MoM\n- Bounce rate decreased to 42%\n- Top landing page: /pricing\n\n## Recommendations\n1. Optimize mobile experience\n2. Add more CTAs to blog posts\n3. Improve page load speed",
  "seo-audit-results.json": '{\n  "score": 78,\n  "issues": [\n    { "type": "warning", "message": "Missing meta descriptions on 12 pages" },\n    { "type": "error", "message": "Broken internal links: 3 found" },\n    { "type": "info", "message": "Core Web Vitals: LCP 2.4s, FID 80ms, CLS 0.1" }\n  ],\n  "recommendations": [\n    "Add structured data to product pages",\n    "Fix canonical URL issues",\n    "Improve image alt text coverage"\n  ]\n}',
  "ad-copy-drafts.txt": "Draft 1 — Google Search Ad\nHeadline: Boost Your Marketing ROI | AI-Powered Analytics\nDescription: Get actionable insights in minutes. Start your free trial today.\n\nDraft 2 — Facebook Ad\nHeadline: Stop Guessing, Start Growing\nDescription: Our platform helps 10,000+ marketers make data-driven decisions.\n\nDraft 3 — LinkedIn Ad\nHeadline: Marketing Intelligence for B2B Teams\nDescription: Enterprise-grade analytics without the enterprise price tag.",
};

const Index = () => {
  const { isLoggedIn } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([createSession()]);
  const [currentSessionId, setCurrentSessionId] = useState(sessions[0].id);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [inputDraft, setInputDraft] = useState("");
  const [openFile, setOpenFile] = useState<{ name: string; content: string } | null>(null);

  if (!isLoggedIn) return <LoginPage />;

  const currentSession = sessions.find((s) => s.id === currentSessionId)!;

  const updateSession = (updater: (s: Session) => Session) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === currentSessionId ? updater(s) : s))
    );
  };

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

  const handleSelectPack = (index: number) => {
    updateSession((s) => {
      if (s.selectedPackIndex === index) {
        return { ...s, selectedPackIndex: null, selectedSkill: null, skillsExpanded: false };
      }
      return { ...s, selectedPackIndex: index, skillsExpanded: true };
    });
  };

  const handleDoubleClickPack = (index: number) => {
    updateSession((s) => ({
      ...s,
      selectedPackIndex: index,
      skillsExpanded: !s.skillsExpanded,
    }));
  };

  const handleSelectSkill = (skill: string) => {
    const pack = currentSession.selectedPackIndex !== null
      ? skillPacks[currentSession.selectedPackIndex]
      : null;
    if (!pack) return;

    if (currentSession.selectedSkill === skill) {
      updateSession((s) => ({ ...s, selectedSkill: null }));
      setInputDraft("");
      return;
    }

    const skillData = pack.skills.find((s) => s.skill === skill);
    if (!skillData) return;

    updateSession((s) => ({ ...s, selectedSkill: skill }));
    setInputDraft(skillData.input_draft);
  };

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

  const handleOpenFile = (file: { name: string; type: string }) => {
    const content = fileContents[file.name] || `// ${file.name}\n// 文件内容为空`;
    setOpenFile({ name: file.name, content });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <UserBadge />

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
        {openFile ? (
          <FileEditor
            fileName={openFile.name}
            initialContent={openFile.content}
            onClose={() => setOpenFile(null)}
            onSave={(content) => {
              fileContents[openFile.name] = content;
            }}
          />
        ) : (
          <ChatArea
            messages={currentSession.messages}
            onSendMessage={handleSendMessage}
            selectedPackIndex={currentSession.selectedPackIndex}
            onSelectPack={handleSelectPack}
            onDoubleClickPack={handleDoubleClickPack}
            selectedSkill={currentSession.selectedSkill}
            onSelectSkill={handleSelectSkill}
            skillsExpanded={currentSession.skillsExpanded}
            inputDraft={inputDraft}
            onInputDraftChange={setInputDraft}
          />
        )}

        <div className="hidden lg:block">
          <FilesPanel onOpenFile={handleOpenFile} />
        </div>
      </div>
    </div>
  );
};

export default Index;
