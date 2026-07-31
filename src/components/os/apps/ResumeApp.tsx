"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { profile } from "@/lib/data";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export function ResumeApp() {
  const [numPages, setNumPages] = useState(0);
  const [containerWidth, setContainerWidth] = useState(500);
  const [pdfSrc, setPdfSrc] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((json) => setPdfSrc(json.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.clientWidth);
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="resumeapp">
      <div className="resumebar">
        <a href={profile.cv} download>
          ⬇ Download PDF
        </a>
      </div>
      <div ref={containerRef} className="resumepages">
        <Document
          file={pdfSrc || null}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div className="resumeloading">Loading résumé…</div>}
          error={<div className="resumeloading">Could not load preview — try the download link.</div>}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div className="rpage" key={i}>
              <Page
                pageNumber={i + 1}
                width={containerWidth > 32 ? containerWidth - 32 : containerWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
