import type { Skill } from "@/data/skills";

interface GuidanceCardProps {
  skill: Skill;
}

function formatSkillName(skill: string) {
  return skill.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateQuestions(description: string): string[] {
  // Extract 3 key questions from description context
  const base = description.split(".")[0].replace(/^When the user wants to /i, "").trim();
  return [
    `What specific ${base.split(" ")[0] || "asset"} or page are you working on?`,
    `What are your current metrics or baseline data?`,
    `What is your primary goal or desired outcome?`,
  ];
}

function generateOutput(skill: string): string {
  const name = formatSkillName(skill);
  return `I will output: a detailed ${name} plan with actionable steps, prioritized recommendations, and measurable success criteria.`;
}

export function GuidanceCard({ skill }: GuidanceCardProps) {
  const displayName = formatSkillName(skill.skill);
  const questions = generateQuestions(skill.description);
  const output = generateOutput(skill.skill);

  return (
    <div className="rounded-xl border border-chip-active-border bg-chip-active/30 p-4">
      <p className="text-sm font-semibold text-foreground">
        You selected <span className="text-primary">{displayName}</span>
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
            <span className="shrink-0 font-medium text-foreground">{i + 1})</span>
            {q}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs italic text-muted-foreground">{output}</p>
    </div>
  );
}
