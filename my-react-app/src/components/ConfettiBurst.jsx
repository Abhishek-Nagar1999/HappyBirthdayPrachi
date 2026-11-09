import { useMemo } from "react";

const COLORS = ["#e38aaa", "#c6a15b", "#fff6ee", "#9b2242", "#f3b6cc", "#f0d9a4"];

export default function ConfettiBurst({ burst = 0, variant = "fall" }) {
  const pieces = useMemo(() => {
    if (!burst) return [];
    return Array.from({ length: 40 }, (_, index) => ({
      id: `${burst}-${index}`,
      left: 30 + ((index * 17) % 40),
      delay: (index % 7) * 0.03,
      duration: 1.45 + (index % 5) * 0.18,
      drift: ((index % 2 === 0 ? 1 : -1) * (40 + (index % 9) * 18)),
      rot: (index * 47) % 320,
      color: COLORS[index % COLORS.length],
      heart: index % 4 === 0,
      size: 7 + (index % 5) * 2,
    }));
  }, [burst]);

  if (!pieces.length) return null;

  return (
    <div className={`confetti confetti-${variant}`} aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={piece.heart ? "bit is-heart" : "bit"}
          style={{
            left: `${piece.left}%`,
            background: piece.heart ? "transparent" : piece.color,
            color: piece.color,
            width: piece.size,
            height: piece.heart ? piece.size : Math.max(5, piece.size * 0.62),
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            "--drift": `${piece.drift}px`,
            "--rot": `${piece.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}
