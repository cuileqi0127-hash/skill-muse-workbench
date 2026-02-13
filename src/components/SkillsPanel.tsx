import type { SkillPack } from "@/data/skills";

interface SkillsPanelProps {
  pack: SkillPack;
  selectedSkill: string | null;
  onSelectSkill: (skill: string) => void;
}

function formatSkillName(skill: string) {
  return skill.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SkillsPanel({ pack, selectedSkill, onSelectSkill }: SkillsPanelProps) {
  return (
    <div className="flex h-full w-80 flex-col border-l border-border bg-files">
      {/* Header */}
      <div className="border-b border-border bg-files-header px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">
          {pack.icon} {pack.name}
        </h2>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {pack.skills.length} skills available
        </p>
      </div>

      {/* Scrollable skill list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {pack.skills.map((s) => {
          const isActive = selectedSkill === s.skill;
          return (
            <button
              key={s.skill}
              onClick={() => onSelectSkill(s.skill)}
              className={`flex w-full flex-col gap-1.5 border-b border-border px-4 py-3 text-left transition-colors ${
                isActive
                  ? "bg-chip-active/30 border-l-2 border-l-primary"
                  : "hover:bg-muted"
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
              >
                {formatSkillName(s.skill)}
              </span>
              <span className="text-[11px] leading-relaxed text-muted-foreground">
                {s.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
