// GitHub Pages hosts files, not a running Next.js server.
// The workflow obtains the correct path from actions/configure-pages.
const rawPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawPath === "/" ? "" : rawPath.replace(/\/+$/, "");
if (basePath && !/^\/[a-zA-Z0-9._~/-]+$/.test(basePath)) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or a path such as /itot-tech");
}
if (basePath.includes("..") || basePath.includes("//")) {
  throw new Error("NEXT_PUBLIC_BASE_PATH contains an invalid path segment");
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default nextConfig;
