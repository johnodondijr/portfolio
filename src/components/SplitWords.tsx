// Renders a heading's words in clipping masks so they can slide up one by one
// once ScrollEffects marks the element with .is-in.
export function SplitWords({ lines, emphasizeLast }: { lines: string[]; emphasizeLast?: boolean }) {
  let index = 0;
  return (
    <span className="split" data-split>
      {lines.map((line, li) => {
        const words = line.split(" ").map((word, wi) => (
          <span key={wi}>
            {wi > 0 && " "}
            <span className="split__mask">
              <span className="split__word" style={{ ["--w" as string]: index++ }}>
                {word}
              </span>
            </span>
          </span>
        ));
        const isEm = emphasizeLast && li === lines.length - 1;
        return (
          <span key={li} className="split__line">
            {isEm ? <em>{words}</em> : words}
          </span>
        );
      })}
    </span>
  );
}
