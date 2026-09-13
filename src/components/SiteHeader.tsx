"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { assetPath } from "@/lib/paths";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => { setOpen(false); }, [path]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="IT OT TECH — หน้าแรก">
          <Image src={assetPath("images/logo.png")} width={42} height={45} alt="" priority />
          <span><strong>{site.name}</strong><small>{site.thaiName}</small></span>
        </Link>
        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-nav"
          onClick={() => setOpen(!open)} onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}>
          {open ? "ปิดเมนู ×" : "เมนู ☰"}
        </button>
        <nav id="main-nav" aria-label="เมนูหลัก" className={`main-nav ${open ? "is-open" : ""}`}
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={path?.startsWith(item.href.replace(/\/$/, "")) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact/" className="button button-small">ติดต่อทีมงาน <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
