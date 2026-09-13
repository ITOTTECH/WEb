import Link from "next/link";
import { site } from "@/data/site";
export default function ContactCTA() {
  return <section className="contact-cta"><div className="container cta-inner">
    <div><p className="eyebrow">LET’S CONNECT</p><h2>Start with your<br />engineering challenge.</h2>
      <p>ร่วมออกแบบความเป็นไปได้ใหม่ ระหว่างอุปกรณ์ ระบบ และข้อมูล</p>
      <div className="contact-inline"><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.phoneHref}>{site.phone}</a></div></div>
    <Link href="/contact/" className="button button-gold">ติดต่อทีมงาน <span aria-hidden="true">↗</span></Link>
  </div></section>;
}
