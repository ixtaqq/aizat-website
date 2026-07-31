"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "AIZAT BIOS v1.0 — (c) 2026",
  "Checking memory… coffee levels nominal",
  "Loading portfolio modules… OK",
  "Indexing experience, projects, skills…",
  "Mounting /resume.pdf… done",
  "Starting window manager… ready",
];

export function Boot({ onFinish }: { onFinish: () => void }) {
  const [gone, setGone] = useState(false);
  const [status, setStatus] = useState(LINES[0]);
  const [pct, setPct] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    function finish() {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setGone(true);
      onFinish();
    }

    const hardTimer = setTimeout(finish, 6000);
    let idx = 0;
    let stepTimer: ReturnType<typeof setTimeout>;

    function step() {
      if (finishedRef.current) return;
      if (idx < LINES.length) {
        setStatus(LINES[idx]);
        setPct(Math.round(((idx + 1) / LINES.length) * 100));
        idx++;
        stepTimer = setTimeout(step, 280);
      } else {
        clearTimeout(hardTimer);
        finish();
      }
    }
    step();

    return () => {
      clearTimeout(hardTimer);
      clearTimeout(stepTimer);
    };
  }, [onFinish]);

  function skip() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setGone(true);
    onFinish();
  }

  return (
    <div id="boot" role="status" aria-live="polite" className={gone ? "gone" : ""} onClick={skip} onPointerDown={skip}>
      <div className="boot-logo">
        AIZAT<b>.OS</b>
        <span className="cur" />
      </div>
      <div className="boot-sub">Personal Operating System · v1.0</div>
      <div className="boot-bar">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div className="boot-status">{status}</div>
      <div className="boot-skip">[ click anywhere to skip ]</div>
    </div>
  );
}
