/** Turn `building-things` into `Building things` for card labels. */
export function formatPostCategoryLabel(raw: string) {
  return raw
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** Primary topic label — mono, signal-coloured, no pill. */
export const postCategoryBadgeClass = "t-label text-signal";

/** Secondary tag chips (TypeScript, Docker, …). */
export const postTagBadgeClass = "chip";

export function tagsExcludingCategory(tags: string[], category: string) {
  const c = category.toLowerCase();
  return tags.filter((t) => t.toLowerCase() !== c);
}
