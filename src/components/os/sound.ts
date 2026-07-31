"use client";

let actx: AudioContext | null = null;

export function unlockAudio() {
  try {
    actx = actx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (actx.state === "suspended") actx.resume();
  } catch {
    /* audio unsupported */
  }
}

export function beep(
  soundOn: boolean,
  freq = 660,
  dur = 0.07,
  type: OscillatorType = "square",
  vol = 0.035
) {
  if (!soundOn) return;
  try {
    actx = actx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (actx.state === "suspended") actx.resume();
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = vol;
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
    o.connect(g);
    g.connect(actx.destination);
    o.start();
    o.stop(actx.currentTime + dur);
  } catch {
    /* audio unsupported */
  }
}
