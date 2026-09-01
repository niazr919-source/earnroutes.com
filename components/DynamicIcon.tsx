import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconMap = Record<string, React.ComponentType<LucideProps>>;

export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const icons = LucideIcons as unknown as IconMap;
  const Icon = icons[name] ?? LucideIcons.Circle;
  return <Icon {...props} />;
}
