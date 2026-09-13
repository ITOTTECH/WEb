import type { Metadata } from "next";
import Link from "next/link";
import Hero3D from "@/components/Hero3D";
import SolutionCards from "@/components/SolutionCards";
import ProjectFeature from "@/components/ProjectFeature";
import ContactCTA from "@/components/ContactCTA";
import { absoluteUrl } from "@/lib/paths";
export const metadata: Metadata = { alternates: { canonical: absoluteUrl("/") } };
export default function Home() {
  return <>
    <section className="hero container">
      <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> IT–OT INTEGRATION / SMART GRID / R&D</p>
        <h1>Connecting<br />IT & OT.<br /><span>Engineering<br />smarter energy.</span></h1>
        <p className="hero-thai">ออกแบบอุปกรณ์ เชื่อมต่อระบบ<br className="desktop-break" /> ต่อยอดข้อมูลพลังงาน</p>
        <p className="hero-description">จากฮาร์ดแวร์ภาคสนามสู่ระบบดิจิทัล<br />เพื่อโครงข่ายไฟฟ้าอัจฉริยะและอุตสาหกรรมแห่งอนาคต</p>
        <div className="button-row"><Link href="/contact/" className="button">ติดต่อทีมงาน <span aria-hidden="true">↗</span></Link>
          <Link href="/technology/" className="button button-outline">สำรวจเทคโนโลยี</Link></div>
        <a href="#solutions" className="hero-scroll"><span aria-hidden="true">↓</span><span>FROM DEVICES TO INSIGHTS<br />EXPLORE OUR ECOSYSTEM</span></a>
      </div><Hero3D />
    </section>
    <div className="expertise-band"><div className="container"><span>EMBEDDED SYSTEMS</span><i /><span>DLMS/COSEM</span><i /><span>AMI · HES · MDMS</span><i /><span>ENERGY ANALYTICS</span></div></div>
    <section className="section container" id="solutions"><div className="section-heading"><div><p className="eyebrow">OUR SOLUTIONS</p><h2>Three layers.<br />One connected vision.</h2></div>
      <p>พัฒนาเทคโนโลยีและนวัตกรรมเพื่อเชื่อมโยง IT และ OT<br />ตั้งแต่อุปกรณ์ โปรโตคอล ไปจนถึงข้อมูลพลังงาน</p></div><SolutionCards /></section>
    <section className="section section-projects container"><div className="section-heading"><div><p className="eyebrow">PROJECT SHOWCASE</p><h2>Ideas, connected<br />to real challenges.</h2></div><Link className="text-link" href="/projects/">ดูโครงการทั้งหมด ↗</Link></div><ProjectFeature /></section>
    <ContactCTA />
  </>;
}
