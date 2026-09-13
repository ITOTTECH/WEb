import Link from "next/link";
import { solutions } from "@/data/site";
export function MiniVisual({ index }: { index: number }) {
  return <div className={`mini-visual mini-${index}`} aria-hidden="true">
    <div className="mini-board"><span className="mini-chip" /><span className="mini-module one" /><span className="mini-module two" />
      <span className="mini-module three" /><i /><i /><i /></div>
  </div>;
}
export default function SolutionCards() {
  return <div className="solution-grid">{solutions.map((s, i) => <Link className="solution-card" href={`/solutions/${s.slug}/`} key={s.slug}>
    <div className="card-top"><span className="card-number">{s.number}</span><span className="circle-arrow" aria-hidden="true">↗</span></div>
    <MiniVisual index={i} /><h3>{s.title}</h3><p>{s.summary}</p>
    <div className="tag-list">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
  </Link>)}</div>;
}
