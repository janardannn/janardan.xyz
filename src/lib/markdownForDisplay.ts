import { defaultUrlTransform } from "react-markdown";

/**
 * Obsidian-style embeds → CommonMark images or videos.
 *
 * Size (optional, pixels):
 * - `![[path-or-url|width]]` → width only
 * - `![[path-or-url|width|height]]` → width + height
 */
export function wikiEmbedsToMarkdown(md: string) {
  // A very permissive regex for ![[ ... ]]
  return md.replace(/!\[\[([^\]]+)\]\]/g, (_m, content) => {
    const parts = content.split('|');
    const url = parts[0].trim();
    const rest = parts.slice(1).join('|');

    // Remove any accidental angle brackets if the user typed them
    const cleanUrl = url.replace(/^<|>/g, '');
    
    // Check extension for video
    const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(cleanUrl);
    const prefix = isVideo ? 'video' : 'image';
    
    // Markdown links with spaces MUST be wrapped in <>
    const needsAngleBrackets = /\s/.test(cleanUrl);
    const dest = needsAngleBrackets ? `<${cleanUrl}>` : cleanUrl;

    if (rest) {
      return `![${prefix}|${rest}](${dest})`;
    }
    return `![${prefix}](${dest})`;
  });
}

/** 
 * Ensures standard markdown images ![alt](url) have their URLs properly 
 * handled if they contain spaces or parentheses.
 */
export function encodeMarkdownImageUrls(md: string) {
  return md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt, url) => {
    const trimmedUrl = url.trim();
    
    // If it's already wrapped in <>, just clean inside
    if (trimmedUrl.startsWith('<') && trimmedUrl.endsWith('>')) {
      return `![${alt}](<${trimmedUrl.slice(1, -1).trim()}>)`;
    }
    
    // If it has spaces or parens, wrap in <>
    if (/\s/.test(trimmedUrl) || /[()]/.test(trimmedUrl)) {
      return `![${alt}](<${trimmedUrl}>)`;
    }
    
    return full;
  });
}

export function prepareMarkdownForDisplay(md: string) {
  if (!md) return "";
  // Order matters: Wiki embeds first, then general encoding
  return encodeMarkdownImageUrls(wikiEmbedsToMarkdown(md));
}

export function markdownUrlTransform(value: string): string {
  if (!value) return "";
  let url = String(value).trim();
  
  // Strip angle brackets
  if (url.startsWith("<") && url.endsWith(">")) {
    url = url.slice(1, -1).trim();
  }

  return url;
}
