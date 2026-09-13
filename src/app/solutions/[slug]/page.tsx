import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions } from "@/data/site";
import { absoluteUrl } from "@/lib/paths";
import PageIntro from "@/components/PageIntro";
import ContactCTA from "@/components/ContactCTA";
import { MiniVisual } from "@/components/SolutionCards";
// All slugs must be known at build time on GitHub Pages.
export const dynamicParams = false;
export function generateStaticParams() { return solutions.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  return { title: solution?.title ?? "Solution", description: solution?.summary, alternates: { canonical: absoluteUrl(`/solutions/${slug}/`) } };
}
export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const index = solutions.findIndex((s) => s.slug === slug);
  if (index < 0) notFound();
  const solution = solutions[index];
  return <><PageIntro eyebrow={`Solutions / ${solution.short}`} title={solution.title}><p>{solution.intro}</p></PageIntro>
    <section className="container section section-after-intro"><div className="detail-grid"><div className="detail-visual"><MiniVisual index={index} /><p className="eyebrow">LAYER {solution.number} / {solution.short.toUpperCase()}</p></div>
      <div>{solution.capabilities.map((c, i) => <article className="capability" key={c.title}><span className="card-number">0{i + 1}</span><div><h2>{c.title}</h2><p>{c.body}</p></div></article>)}</div></div>
      <div className="tag-list tag-list-large">{solution.tags.map((t) => <span key={t}>{t}</span>)}</div>
      <Link href="/solutions/" className="text-link">← กลับไปยัง Solutions</Link></section><ContactCTA /></>;
}
