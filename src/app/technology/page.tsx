import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Hero3D from "@/components/Hero3D";
import ContactCTA from "@/components/ContactCTA";
import { solutions } from "@/data/site";
import { absoluteUrl } from "@/lib/paths";
export const metadata: Metadata = { title: "Technology & Interactive 3D", alternates: { canonical: absoluteUrl("/technology/") } };
export default function TechnologyPage() {
  return <><PageIntro eyebrow="Technology" title="Explore the IT–OT ecosystem."><p>โครงสร้างสามชั้นของเทคโนโลยีที่เชื่อมโยงโลกกายภาพและโลกดิจิทัล เลือกแต่ละชั้นเพื่อสำรวจความเชี่ยวชาญของบริษัท</p></PageIntro>
    <section className="container section section-after-intro technology-grid"><Hero3D /><div className="technology-description">
      {solutions.map((s) => <article className="capability" key={s.slug}><span className="card-number">{s.number}</span><div><h2>{s.title}</h2><p>{s.summary}</p></div></article>)}
      <p className="note">ฉาก 3D เป็นภาพอธิบายแนวคิด IT–OT Ecosystem ไม่ใช่แบบจำลองอุปกรณ์จริงหรือ Digital Twin ที่เชื่อมต่อข้อมูลสด</p>
    </div></section><ContactCTA /></>;
}
