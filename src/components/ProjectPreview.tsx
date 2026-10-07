"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";

export function ProjectPreview({ project, onClose }: { project: Project; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function close() {
    dialogRef.current?.close();
    onClose();
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="preview-dialog" aria-labelledby="project-preview-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="preview-header">
        <h2 id="project-preview-title">{project.title}</h2>
        <div className="preview-header-actions">
          <a href={project.url!} target="_blank" rel="noopener noreferrer">Open site ↗</a>
          <button type="button" className="dialog-close" aria-label="Close project preview" onClick={close}>×</button>
        </div>
      </div>
      <div className="preview-body">
        {!loaded && <p className="preview-loading" role="status">Loading preview…</p>}
        <iframe src={project.url!} title={`${project.title} live preview`} onLoad={() => setLoaded(true)} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
      </div>
    </dialog>
  );
}
