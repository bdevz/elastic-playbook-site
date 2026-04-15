export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;

  if (path === "/") {
    return `${base}/`;
  }

  return `${base}${path}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function sortByPublishedDesc<T extends { data: { published: string } }>(
  items: T[],
): T[] {
  return [...items].sort((left, right) => {
    return (
      new Date(right.data.published).getTime() -
      new Date(left.data.published).getTime()
    );
  });
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, "https://bharats.com").toString();
}

export function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
