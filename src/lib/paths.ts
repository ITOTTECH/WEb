/** Public assets do not receive Next.js basePath automatically. */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
export function assetPath(path: string): string {
  return `${basePath}/${path.replace(/^\/+/, "")}`;
}
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000").replace(/\/+$/, "");
export function absoluteUrl(path = "/"): string {
  return `${siteOrigin}${assetPath(path)}`;
}
