import GithubSlugger from "github-slugger";

export type TocItem = { depth: 2 | 3; text: string; id: string };

function stripInlineMd(raw: string): string {
  return raw
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/** Extract h2/h3 outline; IDs match `rehype-slug` (GitHub slugger). */
export function extractMarkdownToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();
    const m = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    if (depth !== 2 && depth !== 3) continue;
    const text = stripInlineMd(m[2]);
    if (!text) continue;
    const id = slugger.slug(text);
    items.push({ depth, text, id });
  }
  return items;
}
