import Image from "next/image";

// Shows the project's cover image, or a tinted placeholder until one is uploaded.
export function Cover({ src, title, priority }: { src: string | null; title: string; priority?: boolean }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={title}
        fill
        priority={priority}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    );
  }
  const hue = [...title].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 0);
  return (
    <div
      className="absolute inset-0 flex items-end p-6"
      style={{ background: `hsl(${hue} 30% 88%)`, color: `hsl(${hue} 35% 30%)` }}
    >
      <span className="text-sm font-medium tracking-wide uppercase">{title}</span>
    </div>
  );
}
