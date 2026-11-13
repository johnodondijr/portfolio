import { toolIcons } from "@/toolIcons";

// Full-colour app icons for the hero. The Simple Icons Adobe marks are a rounded tile with
// the letters cut out, so painting the tile in the dark brand colour over a light square
// lets the letters show in the light brand colour, as on the real app icons.
const adobe: Record<string, { tile: string; letters: string }> = {
  "Adobe Photoshop": { tile: "#001E36", letters: "#31A8FF" },
  "Adobe Illustrator": { tile: "#330000", letters: "#FF9A00" },
  "After Effects": { tile: "#00005B", letters: "#9999FF" },
  InDesign: { tile: "#49021F", letters: "#FF3366" },
};

function Figma() {
  return (
    <svg viewBox="0 0 38 57" className="app-icon__svg app-icon__svg--figma">
      <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}

function Canva() {
  return (
    <svg viewBox="0 0 24 24" className="app-icon__svg">
      <defs>
        <linearGradient id="canva-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00C4CC" />
          <stop offset="0.5" stopColor="#5A32FA" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11.4" fill="#fff" />
      <path fill="url(#canva-gradient)" d={toolIcons.Canva.path} />
    </svg>
  );
}

// ChatGPT's app icon: the black OpenAI knot on a white rounded tile.
function ChatGPT() {
  return (
    <svg viewBox="0 0 24 24" className="app-icon__svg">
      <rect width="24" height="24" rx="5.4" fill="#fff" />
      <path fill="#000" transform="translate(4.2 4.2) scale(.65)" d={toolIcons.ChatGPT.path} />
    </svg>
  );
}

function Gemini() {
  return (
    <svg viewBox="0 0 24 24" className="app-icon__svg">
      <defs>
        <linearGradient id="gemini-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4796E3" />
          <stop offset="0.55" stopColor="#9177C7" />
          <stop offset="1" stopColor="#CA6673" />
        </linearGradient>
      </defs>
      <path fill="url(#gemini-gradient)" d={toolIcons.Gemini.path} />
    </svg>
  );
}

function Claude() {
  return (
    <svg viewBox="0 0 24 24" className="app-icon__svg">
      <path fill="#D97757" d={toolIcons.Claude.path} />
    </svg>
  );
}

// Higgsfield's app icon: the black squiggle on its lime rounded tile.
function Higgsfield() {
  return (
    <svg viewBox="0 0 24 24" className="app-icon__svg">
      <rect width="24" height="24" rx="5.4" fill="#D1FE17" />
      <path fill="#111" d={toolIcons.Higgsfield.path} />
    </svg>
  );
}

const custom: Record<string, () => React.ReactElement> = { Figma, Canva, ChatGPT, Gemini, Claude, Higgsfield };

export const hasAppIcon = (name: string) => name in custom || name in adobe;

export function AppIcon({ name }: { name: string }) {
  const Custom = custom[name];
  if (Custom) return <Custom />;
  const colors = adobe[name];
  const icon = toolIcons[name];
  if (!colors || !icon) return null;
  return (
    <svg viewBox="0 0 24 24" className="app-icon__svg">
      <rect x="1.2" y="1.2" width="21.6" height="21.6" rx="3.6" fill={colors.letters} />
      <path fill={colors.tile} d={icon.path} />
    </svg>
  );
}
