"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { solutions } from "@/data/site";
import ScenePoster from "./ScenePoster";

// ssr:false MUST be declared inside a Client Component, not app/page.tsx.
const EcosystemCanvas = dynamic(() => import("./EcosystemCanvas"), {
  ssr: false,
  loading: () => <ScenePoster />,
});
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <><ScenePoster /><p className="scene-error">แสดงภาพสำรอง เนื่องจากไม่สามารถเปิดฉาก 3D ได้</p></> : this.props.children; }
}
export default function Hero3D() {
  const [selected, setSelected] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [visible, setVisible] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [reset, setReset] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ok = false;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      ok = !!gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch { ok = false; }
    setSupported(ok);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 820px)").matches;
    // Mobile and reduced-motion users opt in instead of downloading the 3D bundle.
    if (ok && desktop && !reduced.matches) { setEnabled(true); }
    const onReduced = () => { if (reduced.matches) setAutoRotate(false); };
    reduced.addEventListener("change", onReduced);
    let inView = true;
    const sync = () => setVisible(inView && document.visibilityState === "visible");
    const observer = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting; sync();
    }, { threshold: 0.05 }) : null;
    if (host.current) observer?.observe(host.current);
    document.addEventListener("visibilitychange", sync);
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", onReduced); };
  }, []);
  const active = selected === null ? null : solutions[selected];
  return <div className="ecosystem" ref={host}>
    <div className="scene-topline"><span><i /> THE IT–OT ECOSYSTEM</span><span>EXPLORE IN 3D</span></div>
    <div className="scene-viewport" role="region" tabIndex={0} aria-label="ฉาก 3D แสดงโครงสร้าง IT–OT สามชั้น"
      aria-describedby="scene-help" onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); setRotation((r) => r + (e.key === "ArrowLeft" ? -0.22 : 0.22)); }
      }}>
      {enabled && supported ? <SceneBoundary><EcosystemCanvas key={reset} selected={selected} onSelect={setSelected}
        expanded={expanded} animate={autoRotate && visible} rotation={rotation} /></SceneBoundary> : <ScenePoster />}
      {!enabled && <button className="button scene-enable" type="button" disabled={supported === false} onClick={() => setEnabled(true)}>
        {supported === false ? "แสดงภาพสำรอง" : "เปิดฉาก Interactive 3D ↗"}
      </button>}
      <div className="scene-axis" aria-hidden="true"><span />Y <span />X / Z</div>
    </div>
    <div className="layer-tabs" role="group" aria-label="เลือกชั้นเทคโนโลยี">
      <button type="button" aria-pressed={selected === null} onClick={() => setSelected(null)}>Overview</button>
      {solutions.map((s, i) => <button type="button" key={s.slug} aria-pressed={selected === i} onClick={() => setSelected(i)}>{s.number} {s.short}</button>)}
    </div>
    <div className="scene-caption" aria-live="polite"><strong>{active?.title ?? "From devices to insights."}</strong>
      <p>{active?.summary ?? "สำรวจการเชื่อมต่อจากฮาร์ดแวร์ ผ่านโปรโตคอล สู่ระบบวิเคราะห์พลังงาน"}</p>
      {active && <Link className="text-link" href={`/solutions/${active.slug}/`}>ดูรายละเอียด ↗</Link>}
    </div>
    <div className="scene-controls">
      <button type="button" disabled={!enabled || !supported} aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "ยุบชั้น" : "แยกชั้น"}</button>
      <button type="button" disabled={!enabled || !supported} aria-pressed={autoRotate} onClick={() => setAutoRotate(!autoRotate)}>{autoRotate ? "หยุดหมุน" : "หมุนอัตโนมัติ"}</button>
      <button type="button" disabled={!enabled || !supported} onClick={() => { setRotation(0); setSelected(null); setExpanded(true); setAutoRotate(false); setReset((r) => r + 1); }}>รีเซ็ต</button>
      <span id="scene-help">ลากเพื่อหมุน · ใช้ปุ่ม ← → ได้</span>
    </div>
    <p className="scene-disclaimer">Conceptual 3D illustration — ไม่ใช่แบบวิศวกรรมหรือข้อมูลระบบจริง</p>
  </div>;
}
