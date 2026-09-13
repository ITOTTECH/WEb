import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/paths";
export const metadata: Metadata = { title: "Contact", alternates: { canonical: absoluteUrl("/contact/") } };
export default function ContactPage() {
  const subject = encodeURIComponent("ติดต่อ IT OT TECH — ข้อมูลโครงการ");
  const body = encodeURIComponent("ชื่อผู้ติดต่อ:\nหน่วยงาน:\nอีเมล / โทรศัพท์:\nหัวข้อที่ต้องการปรึกษา:\nรายละเอียดโดยย่อ:\n");
  return <><PageIntro eyebrow="Contact" title="Let’s connect your next idea."><p>เริ่มต้นจากโจทย์ของคุณ แล้วร่วมสำรวจความเป็นไปได้ด้านอุปกรณ์ การเชื่อมต่อระบบ และข้อมูลพลังงาน</p></PageIntro>
    <section className="container section section-after-intro contact-grid"><div className="contact-card"><p className="eyebrow">DIRECT CONTACT</p><h2>{site.name}</h2><p>{site.thaiName}</p>
      <dl><dt>โทรศัพท์</dt><dd><a href={site.phoneHref}>{site.phone}</a></dd><dt>อีเมล</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd><dt>Facebook</dt><dd><a href={site.facebook} target="_blank" rel="noopener noreferrer">Itot-tech ↗</a></dd></dl>
      <a className="button" href={`mailto:${site.email}?subject=${subject}&body=${body}`}>เปิดโปรแกรมอีเมล ↗</a><p className="micro-copy">ปุ่มนี้เปิดโปรแกรมอีเมลของคุณ ไม่ใช่แบบฟอร์มส่งข้อมูลผ่านเว็บไซต์</p></div>
      <div className="contact-office"><p className="eyebrow">R&D OFFICE</p><h2>Research.<br />Develop.<br /><span>Connect.</span></h2><address>{site.office}</address><p>กรุณาติดต่อทีมงานเพื่อนัดหมายก่อนเข้าพบ</p>
        <div className="note"><strong>ข้อมูลที่ช่วยให้เริ่มต้นได้ชัดเจน</strong><p>ระบุโจทย์ของโครงการ ประเภทอุปกรณ์หรือระบบ และขอบเขตงานเบื้องต้น โดยไม่ส่งรหัสผ่านหรือข้อมูลระบบที่เป็นความลับ</p></div></div>
    </section></>;
}
