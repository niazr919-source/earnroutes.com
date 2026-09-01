import { Info, TriangleAlert, Lightbulb, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "action";

const CONFIG: Record<CalloutType, { icon: typeof Info; label: string; classes: string }> = {
  info: {
    icon: Info,
    label: "Good to Know",
    classes: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100",
  },
  warning: {
    icon: TriangleAlert,
    label: "Warning",
    classes:
      "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100",
  },
  tip: {
    icon: Lightbulb,
    label: "Pro Tip",
    classes:
      "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
  },
  action: {
    icon: CircleCheck,
    label: "Action Step",
    classes:
      "border-violet-200 bg-violet-50 text-violet-900 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-100",
  },
};

export function CalloutBox({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, label, classes } = CONFIG[type];
  return (
    <div className={`not-prose flex gap-3 rounded-xl border p-4 my-6 ${classes}`}>
      <Icon className="h-5 w-5 shrink-0 mt-0.5" strokeWidth={2.25} />
      <div className="text-sm leading-relaxed">
        <p className="font-semibold mb-1">{title ?? label}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}
