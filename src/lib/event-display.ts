// Human-readable event descriptions for the analytics dashboard

type Props = Record<string, unknown> | null;

// Approximate scroll-to-section mapping for the homepage
const SCROLL_SECTIONS: Record<number, string> = {
  25: "About",
  50: "Projects",
  75: "Writing",
  100: "Contact / Footer",
};

function titleCase(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function describeEvent(
  name: string,
  properties?: Props,
  path?: string
): string {
  const p = (properties ?? {}) as Record<string, unknown>;

  switch (name) {
    case "scroll_depth": {
      const depth = p.depth as number | undefined;
      if (depth == null) return "Scrolled";
      const section = path === "/" ? SCROLL_SECTIONS[depth] : null;
      return section ? `Scrolled to ${depth}% (~${section})` : `Scrolled to ${depth}%`;
    }

    case "section_view":
      return p.section ? `Viewed ${titleCase(p.section as string)} section` : "Viewed section";

    case "nav_click": {
      const item = p.item as string | undefined;
      const device = p.device as string | undefined;
      const parts = [item ? `Clicked ${item}` : "Nav click"];
      if (device === "mobile") parts.push("(mobile)");
      return parts.join(" ");
    }

    case "cta_click": {
      const label = p.label as string | undefined;
      const target = p.target as string | undefined;
      const readable = label ? titleCase(label) : "CTA";
      return target ? `${readable} → ${titleCase(target)}` : readable;
    }

    case "project_click": {
      const project = p.project as string | undefined;
      const action = p.action as string | undefined;
      const name = project ? project.split(" - ")[0].trim() : "project";
      const verb = action ? titleCase(action) : "Clicked";
      return `${verb}: ${name}`;
    }

    case "social_click": {
      const platform = p.platform as string | undefined;
      return platform ? `Clicked ${titleCase(platform)} link` : "Social link click";
    }

    case "mobile_menu_toggle": {
      const state = p.state as string | undefined;
      return state === "open" ? "Opened mobile menu" : state === "close" ? "Closed mobile menu" : "Toggled mobile menu";
    }

    case "theme_toggle": {
      const theme = p.theme as string | undefined;
      return theme ? `Switched to ${theme} theme` : "Toggled theme";
    }

    case "share_click": {
      const slug = p.slug as string | undefined;
      return slug ? `Shared "${slug}"` : "Shared page";
    }

    case "scroll_to_top":
      return "Scrolled to top";

    case "contact_click": {
      const method = p.method as string | undefined;
      return method ? `Contact via ${titleCase(method)}` : "Contact click";
    }

    case "footer_link": {
      const label = p.label as string | undefined;
      return label ? `Footer: ${titleCase(label)}` : "Footer link click";
    }

    default:
      return titleCase(name);
  }
}

export function describeEventShort(
  name: string,
  properties?: Props,
  path?: string
): string {
  return describeEvent(name, properties, path);
}
