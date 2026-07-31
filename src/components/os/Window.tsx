"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { AppId, AppMeta, WinState } from "./types";

export function Window({
  id,
  meta,
  state,
  focused,
  onFocus,
  onClose,
  onMinimize,
  onToggleMax,
  onDragEnd,
  children,
}: {
  id: AppId;
  meta: AppMeta;
  state: WinState;
  focused: boolean;
  onFocus: (id: AppId) => void;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onToggleMax: (id: AppId) => void;
  onDragEnd: (id: AppId, x: number, y: number) => void;
  children: ReactNode;
}) {
  const elRef = useRef<HTMLElement | null>(null);
  const tbarRef = useRef<HTMLDivElement | null>(null);
  const [popClass, setPopClass] = useState(false);
  const prevPop = useRef(state.pop);

  useEffect(() => {
    if (state.pop !== prevPop.current) {
      prevPop.current = state.pop;
      setPopClass(false);
      const raf = requestAnimationFrame(() => setPopClass(true));
      const t = setTimeout(() => setPopClass(false), 240);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t);
      };
    }
  }, [state.pop]);

  function onTbarPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest(".wbtn")) return;
    if (state.max) return;
    if (e.button !== undefined && e.button !== 0 && e.pointerType === "mouse") return;
    onFocus(id);
    const el = elRef.current;
    const tbar = tbarRef.current;
    if (!el) return;
    const sx = e.clientX;
    const sy = e.clientY;
    const ox = state.rect.x;
    const oy = state.rect.y;
    let captured = false;
    try {
      tbar?.setPointerCapture(e.pointerId);
      captured = true;
    } catch {
      /* pointer capture unsupported */
    }
    document.body.classList.add("dragging");

    function mv(ev: PointerEvent) {
      const nx0 = ox + (ev.clientX - sx);
      const ny0 = oy + (ev.clientY - sy);
      const ew = el!.offsetWidth;
      const nx = Math.max(-(ew - 120), Math.min(window.innerWidth - 60, nx0));
      const ny = Math.max(44, Math.min(window.innerHeight - 60, ny0));
      el!.style.left = `${nx}px`;
      el!.style.top = `${ny}px`;
    }
    function up() {
      document.body.classList.remove("dragging");
      if (captured) {
        try {
          tbar?.releasePointerCapture(e.pointerId);
        } catch {
          /* already released */
        }
      }
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      if (el) {
        onDragEnd(id, parseFloat(el.style.left) || 0, parseFloat(el.style.top) || 0);
      }
    }
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  }

  const cls = ["win", focused ? "focused" : "", state.max ? "max" : "", state.bye ? "bye" : "", popClass ? "pop" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={elRef}
      className={cls}
      style={{
        left: state.rect.x,
        top: state.rect.y,
        width: state.rect.w,
        height: state.rect.h,
        zIndex: state.zIndex,
        display: state.min ? "none" : "flex",
      }}
      onPointerDown={() => onFocus(id)}
    >
      <header
        className="tbar"
        ref={tbarRef}
        style={{ background: meta.color, color: meta.dark ? "#141414" : "#fff" }}
        onPointerDown={onTbarPointerDown}
      >
        <span className="ticon">{meta.icon}</span>
        <span className="ttitle">{meta.title}</span>
        <span className="wbtns">
          <button
            className="wbtn min"
            aria-label="Minimise"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
          >
            –
          </button>
          <button
            className="wbtn maxb"
            aria-label="Maximise"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMax(id);
            }}
          >
            □
          </button>
          <button
            className="wbtn cls"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
          >
            ✕
          </button>
        </span>
      </header>
      <div className="wbody">{children}</div>
    </section>
  );
}
