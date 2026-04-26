/** Turn `building-things` into `Building things` for card labels. */
export function formatPostCategoryLabel(raw: string) {
  return raw
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** Primary topic pill — plum (red-purple), not blue or safety orange. */
export const postCategoryBadgeClass =
  "inline-flex rounded-full border border-purple-800/25 bg-purple-950/[0.06] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-purple-950 shadow-sm dark:border-purple-300/35 dark:bg-purple-400/12 dark:text-purple-100";

/** Secondary tag chips (TypeScript, Docker, …). */
export const postTagBadgeClass =
  "inline-flex rounded-full border border-foreground/10 bg-foreground/[0.04] px-2 py-0.5 text-[11px] font-medium text-foreground/85";

export function tagsExcludingCategory(tags: string[], category: string) {
  const c = category.toLowerCase();
  return tags.filter((t) => t.toLowerCase() !== c);
}
