import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { SkillPack } from "@/data/skills";

interface SkillsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pack: SkillPack;
}

export function SkillsModal({ open, onOpenChange, pack }: SkillsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span>{pack.icon}</span> {pack.name}
          </DialogTitle>
          <DialogDescription>
            A collection of marketing workflow skills covering experiments, SEO, growth, conversion, content, and advertising tasks.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          {pack.skills.map((s) => (
            <div key={s.skill} className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-sm font-semibold text-foreground">
                {s.skill.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
