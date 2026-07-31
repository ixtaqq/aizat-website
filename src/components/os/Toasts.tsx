"use client";

import type { Toast } from "./useOperatingSystem";

export function Toasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div id="toasts">
      {toasts.map((t) => (
        <div key={t.id} className={`toast${t.leaving ? " out" : ""}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
