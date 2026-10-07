"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Curve = [Point, Point, Point];
type Lane = "source" | "fast" | "strong";
type Particle = { path: Curve[]; segment: number; t: number; speed: number; lane: Lane; fading: number };
type Ring = { x: number; y: number; r: number; alpha: number; warm: boolean };
type Layout = {
  sources: Point[];
  router: Point;
  fast: Point;
  strong: Point;
  brief: Point;
  chart: { left: number; right: number; top: number; bottom: number };
  ticker: { left: number; right: number; y: number };
};

const CHART_POINTS = 44;
const CHART_STEP_MS = 320;

function bezier([a, b, c]: Curve, t: number): Point {
  const u = 1 - t;
  return { x: u * u * a.x + 2 * u * t * b.x + t * t * c.x, y: u * u * a.y + 2 * u * t * b.y + t * t * c.y };
}

function curve(from: Point, to: Point, bend = 0): Curve {
  return [from, { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 + bend }, to];
}

function buildLayout(width: number, height: number): Layout {
  const compact = width < 560;
  const count = compact ? 7 : 12;
  const sources = Array.from({ length: count }, (_, index) => ({
    x: width * 0.05 + (index % 2) * width * 0.02,
    y: height * 0.1 + (index / (count - 1)) * height * 0.78,
  }));
  return {
    sources,
    router: { x: width * 0.3, y: height * 0.5 },
    fast: { x: width * 0.45, y: height * 0.27 },
    strong: { x: width * 0.45, y: height * 0.73 },
    brief: { x: width * 0.58, y: height * 0.5 },
    chart: { left: width * 0.66, right: width * 0.97, top: height * 0.14, bottom: height * 0.82 },
    ticker: { left: width * 0.2, right: width * 0.62, y: height - 6 },
  };
}

function withAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((char) => char + char).join("") : value;
  const number = Number.parseInt(full, 16);
  return `rgba(${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}, ${alpha})`;
}

function readColors() {
  const style = getComputedStyle(document.documentElement);
  const read = (name: string) => style.getPropertyValue(name).trim();
  return {
    accent: read("--accent"),
    accentLine: read("--accent-line"),
    accentSoft: read("--accent-soft"),
    line: read("--line-strong"),
    warm: read("--warm"),
    ink: read("--ink"),
    faint: read("--faint"),
    bg: read("--bg"),
    mono: read("--font-jetbrains") || "monospace",
  };
}

export function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;
    const ctx: CanvasRenderingContext2D = context;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let layout = buildLayout(1, 1);
    let colors = readColors();
    let particles: Particle[] = [];
    let rings: Ring[] = [];
    let prices = Array.from({ length: CHART_POINTS }, (_, index) => 50 + Math.sin(index / 4) * 4 + index * 0.25);
    let pendingBump = 0;
    let chartClock = 0;
    let spawnClock = 0;
    let tickerOffset = 0;
    let lowSmooth = Math.min(...prices);
    let highSmooth = Math.max(...prices);
    let pointer: Point | null = null;
    let frame = 0;
    let last = performance.now();
    let onScreen = true;
    let visible = true;

    function resize() {
      const rect = container!.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      layout = buildLayout(width, height);
      particles = [];
      rings = [];
    }

    function chartEnd(): Point {
      const { chart } = layout;
      const value = prices[prices.length - 1];
      return { x: chart.right, y: chart.bottom - ((value - lowSmooth) / Math.max(1, highSmooth - lowSmooth)) * (chart.bottom - chart.top) };
    }

    function spawn(source?: Point) {
      const from = source ?? layout.sources[Math.floor(Math.random() * layout.sources.length)];
      particles.push({ path: [curve(from, layout.router, (layout.router.y - from.y) * -0.35)], segment: 0, t: 0, speed: 0.55 + Math.random() * 0.35, lane: "source", fading: 0 });
    }

    function route(particle: Particle) {
      const { router, fast, strong, brief } = layout;
      if (Math.random() < 0.28) {
        particle.fading = 1;
        rings.push({ x: router.x, y: router.y, r: 6, alpha: 0.5, warm: false });
        return;
      }
      const lane: Lane = Math.random() < 0.7 ? "fast" : "strong";
      const model = lane === "fast" ? fast : strong;
      particle.lane = lane;
      particle.speed = lane === "fast" ? 0.95 + Math.random() * 0.3 : 0.45 + Math.random() * 0.15;
      particle.path.push(curve(router, model, lane === "fast" ? -12 : 12), curve(model, brief, lane === "fast" ? 10 : -10), curve(brief, chartEnd(), -18));
    }

    function step(delta: number) {
      const seconds = delta / 1000;
      const near = pointer && pointer.x < layout.router.x + 40;
      spawnClock += seconds * (near ? 16 : 6);
      while (spawnClock >= 1) {
        spawnClock -= 1;
        if (particles.length < 140) {
          if (near && pointer) {
            const closest = layout.sources.reduce((best, source) => Math.abs(source.y - pointer!.y) < Math.abs(best.y - pointer!.y) ? source : best);
            spawn(Math.random() < 0.6 ? closest : undefined);
          } else {
            spawn();
          }
        }
      }

      for (const particle of particles) {
        if (particle.fading > 0) {
          particle.fading -= seconds * 2.5;
          continue;
        }
        particle.t += seconds * particle.speed;
        if (particle.t < 1) continue;
        particle.t = 0;
        particle.segment += 1;
        if (particle.segment === 1 && particle.lane === "source") route(particle);
        else if (particle.segment === 2) rings.push({ x: particle.path[1][2].x, y: particle.path[1][2].y, r: particle.lane === "strong" ? 11 : 8, alpha: 0.45, warm: particle.lane === "strong" });
        else if (particle.segment === 3) rings.push({ x: layout.brief.x, y: layout.brief.y, r: 12, alpha: 0.35, warm: false });
        if (particle.segment >= particle.path.length && particle.fading <= 0 && particle.lane !== "source") {
          pendingBump += particle.lane === "strong" ? 0.9 : 0.25;
          const end = chartEnd();
          rings.push({ x: end.x, y: end.y, r: 4, alpha: 0.6, warm: particle.lane === "strong" });
          particle.fading = -1;
        }
      }
      particles = particles.filter((particle) => particle.fading > 0 || (particle.fading === 0 && particle.segment < particle.path.length));

      rings = rings.filter((ring) => {
        ring.r += seconds * 26;
        ring.alpha -= seconds * 0.9;
        return ring.alpha > 0;
      });

      chartClock += delta;
      while (chartClock >= CHART_STEP_MS) {
        chartClock -= CHART_STEP_MS;
        const previous = prices[prices.length - 1];
        const mean = prices.reduce((sum, value) => sum + value, 0) / prices.length;
        const next = previous + (Math.random() - 0.5) * 2.4 + pendingBump * 0.35 - (previous - mean) * 0.06;
        pendingBump *= 0.4;
        prices = [...prices.slice(1), next];
      }
      const low = Math.min(...prices);
      const high = Math.max(...prices);
      lowSmooth += (low - 2 - lowSmooth) * Math.min(1, seconds * 3);
      highSmooth += (high + 2 - highSmooth) * Math.min(1, seconds * 3);
      tickerOffset = (tickerOffset + seconds * 18) % 10;
    }

    function drawNode(point: Point, radius: number, fill: string, label?: string, labelBelow = false) {
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.bg;
      ctx.fill();
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = colors.accentSoft;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = colors.accentLine;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(point.x, point.y, Math.max(2, radius * 0.38), 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      if (label && width >= 560) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.faint;
        ctx.font = `10px ${colors.mono}`;
        ctx.textAlign = "center";
        ctx.fillText(label, point.x, labelBelow ? point.y + radius + 14 : point.y - radius - 8);
      }
    }

    function strokeCurve(c: Curve, alpha: number) {
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(c[0].x, c[0].y);
      ctx.quadraticCurveTo(c[1].x, c[1].y, c[2].x, c[2].y);
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const { router, fast, strong, brief, chart, ticker } = layout;

      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 0.8;
      for (const source of layout.sources) strokeCurve(curve(source, router, (router.y - source.y) * -0.35), 0.55);
      strokeCurve(curve(router, fast, -12), 0.8);
      strokeCurve(curve(router, strong, 12), 0.8);
      strokeCurve(curve(fast, brief, 10), 0.8);
      strokeCurve(curve(strong, brief, -10), 0.8);
      strokeCurve(curve(brief, chartEnd(), -18), 0.5);

      const span = chart.right - chart.left;
      const stepX = span / (CHART_POINTS - 1);
      const shift = (chartClock / CHART_STEP_MS) * stepX;
      const toY = (value: number) => chart.bottom - ((value - lowSmooth) / Math.max(1, highSmooth - lowSmooth)) * (chart.bottom - chart.top);
      const points = prices.map((value, index) => ({ x: chart.left + index * stepX - shift, y: toY(value) }));
      ctx.save();
      ctx.beginPath();
      ctx.rect(chart.left, 0, span + 1, height);
      ctx.clip();
      const gradient = ctx.createLinearGradient(0, chart.top, 0, chart.bottom);
      gradient.addColorStop(0, withAlpha(colors.accent, 0.22));
      gradient.addColorStop(1, withAlpha(colors.accent, 0));
      ctx.beginPath();
      points.forEach((point, index) => (index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)));
      ctx.lineTo(points[points.length - 1].x, chart.bottom);
      ctx.lineTo(points[0].x, chart.bottom);
      ctx.closePath();
      ctx.globalAlpha = 1;
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.beginPath();
      points.forEach((point, index) => (index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)));
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      for (let index = 0; index < points.length; index += 4) {
        ctx.beginPath();
        ctx.arc(points[index].x, chart.bottom + 8, 1, 0, Math.PI * 2);
        ctx.fillStyle = colors.line;
        ctx.fill();
      }
      ctx.restore();
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.7;
      ctx.setLineDash([2, 4]);
      for (const fraction of [0, 0.5, 1]) {
        const y = chart.top + (chart.bottom - chart.top) * fraction;
        ctx.beginPath();
        ctx.moveTo(chart.left, y);
        ctx.lineTo(chart.right, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      const end = chartEnd();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(end.x, end.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = colors.ink;
      ctx.fill();
      if (width >= 560) {
        ctx.fillStyle = colors.faint;
        ctx.font = `10px ${colors.mono}`;
        ctx.textAlign = "left";
        ctx.fillText("market", chart.left, chart.top - 8);
      }

      for (const ring of rings) {
        ctx.globalAlpha = Math.max(0, ring.alpha);
        ctx.strokeStyle = ring.warm ? colors.warm : colors.accent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      layout.sources.forEach((source, index) => drawNode(source, 5, colors.accent, index === 0 ? "feeds" : undefined));
      drawNode(router, 17, colors.ink, "filter");
      drawNode(fast, 10, colors.accent, "fast");
      drawNode(strong, 13, colors.warm, "strong", true);
      drawNode(brief, 15, colors.accent, "brief");

      for (const particle of particles) {
        const segment = particle.path[Math.min(particle.segment, particle.path.length - 1)];
        const point = bezier(segment, particle.fading !== 0 ? 1 : particle.t);
        ctx.globalAlpha = particle.fading > 0 ? particle.fading * 0.6 : 0.9;
        ctx.fillStyle = particle.fading > 0 ? colors.faint : particle.lane === "strong" ? colors.warm : colors.accent;
        ctx.beginPath();
        ctx.arc(point.x, point.y, particle.lane === "strong" ? 3 : 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ticker.left, ticker.y);
      ctx.lineTo(ticker.right, ticker.y);
      ctx.stroke();
      for (let x = ticker.left - tickerOffset; x <= ticker.right; x += 10) {
        if (x < ticker.left) continue;
        const major = Math.round((x + tickerOffset - ticker.left) / 10) % 5 === 0;
        ctx.beginPath();
        ctx.moveTo(x, ticker.y);
        ctx.lineTo(x, ticker.y - (major ? 8 : 4));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function loop(now: number) {
      const delta = Math.min(64, now - last);
      last = now;
      if (visible) {
        step(delta);
        draw();
      }
      frame = requestAnimationFrame(loop);
    }

    resize();
    if (reducedMotion) {
      for (let index = 0; index < 240; index++) step(16);
      draw();
    } else {
      frame = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw();
    });
    resizeObserver.observe(container);
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (reducedMotion) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      visible = onScreen && !document.hidden;
      last = performance.now();
    });
    viewObserver.observe(container);
    const onVisibility = () => {
      visible = onScreen && !document.hidden;
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onLeave = () => { pointer = null; };
    const onClick = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const y = event.clientY - rect.top;
      const closest = layout.sources.reduce((best, source) => Math.abs(source.y - y) < Math.abs(best.y - y) ? source : best);
      for (let index = 0; index < 8; index++) spawn(index % 2 === 0 ? closest : undefined);
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onClick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-banner" aria-label="Animated banner: news and filings flow through a filter, fast and strong models, into a daily brief and a live market line">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
