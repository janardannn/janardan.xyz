/** Turn `building-things` into `Building things` for card labels. */
export function formatPostCategoryLabel(raw: string) {
  return raw
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** Primary topic pill — indigo, matching unified accent. */
export const postCategoryBadgeClass =
  "inline-flex rounded-md border border-[var(--pop)]/25 bg-[var(--pop)]/8 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[var(--pop)]";

/** Secondary tag chips (TypeScript, Docker, …). */
export const postTagBadgeClass =
  "inline-flex rounded-md border border-foreground/8 bg-foreground/[0.03] px-2 py-0.5 text-[11px] font-medium text-muted-foreground";

export function tagsExcludingCategory(tags: string[], category: string) {
  const c = category.toLowerCase();
  return tags.filter((t) => t.toLowerCase() !== c);
}
