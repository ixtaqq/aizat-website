"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { profile } from "@/lib/data";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const [numPages, setNumPages] = useState(0);
  const [containerWidth, setContainerWidth] = useState(600);
  const [pdfSrc, setPdfSrc] = useState<string>("");
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function close() {
    dialogRef.current?.close();
    onClose();
  }

  useEffect(() => {
    const controller = new AbortController();
    const dialog = dialogRef.current;
    dialog?.showModal();
    fetch("/api/resume", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Resume could not be loaded");
        return res.json();
      })
      .then((json) => setPdfSrc(json.data))
      .catch((error) => { if (error.name !== "AbortError") setFailed(true); });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      controller.abort();
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="preview-dialog"
      aria-labelledby="resume-title"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div
        className="flex w-full flex-col overflow-hidden bg-surface"
        style={{ height: "min(90dvh, 860px)" }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-base px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </span>
            <div>
              <h2 id="resume-title" className="text-sm font-semibold text-text">{profile.name} — Resume</h2>
              <p className="text-xs text-muted">
                {numPages > 0 ? `${numPages} page${numPages > 1 ? "s" : ""}` : "Loading…"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-1.5 rounded bg-accent px-3 py-1.5 text-xs font-semibold text-[var(--color-base)] transition-opacity hover:opacity-80"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </a>
            <button
              onClick={close}
              className="rounded p-1.5 text-muted transition-colors hover:text-accent"
              aria-label="Close resume"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF canvas viewer */}
        <div ref={containerRef} className="flex-1 overflow-y-auto bg-[#404040] p-4">
          {failed ? (
            <div className="flex h-40 flex-col items-center justify-center gap-3 text-sm text-white" role="alert">
              <p>Could not load PDF preview.</p>
              <a href={profile.cv} download className="underline">Download resume instead</a>
            </div>
          ) : <Document
            file={pdfSrc || null}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div className="flex h-40 items-center justify-center gap-2 text-sm text-white">
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading PDF…
              </div>
            }
            error={
              <div className="flex h-40 flex-col items-center justify-center gap-3 text-sm text-white">
                <p>Could not load PDF preview.</p>
                <a href={profile.cv} download className="underline">
                  Download instead
                </a>
              </div>
            }
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div key={i} className={i < numPages - 1 ? "mb-3" : ""}>
                <Page
                  pageNumber={i + 1}
                  width={containerWidth > 32 ? containerWidth - 32 : containerWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg"
                />
              </div>
            ))}
          </Document>}
        </div>
      </div>
    </dialog>
  );
}
