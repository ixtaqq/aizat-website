"use client";

import { useState } from "react";

export function TrashApp({
  onToast,
  beep,
}: {
  onToast: (msg: string) => void;
  beep: (freq?: number, dur?: number, type?: OscillatorType, vol?: number) => void;
}) {
  const [shake, setShake] = useState(false);

  function empty() {
    setShake(false);
    requestAnimationFrame(() => setShake(true));
    onToast("Nice try. These stay forever. 🗑️");
    beep(180, 0.12, "sawtooth");
  }

  return (
    <div className="pad">
      <div className="tfile">
        <div className="fi">📄</div>
        <div>
          <div className="fn">
            <s>portfolio_v1_bootstrap.html</s>
          </div>
          <div className="ft">2019. it had a carousel. we don&apos;t talk about it.</div>
        </div>
      </div>
      <div className="tfile">
        <div className="fi">🖼️</div>
        <div>
          <div className="fn">
            <s>headshot_orientation_day.jpg</s>
          </div>
          <div className="ft">&quot;professional&quot; photo, first week of uni.</div>
        </div>
      </div>
      <div className="tfile">
        <div className="fi">♟️</div>
        <div>
          <div className="fn">
            <s>chess_opening_theory.pdf</s>
          </div>
          <div className="ft">647 pages. still lost by move 12.</div>
        </div>
      </div>
      <div className="tfile">
        <div className="fi">📝</div>
        <div>
          <div className="fn">
            <s>cover_letter_generic.docx</s>
          </div>
          <div className="ft">&quot;to whom it may concern&quot; — retired.</div>
        </div>
      </div>
      <button className={`emptybtn${shake ? " shake" : ""}`} onAnimationEnd={() => setShake(false)} onClick={empty}>
        🗑️ Empty Trash
      </button>
    </div>
  );
}
