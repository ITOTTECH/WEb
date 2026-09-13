import Image from "next/image";
import Link from "next/link";
import { site, nav } from "@/data/site";
import { assetPath } from "@/lib/paths";
export default function SiteFooter() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-grid">
      <div><Link href="/" className="brand"><Image src={assetPath("images/logo.png")} width={40} height={43} alt="" />
        <span><strong>{site.name}</strong><small>{site.thaiName}</small></span></Link>
        <p className="footer-tagline">Smarter systems.<br />A more connected tomorrow.</p></div>
      <nav aria-label="เมนูท้ายเว็บไซต์">{nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav>
      <div className="footer-contact"><span className="eyebrow">GET IN TOUCH</span>
        <a href={`mailto:${site.email}`}>{site.email}</a><a href={site.phoneHref}>{site.phone}</a>
        <a href={site.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 {site.name}</span><span>IT–OT Integration · Smart Grid · Research & Development</span></div>
  </div></footer>;
}
