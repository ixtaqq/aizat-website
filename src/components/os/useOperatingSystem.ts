"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { APPS, type AppId, type Rect, type Theme, type WinState } from "./types";
import { beep as beepFn } from "./sound";

export type Toast = { id: number; msg: string; leaving: boolean };
export type ConfettiPiece = {
  id: number;
  left: number;
  background: string;
  duration: number;
  delay: number;
  rotate: number;
  round: boolean;
};

const CONFETTI_COLORS = ["#ffd400", "#ff4b2e", "#2456ff", "#00b159", "#ff8a00", "#12b3c7"];

let uid = 1;
function nextId() {
  return uid++;
}

export function useOperatingSystem() {
  const [booted, setBooted] = useState(false);
  const [theme, setThemeState] = useState<Theme>("day");
  const [soundOn, setSoundOn] = useState(true);
  const [party, setParty] = useState(false);
  const [windows, setWindows] = useState<Partial<Record<AppId, WinState>>>({});
  const [focusedId, setFocusedId] = useState<AppId | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const zTopRef = useRef(100);
  const dockRef = useRef<HTMLElement | null>(null);
  const partyTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const soundOnRef = useRef(soundOn);
  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  const beep = useCallback((freq?: number, dur?: number, type?: OscillatorType, vol?: number) => {
    beepFn(soundOnRef.current, freq, dur, type, vol);
  }, []);

  const finishBoot = useCallback(() => {
    setBooted(true);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      if (next) beepFn(true, 880, 0.06, "square");
      return next;
    });
  }, []);

  const addToast = useCallback((msg: string) => {
    const id = nextId();
    setToasts((prev) => [...prev, { id, msg, leaving: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    }, 3200);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const fireConfetti = useCallback((n = 70) => {
    const pieces: ConfettiPiece[] = Array.from({ length: n }, () => ({
      id: nextId(),
      left: Math.random() * 100,
      background: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
      duration: 2 + Math.random() * 1.8,
      delay: Math.random() * 0.4,
      rotate: Math.random() * 360,
      round: Math.random() > 0.5,
    }));
    setConfetti((prev) => [...prev, ...pieces]);
    const ids = new Set(pieces.map((p) => p.id));
    setTimeout(() => {
      setConfetti((prev) => prev.filter((p) => !ids.has(p.id)));
    }, 4000);
  }, []);

  const toggleParty = useCallback(
    (force?: boolean) => {
      setParty((prev) => {
        const on = typeof force === "boolean" ? force : !prev;
        if (on) {
          fireConfetti(90);
          addToast("🕺 PARTY MODE — Konami accepted");
          beepFn(soundOnRef.current, 880, 0.1, "square");
          if (partyTimerRef.current) clearInterval(partyTimerRef.current);
          partyTimerRef.current = setInterval(() => fireConfetti(18), 1300);
        } else {
          addToast("party over. back to shipping.");
          if (partyTimerRef.current) {
            clearInterval(partyTimerRef.current);
            partyTimerRef.current = null;
          }
        }
        return on;
      });
    },
    [fireConfetti, addToast]
  );

  function fillRect(): Rect {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const dockH = dockRef.current?.offsetHeight || 74;
    return { x: 8, y: 44, w: Math.max(280, vw - 16), h: Math.max(220, vh - 44 - (dockH + 18)) };
  }

  const focusWin = useCallback((id: AppId) => {
    const z = ++zTopRef.current;
    setWindows((prev) => {
      const rec = prev[id];
      if (!rec) return prev;
      return { ...prev, [id]: { ...rec, zIndex: z } };
    });
    setFocusedId(id);
  }, []);

  const openApp = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const existing = prev[id];
        if (existing) {
          if (existing.min) {
            const z = ++zTopRef.current;
            queueMicrotask(() => setFocusedId(id));
            return { ...prev, [id]: { ...existing, min: false, zIndex: z, pop: existing.pop + 1 } };
          }
          queueMicrotask(() => focusWin(id));
          return prev;
        }
        const meta = APPS[id];
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const mobile = vw < 760;
        const w = mobile ? vw - 16 : Math.min(meta.w, vw - 40);
        const h = mobile ? Math.max(260, vh - 120) : Math.min(meta.h, vh - 150);
        const n = Object.keys(prev).length;
        let x = mobile ? 8 : 80 + n * 34;
        let y = mobile ? 44 : 64 + n * 28;
        x = Math.max(8, Math.min(x, Math.max(8, vw - w - 8)));
        y = Math.max(44, Math.min(y, Math.max(44, vh - h - 90)));
        const z = ++zTopRef.current;
        queueMicrotask(() => {
          setFocusedId(id);
          beepFn(soundOnRef.current, 720, 0.06, "square");
        });
        return {
          ...prev,
          [id]: { min: false, max: false, rect: { x, y, w, h }, prevRect: null, zIndex: z, bye: false, pop: 0 },
        };
      });
    },
    [focusWin]
  );

  const closeWin = useCallback((id: AppId) => {
    setWindows((prev) => {
      const rec = prev[id];
      if (!rec) return prev;
      return { ...prev, [id]: { ...rec, bye: true } };
    });
    beepFn(soundOnRef.current, 300, 0.07, "sawtooth");
    setTimeout(() => {
      setWindows((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setFocusedId((prev) => (prev === id ? null : prev));
    }, 180);
  }, []);

  const minimizeWin = useCallback((id: AppId) => {
    setWindows((prev) => {
      const rec = prev[id];
      if (!rec) return prev;
      return { ...prev, [id]: { ...rec, min: true } };
    });
    setFocusedId((prev) => (prev === id ? null : prev));
    beepFn(soundOnRef.current, 330, 0.05, "square");
  }, []);

  const restoreWin = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const rec = prev[id];
        if (!rec) return prev;
        return { ...prev, [id]: { ...rec, min: false, pop: rec.pop + 1 } };
      });
      focusWin(id);
    },
    [focusWin]
  );

  const toggleMax = useCallback((id: AppId) => {
    setWindows((prev) => {
      const rec = prev[id];
      if (!rec) return prev;
      if (!rec.max) {
        const f = fillRect();
        return { ...prev, [id]: { ...rec, prevRect: rec.rect, rect: f, max: true } };
      }
      const restored = rec.prevRect || rec.rect;
      return { ...prev, [id]: { ...rec, rect: restored, max: false, prevRect: null } };
    });
    beepFn(soundOnRef.current, 540, 0.05, "triangle");
  }, []);

  const dockClick = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const rec = prev[id];
        if (rec) {
          if (rec.min) {
            queueMicrotask(() => restoreWin(id));
          } else if (focusedId === id) {
            queueMicrotask(() => minimizeWin(id));
          } else {
            queueMicrotask(() => focusWin(id));
          }
          return prev;
        }
        queueMicrotask(() => openApp(id));
        return prev;
      });
    },
    [focusedId, restoreWin, minimizeWin, focusWin, openApp]
  );

  const moveWin = useCallback((id: AppId, x: number, y: number) => {
    setWindows((prev) => {
      const rec = prev[id];
      if (!rec) return prev;
      return { ...prev, [id]: { ...rec, rect: { ...rec.rect, x, y } } };
    });
  }, []);

  // clamp / refill windows on viewport resize
  useEffect(() => {
    function onResize() {
      setWindows((prev) => {
        const next: typeof prev = {};
        for (const key of Object.keys(prev) as AppId[]) {
          const rec = prev[key];
          if (!rec) continue;
          if (rec.max) {
            next[key] = { ...rec, rect: fillRect() };
            continue;
          }
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const { w } = rec.rect;
          let { x, y } = rec.rect;
          x = Math.max(-(w - 120), Math.min(vw - 60, x));
          y = Math.max(44, Math.min(vh - 60, y));
          next[key] = { ...rec, rect: { ...rec.rect, x, y } };
        }
        return next;
      });
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    return () => {
      if (partyTimerRef.current) clearInterval(partyTimerRef.current);
    };
  }, []);

  return {
    booted,
    finishBoot,
    theme,
    setTheme,
    soundOn,
    toggleSound,
    party,
    toggleParty,
    windows,
    focusedId,
    openApp,
    closeWin,
    minimizeWin,
    restoreWin,
    toggleMax,
    focusWin,
    dockClick,
    moveWin,
    toasts,
    addToast,
    confetti,
    fireConfetti,
    beep,
    dockRef,
  };
}

export type OsApi = ReturnType<typeof useOperatingSystem>;
