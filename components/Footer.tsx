"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [easterEgg, setEasterEgg] = useState(false);
  const konamiRef = useRef<string[]>([]);

  // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    function handleKeyDown(e: KeyboardEvent) {
      konamiRef.current.push(e.key);
      // Keep only the last N keys
      if (konamiRef.current.length > konamiCode.length) {
        konamiRef.current.shift();
      }
      // Check match
      if (
        konamiRef.current.length === konamiCode.length &&
        konamiRef.current.every((key, i) => key === konamiCode[i])
      ) {
        setEasterEgg(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <footer className="border-t border-zinc-800/60 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-zinc-300">DevFlow</span>
          <span className="text-xs text-zinc-600">
            · Developer planning tool
          </span>
        </div>

        <p className="text-xs text-zinc-600">
          Built as a demonstration.{" "}
          {easterEgg && (
            <span className="text-emerald-500">
              🎮 You found the secret! Ship it.
            </span>
          )}
        </p>
      </div>
    </footer>
  );
}
