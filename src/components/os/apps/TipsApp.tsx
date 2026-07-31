export function TipsApp() {
  return (
    <div className="pad">
      <h3 className="sec" style={{ marginTop: 0 }}>
        {"// how to use this machine"}
      </h3>
      <ul className="tips">
        <li>
          <kbd>drag</kbd>
          <span>Grab any window by its title bar and fling it around.</span>
        </li>
        <li>
          <kbd>●</kbd>
          <span>Red / yellow / green dots = close / minimise / maximise.</span>
        </li>
        <li>
          <kbd>click</kbd>
          <span>Dock icons open apps; click an open one again to minimise.</span>
        </li>
        <li>
          <kbd>Esc</kbd>
          <span>Closes the window on top.</span>
        </li>
        <li>
          <kbd>🌓</kbd>
          <span>Top-right toggles day / night. 🔊 toggles the tiny beeps.</span>
        </li>
        <li>
          <kbd>💻</kbd>
          <span>
            The Terminal knows secrets — try <b>neofetch</b>, <b>ls</b>, <b>sudo hire-me</b>.
          </span>
        </li>
      </ul>
      <div className="konami">
        🕺 secret: type the Konami code on your keyboard →
        <br />
        <kbd>↑</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>←</kbd> <kbd>→</kbd>{" "}
        <kbd>B</kbd> <kbd>A</kbd>
      </div>
    </div>
  );
}
