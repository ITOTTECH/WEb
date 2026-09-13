import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import ContactCTA from "@/components/ContactCTA";
import { project } from "@/data/site";
import { absoluteUrl, assetPath } from "@/lib/paths";
export const metadata: Metadata = { title: "PEA-PARO", description: project.summary, alternates: { canonical: absoluteUrl("/projects/pea-paro/") } };
export default function ProjectPage() {
  return <><PageIntro eyebrow="Projects / PEA-PARO" title={project.title}><p>{project.subtitle}</p></PageIntro>
    <section className="container section section-after-intro"><Image className="case-cover" src={assetPath("images/pea-paro.webp")} width={1160} height={656} alt="ภาพนำเสนอโครงการ PEA-PARO" priority />
      <div className="case-facts"><div><span className="eyebrow">CONTEXT</span><strong>{project.context}</strong></div><div><span className="eyebrow">GRID CONTEXT</span><strong>{project.area}</strong></div><div><span className="eyebrow">FOCUS</span><strong>Load Forecasting & Rooftop Solar</strong></div></div>
      <div className="prose"><h2>Proactive energy. Informed decisions.</h2><p>{project.summary}</p><p>Company Profile ระบุบริบทของโครงการเป็นโครงข่ายไฟฟ้าเกาะเต่า โดยมีฟังก์ชันหลักด้านการพยากรณ์ความต้องการใช้ไฟฟ้า และนำเสนอแนวทางประมวลผลข้อมูลพลังงานควบคู่กับการบริหารจัดการพลังงานแสงอาทิตย์บนหลังคา</p><h3>เป้าหมายของโครงการ</h3><p>{project.goal}</p></div>
      <figure className="dashboard-figure"><Image src={assetPath("images/pea-paro-dashboard.webp")} width={1882} height={934} alt="ตัวอย่างหน้าจอระบบ PEA-PARO ที่ปรากฏใน Company Profile" /><figcaption>ภาพหน้าจอจาก Company Profile 2026 หน้า 11 — ตัวเลขในภาพไม่ใช่ข้อมูลระบบสดบนเว็บไซต์นี้</figcaption></figure>
      <p className="note">เนื้อหานี้สรุปแนวคิดและเป้าหมายจาก Company Profile หน้า 10–11 ไม่ได้กล่าวอ้างผลประหยัด รางวัล หรือผลการตรวจรับที่เอกสารไม่ได้ระบุ</p>
      <Link className="text-link" href="/projects/">← กลับไปยัง Projects</Link>
    </section><ContactCTA /></>;
}
