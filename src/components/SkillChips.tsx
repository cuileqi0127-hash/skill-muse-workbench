import { skillPacks, type SkillPack } from "@/data/skills";
import { Info } from "lucide-react";

interface PackChipsProps {
  onSelectPack: (index: number) => void;
  onDoubleClickPack: (index: number) => void;
  selectedPackIndex: number | null;
  onOpenAbout: () => void;
}

export function PackChips({ onSelectPack, onDoubleClickPack, selectedPackIndex, onOpenAbout }: PackChipsProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-muted-foreground">Try these Skills</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {skillPacks.map((pack, i) => (
          <button
            key={pack.name}
            onClick={() => onSelectPack(i)}
            onDoubleClick={() => onDoubleClickPack(i)}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
              selectedPackIndex === i
                ? "border-chip-active-border bg-chip-active text-chip-active-foreground shadow-sm"
                : "border-chip-border bg-chip text-chip-foreground hover:border-primary/30 hover:bg-accent"
            }`}
          >
            <span>{pack.icon}</span>
            <span>{pack.name}</span>
          </button>
        ))}
        <button
          onClick={onOpenAbout}
          className="inline-flex items-center gap-1 rounded-full border border-chip-border bg-chip px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-accent"
        >
          <Info className="h-3.5 w-3.5" />
          All Skills
        </button>
      </div>
    </div>
  );
}

interface SkillsBarProps {
  pack: SkillPack;
  selectedSkill: string | null;
  onSelectSkill: (skill: string) => void;
  onOpenAbout: () => void;
}

export function SkillsBar({ pack, selectedSkill, onSelectSkill, onOpenAbout }: SkillsBarProps) {
  return (
    <div className="flex items-start gap-2 pb-2">
      <div className="flex flex-1 flex-wrap gap-1.5">
        {pack.skills.map((s) => (
          <button
            key={s.skill}
            onClick={() => onSelectSkill(s.skill)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              selectedSkill === s.skill
                ? "border-chip-active-border bg-chip-active text-chip-active-foreground"
                : "border-chip-border bg-chip text-chip-foreground hover:border-primary/30 hover:bg-accent"
            }`}
          >
            {s.skill.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>
      <button
        onClick={onOpenAbout}
        className="ml-1 flex shrink-0 items-center gap-1 rounded-full border border-chip-border bg-chip px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-accent"
      >
        <Info className="h-3.5 w-3.5" />
        All Skills
      </button>
    </div>
  );
}
