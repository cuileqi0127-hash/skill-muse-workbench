import { Plus, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FloatingToolbarProps {
  onNewSession: () => void;
  onOpenHistory: () => void;
}

export function FloatingToolbar({ onNewSession, onOpenHistory }: FloatingToolbarProps) {
  return (
    <div className="fixed left-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 rounded-xl border border-border bg-card p-1.5 shadow-md">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onNewSession}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:brightness-110"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="text-xs">New Session</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onOpenHistory}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <Clock className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="text-xs">History</TooltipContent>
      </Tooltip>
    </div>
  );
}
