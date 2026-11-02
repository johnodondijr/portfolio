import { toolIcons } from "@/toolIcons";

export function ToolIcon({ name }: { name: string }) {
  const icon = toolIcons[name];
  return (
    <span className="tool__icon" aria-hidden="true">
      {icon ? (
        <svg viewBox="0 0 24 24" fill={icon.color}>
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="tool__monogram">{name.charAt(0)}</span>
      )}
    </span>
  );
}
