import type { ReactNode } from "react";
import Link from "next/link";
export default function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <section className="page-intro container"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>{eyebrow}</span></div>
    <p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <div className="intro-copy">{children}</div>}
  </section>;
}
