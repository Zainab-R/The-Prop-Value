import type { CSSProperties } from "react";

/**
 * Zero-JS entrance animation (pure CSS keyframes, see .animate-fade-in-up
 * in app/globals.css). Unlike FadeIn.tsx (framer-motion), this is a plain
 * server-renderable component — safe to use on every dashboard/admin page
 * without pulling framer-motion into routes that don't otherwise need it.
 */
export default function FadeInUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`animate-fade-in-up ${className ?? ""}`.trim()}
      style={{ "--fade-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
