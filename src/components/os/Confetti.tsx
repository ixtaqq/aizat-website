"use client";

import type { ConfettiPiece } from "./useOperatingSystem";

export function Confetti({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <div id="confetti">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="cf"
          style={{
            left: `${p.left}%`,
            background: p.background,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotate}deg)`,
            borderRadius: p.round ? "50%" : undefined,
          }}
        />
      ))}
    </div>
  );
}
