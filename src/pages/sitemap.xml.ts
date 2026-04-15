import { getCollection } from "astro:content";
import { absoluteUrl, xmlEscape } from "../lib/utils";

export async function GET() {
  const articles = await getCollection("articles");
  const resources = await getCollection("resources");

  const staticPages = [
    "/elastic-playbook/",
    "/elastic-playbook/book",
    "/elastic-playbook/articles",
    "/elastic-playbook/resources",
    "/elastic-playbook/workshops",
    "/elastic-playbook/about",
    "/elastic-playbook/rss.xml",
  ];

  const dynamicPages = [
    ...articles.map((entry) => `/elastic-playbook/articles/${entry.id}`),
    ...resources.map((entry) => `/elastic-playbook/resources/${entry.id}`),
  ];

  const urls = [...staticPages, ...dynamicPages]
    .map((path) => `<url><loc>${xmlEscape(absoluteUrl(path))}</loc></url>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
