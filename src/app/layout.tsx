import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/data/site";
import { absoluteUrl, assetPath } from "@/lib/paths";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "IT OT TECH | Connecting IT & OT", template: "%s | IT OT TECH" },
  description: site.description,
  icons: { icon: assetPath("images/logo.png") },
  openGraph: { type: "website", siteName: site.name, locale: "th_TH", title: site.tagline, description: site.description,
    images: [{ url: absoluteUrl("images/pea-paro.webp"), width: 1160, height: 656, alt: "IT OT TECH — PEA-PARO project showcase" }] },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="th"><body><a className="skip-link" href="#main-content">ข้ามไปยังเนื้อหาหลัก</a><SiteHeader />
    <main id="main-content">{children}</main><SiteFooter /></body></html>;
}
