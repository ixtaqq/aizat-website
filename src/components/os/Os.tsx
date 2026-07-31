"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Boot } from "./Boot";
import { MenuBar } from "./MenuBar";
import { Desktop } from "./Desktop";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { Toasts } from "./Toasts";
import { Confetti } from "./Confetti";
import { useOperatingSystem } from "./useOperatingSystem";
import { unlockAudio } from "./sound";
import { ALL_APP_IDS, APPS, type AppId } from "./types";

import { AboutApp } from "./apps/AboutApp";
import { ExperienceApp } from "./apps/ExperienceApp";
import { ProjectsApp } from "./apps/ProjectsApp";
import { SkillsApp } from "./apps/SkillsApp";
import { EducationApp } from "./apps/EducationApp";
import { ContactApp } from "./apps/ContactApp";
import { ChatApp } from "./apps/ChatApp";
import { TerminalApp } from "./apps/TerminalApp";
import { TrashApp } from "./apps/TrashApp";
import { TipsApp } from "./apps/TipsApp";

const ResumeApp = dynamic(() => import("./apps/ResumeApp").then((m) => m.ResumeApp), {
  ssr: false,
  loading: () => (
    <div className="resumeapp">
      <div className="resumeloading">Loading résumé…</div>
    </div>
  ),
});

export function Os() {
  const os = useOperatingSystem();
  const {
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
    toggleMax,
    focusWin,
    dockClick,
    moveWin,
    toasts,
    addToast,
    confetti,
    beep,
    dockRef,
  } = os;

  const focusedRef = useRef(focusedId);
  useEffect(() => {
    focusedRef.current = focusedId;
  }, [focusedId]);

  useEffect(() => {
    document.body.classList.toggle("booted", booted);
  }, [booted]);
  useEffect(() => {
    document.body.classList.toggle("party", party);
  }, [party]);
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    function unlock() {
      unlockAudio();
      document.removeEventListener("pointerdown", unlock);
    }
    document.addEventListener("pointerdown", unlock, { once: true });
    return () => document.removeEventListener("pointerdown", unlock);
  }, []);

  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let i = 0;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (focusedRef.current) closeWin(focusedRef.current);
        return;
      }
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[i]) {
        i++;
        if (i === seq.length) {
          i = 0;
          toggleParty();
        }
      } else {
        i = k === seq[0] ? 1 : 0;
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeWin, toggleParty]);

  useEffect(() => {
    if (!booted) return;
    const t1 = setTimeout(() => {
      openApp("about");
      const t2 = setTimeout(() => {
        addToast("Tip: windows are draggable — and the Terminal knows secrets. 💻");
      }, 700);
      return () => clearTimeout(t2);
    }, 250);
    return () => clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  function renderAppBody(id: AppId) {
    switch (id) {
      case "about":
        return <AboutApp />;
      case "experience":
        return <ExperienceApp />;
      case "projects":
        return <ProjectsApp />;
      case "skills":
        return <SkillsApp />;
      case "education":
        return <EducationApp />;
      case "contact":
        return <ContactApp onCopy={(msg) => addToast(msg)} beep={beep} />;
      case "resume":
        return <ResumeApp />;
      case "chat":
        return <ChatApp />;
      case "terminal":
        return (
          <TerminalApp
            theme={theme}
            onOpenApp={openApp}
            onSetTheme={setTheme}
            onToggleParty={() => toggleParty()}
          />
        );
      case "trash":
        return <TrashApp onToast={(msg) => addToast(msg)} beep={beep} />;
      case "tips":
        return <TipsApp />;
      default:
        return null;
    }
  }

  return (
    <>
      {!booted && <Boot onFinish={finishBoot} />}
      <div id="screen">
        <MenuBar
          theme={theme}
          soundOn={soundOn}
          onOpenApp={openApp}
          onSetTheme={setTheme}
          onToggleSound={toggleSound}
          onToggleParty={() => toggleParty()}
        />
        <Desktop onOpenApp={openApp}>
          <div id="windows">
            {ALL_APP_IDS.filter((id) => windows[id]).map((id) => {
              const state = windows[id]!;
              return (
                <Window
                  key={id}
                  id={id}
                  meta={APPS[id]}
                  state={state}
                  focused={focusedId === id}
                  onFocus={focusWin}
                  onClose={closeWin}
                  onMinimize={minimizeWin}
                  onToggleMax={toggleMax}
                  onDragEnd={moveWin}
                >
                  {renderAppBody(id)}
                </Window>
              );
            })}
          </div>
        </Desktop>
        <Dock ref={dockRef} windows={windows} focusedId={focusedId} onClick={dockClick} />
      </div>
      <Toasts toasts={toasts} />
      <Confetti pieces={confetti} />
    </>
  );
}
