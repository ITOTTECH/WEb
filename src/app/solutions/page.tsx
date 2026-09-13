import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import SolutionCards from "@/components/SolutionCards";
import ContactCTA from "@/components/ContactCTA";
import { absoluteUrl } from "@/lib/paths";
export const metadata: Metadata = { title: "Solutions", alternates: { canonical: absoluteUrl("/solutions/") } };
export default function SolutionsPage() {
  return <><PageIntro eyebrow="Solutions" title="Three layers. One connected vision."><p>ความเชี่ยวชาญที่เชื่อมต่อกัน ตั้งแต่อุปกรณ์ภาคสนาม การสื่อสารระหว่างระบบ ไปจนถึงการวิเคราะห์ข้อมูลพลังงาน</p></PageIntro>
    <section className="container section section-after-intro"><SolutionCards /></section><ContactCTA /></>;
}
