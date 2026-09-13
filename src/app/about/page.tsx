import type { Metadata } from "next";
import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import ContactCTA from "@/components/ContactCTA";
import { site, solutions } from "@/data/site";
import { absoluteUrl, assetPath } from "@/lib/paths";
export const metadata: Metadata = { title: "About", alternates: { canonical: absoluteUrl("/about/") } };
export default function AboutPage() {
  return <><PageIntro eyebrow="About IT OT TECH" title="Bridging the physical and the digital."><p>นวัตกรรมบูรณาการ IT และ OT เพื่อโครงข่ายไฟฟ้าอัจฉริยะและอุตสาหกรรมดิจิทัล</p></PageIntro>
    <section className="container section section-after-intro"><div className="about-grid"><div className="about-mark"><Image src={assetPath("images/logo.png")} width={220} height={236} alt="โลโก้ IT OT TECH" /><p>{site.name}</p></div>
      <div className="prose"><p className="eyebrow">SMART ELECTRONICS & SYSTEM INTEGRATION</p><h2>{site.thaiName}</h2><p>ดำเนินงานด้านวิศวกรรม การออกแบบและพัฒนาระบบสมองกลฝังตัว การวิจัยและพัฒนาเทคโนโลยี Smart Grid ตลอดจนการให้คำปรึกษาด้านเทคโนโลยีและนวัตกรรม</p><p>เราเชื่อมโยงงานออกแบบฮาร์ดแวร์ มาตรฐานการสื่อสาร และการวิเคราะห์ข้อมูลพลังงาน เพื่อให้แต่ละส่วนทำงานร่วมกันเป็นระบบ</p></div></div>
      <div className="pillars">{solutions.map((s) => <article key={s.slug}><span className="card-number">{s.number}</span><h3>{s.short}</h3><p>{s.summary}</p></article>)}</div>
    </section><ContactCTA /></>;
}
