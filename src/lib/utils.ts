export function bookPath(path = "/"): string {
  if (path === "/") {
    return "/elastic-playbook";
  }

  return `/elastic-playbook${path}`;
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
