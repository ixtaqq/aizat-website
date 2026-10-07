"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ResumeModal = dynamic(
  () => import("./ResumeModal").then((m) => ({ default: m.ResumeModal })),
  { ssr: false, loading: () => null }
);

export function ResumeButton({ variant = "outline" }: { variant?: "outline" | "nav" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`resume-link ${variant === "nav" ? "nav-resume" : ""}`}>
        CV{variant === "nav" && <> <span aria-hidden="true">↗</span></>}
      </button>
      {open && <ResumeModal onClose={() => setOpen(false)} />}
    </>
  );
}
