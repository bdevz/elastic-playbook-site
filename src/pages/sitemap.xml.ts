import { getCollection } from "astro:content";
import { absoluteUrl, bookPath, xmlEscape } from "../lib/utils";

export async function GET() {
  const articles = await getCollection("articles");
  const resources = await getCollection("resources");

  const staticPages = [
    "/",
    bookPath("/"),
    bookPath("/book"),
    bookPath("/articles"),
    bookPath("/resources"),
    bookPath("/workshops"),
    bookPath("/about"),
    "/rss.xml",
  ];

  const dynamicPages = [
    ...articles.map((entry) => bookPath(`/articles/${entry.id}`)),
    ...resources.map((entry) => bookPath(`/resources/${entry.id}`)),
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
