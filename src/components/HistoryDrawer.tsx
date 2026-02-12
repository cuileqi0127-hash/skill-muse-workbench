import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MessageSquare } from "lucide-react";
import type { Session } from "@/types/chat";

interface HistoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessions: Session[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
}

export function HistoryDrawer({ open, onOpenChange, sessions, currentSessionId, onSelectSession }: HistoryDrawerProps) {
  const sortedSessions = [...sessions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 bg-card">
        <SheetHeader>
          <SheetTitle className="text-foreground">Chat History</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-1">
          {sortedSessions.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">No sessions yet</p>
          )}
          {sortedSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => { onSelectSession(session.id); onOpenChange(false); }}
              className={`flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                session.id === currentSessionId
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{session.title}</p>
                <p className="text-xs text-muted-foreground">
                  {session.messages.length} messages · {session.createdAt.toLocaleDateString()}
                </p>
              </div>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
