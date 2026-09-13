// Generates a JSON FILE at build time. No API server is required after deployment.
import { basePath, siteOrigin } from "@/lib/paths";
export const dynamic = "force-static";
export function GET() { return Response.json({ basePath, siteOrigin }); }
