import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ProjectFeature from "@/components/ProjectFeature";
import ContactCTA from "@/components/ContactCTA";
import { absoluteUrl } from "@/lib/paths";
export const metadata: Metadata = { title: "Projects", alternates: { canonical: absoluteUrl("/projects/") } };
export default function ProjectsPage() {
  return <><PageIntro eyebrow="Projects" title="Engineering ideas into possibilities."><p>ตัวอย่างการประยุกต์ใช้เทคโนโลยีจาก Company Profile 2026 โดยแสดงบริบท แนวคิด และเป้าหมายของโครงการ</p></PageIntro>
    <section className="container section section-after-intro"><ProjectFeature /></section><ContactCTA /></>;
}
