import { absoluteUrl } from "../lib/utils";

export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
