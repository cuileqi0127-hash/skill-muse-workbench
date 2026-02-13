import { useState, useRef, useCallback } from "react";
import { skillPacks, type SkillPack } from "@/data/skills";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PackChipsProps {
  onSelectPack: (index: number) => void;
  onDoubleClickPack: (index: number) => void;
  selectedPackIndex: number | null;
}

export function PackChips({ onSelectPack, onDoubleClickPack, selectedPackIndex }: PackChipsProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-muted-foreground">Try these Skills</p>
      <div className="flex flex-col items-center gap-2.5">
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
      </div>
    </div>
  );
}

interface SkillsBarProps {
  pack: SkillPack;
  selectedSkill: string | null;
  onSelectSkill: (skill: string) => void;
}

export function SkillsBar({ pack, selectedSkill, onSelectSkill }: SkillsBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-1.5">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={updateArrows}
        onMouseEnter={updateArrows}
        className="flex flex-1 gap-1.5 overflow-x-auto overflow-y-hidden scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {pack.skills.map((s) => (
          <button
            key={s.skill}
            onClick={() => onSelectSkill(s.skill)}
            className={`flex-none whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              selectedSkill === s.skill
                ? "border-chip-active-border bg-chip-active text-chip-active-foreground"
                : "border-chip-border bg-chip text-chip-foreground hover:border-primary/30 hover:bg-accent"
            }`}
          >
            {s.skill.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}