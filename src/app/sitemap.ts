import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/paths";
import { solutions } from "@/data/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/solutions/", "/technology/", "/projects/", "/projects/pea-paro/", "/about/", "/contact/", ...solutions.map((s) => `/solutions/${s.slug}/`)];
  return routes.map((route) => ({ url: absoluteUrl(route), changeFrequency: "monthly", priority: route === "/" ? 1 : 0.7 }));
}
