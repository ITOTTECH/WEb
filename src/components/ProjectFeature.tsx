import Image from "next/image";
import Link from "next/link";
import { project } from "@/data/site";
import { assetPath } from "@/lib/paths";
export default function ProjectFeature() {
  return <article className="project-feature"><Link href="/projects/pea-paro/" className="project-image" aria-label="อ่านโครงการ PEA-PARO">
    <Image src={assetPath("images/pea-paro.webp")} width={1160} height={656} alt="PEA-PARO — ภาพนำเสนอโครงการจาก Company Profile 2026" sizes="(max-width: 800px) 100vw, 55vw" />
  </Link><div className="project-copy"><p className="eyebrow">FEATURED PROJECT / 2026</p><h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p>
    <p>{project.summary}</p><p className="micro-copy">นำเสนอใน Company Profile · {project.context}</p>
    <Link className="text-link" href="/projects/pea-paro/">Explore the project <span aria-hidden="true">↗</span></Link>
  </div></article>;
}
