import { getCollection } from "astro:content";
import { absoluteUrl, bookPath, sortByPublishedDesc, xmlEscape } from "../lib/utils";

export async function GET() {
  const articles = sortByPublishedDesc(await getCollection("articles"));
  const items = articles
    .map((entry) => {
      const link = absoluteUrl(bookPath(`/articles/${entry.id}`));
      return `
        <item>
          <title>${xmlEscape(entry.data.title)}</title>
          <link>${xmlEscape(link)}</link>
          <guid>${xmlEscape(link)}</guid>
          <pubDate>${new Date(entry.data.published).toUTCString()}</pubDate>
          <description>${xmlEscape(entry.data.summary)}</description>
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>The Elastic Playbook</title>
      <link>${xmlEscape(absoluteUrl(bookPath("/")))}</link>
      <description>${xmlEscape("Canonical articles and resources for The Elastic Playbook.")}</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
