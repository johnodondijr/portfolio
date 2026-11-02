"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Renders the image if it exists; otherwise shows the fallback (e.g. a placeholder label).
export function OptionalImage({
  src,
  alt,
  fallback,
  onMissing,
}: {
  src: string;
  alt: string;
  fallback?: ReactNode;
  onMissing?: () => void;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  const fail = () => {
    setMissing(true);
    onMissing?.();
  };

  // The image may have failed before React hydrated and attached onError.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) fail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (missing) return <>{fallback}</>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt={alt} onError={fail} />;
}
