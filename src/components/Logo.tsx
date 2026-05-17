import { Link } from "@tanstack/react-router";

export function Logo({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  const fg = invert ? "text-white" : "text-black";
  return (
    <Link to="/" className={`flex items-center gap-2 ${fg} ${className}`} aria-label="In The Clab">
      <svg width="34" height="34" viewBox="0 0 64 64" fill="none" className="shrink-0">
        <polygon
          points="32,3 58,17 58,47 32,61 6,47 6,17"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <text
          x="32"
          y="29"
          textAnchor="middle"
          fontSize="9"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="400"
          fill="currentColor"
          letterSpacing="1"
        >
          in the
        </text>
        <text
          x="32"
          y="46"
          textAnchor="middle"
          fontSize="16"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="700"
          fill="currentColor"
          letterSpacing="1"
        >
          CLAB
        </text>
      </svg>
      <span className="sr-only">In The Clab</span>
    </Link>
  );
}
