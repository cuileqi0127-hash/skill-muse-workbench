import { Plus, History } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FloatingToolbarProps {
  onNewSession: () => void;
  onOpenHistory: () => void;
}

export function FloatingToolbar({ onNewSession, onOpenHistory }: FloatingToolbarProps) {
  return (
    <div className="fixed left-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 rounded-2xl bg-toolbar p-2 shadow-lg">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onNewSession}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:opacity-90"
          >
            <Plus className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">New Session</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onOpenHistory}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-toolbar-foreground transition-colors hover:bg-toolbar-hover"
          >
            <History className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">History</TooltipContent>
      </Tooltip>
    </div>
  );
}
