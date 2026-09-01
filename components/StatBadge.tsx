import { DynamicIcon } from "./DynamicIcon";

type Tone = "slate" | "emerald" | "blue" | "amber" | "violet";

const TONE_CLASSES: Record<Tone, string> = {
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  violet: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
};

export function StatBadge({
  icon,
  label,
  value,
  tone = "slate",
}: {
  icon: string;
  label: string;
  value: string;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${TONE_CLASSES[tone]}`}
      title={label}
    >
      <DynamicIcon name={icon} className="h-3.5 w-3.5" strokeWidth={2.25} />
      <span className="sr-only">{label}:</span>
      {value}
    </span>
  );
}

export function skillLevelTone(level: string): Tone {
  if (level === "Beginner") return "emerald";
  if (level === "Intermediate") return "amber";
  return "violet";
}
