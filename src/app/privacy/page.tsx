import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/components/site/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site collects, why, and what it never does with it. Including a straight account of the analytics running here.",
  alternates: { canonical: "/privacy" },
};

/**
 * Disclosure is written against what the GTS tracker and the Visitor model
 * actually store, rather than the generic "browser type, device, IP address"
 * this page used to claim. The fingerprinting in particular is unusual enough
 * that it deserves naming outright.
 */
const sections: LegalSection[] = [
  {
    heading: "The short version",
    body: "This is a personal site. I run my own analytics on it rather than Google Analytics or Mixpanel, which means the data stays with me and is never sold, shared or used to advertise to you. It also means I collect more detail than a typical portfolio site, so the rest of this page says exactly what.",
  },
  {
    heading: "What gets collected automatically",
    body: "Every visit records the following. None of it requires you to type anything.",
    list: [
      "Pages viewed, time spent on each, and how far down you scrolled",
      "Browser, operating system, and device type",
      "Screen size, colour depth, pixel ratio, touch points, CPU cores and device memory",
      "Language, timezone, and network connection type",
      "Approximate location — country, region and city — derived from your IP address by the hosting provider",
      "Your IP address",
      "Referring site and any campaign parameters in the URL",
    ],
  },
  {
    heading: "Device fingerprinting",
    body: "The tracker also generates a fingerprint: a hash derived from your user agent, screen dimensions, timezone, language and hardware concurrency, plus separate canvas, WebGL and audio rendering signatures. Together these identify your browser fairly reliably across visits without using cookies.",
    note: "This is how repeat visits get linked together. It is the most privacy-sensitive thing this site does, which is why it is stated plainly rather than buried under 'technical information'.",
  },
  {
    heading: "What you give me directly",
    body: "If you email me or book a call, I have whatever you chose to put in that message. That is the only data you actively hand over — this site has no forms, no accounts and no sign-up.",
  },
  {
    heading: "Why any of this exists",
    list: [
      "To see which writing people actually read and finish",
      "To find out what is broken, and on which devices",
      "To reply to you if you got in touch",
      "Honestly: because I built the analytics engine myself and I like watching it work",
    ],
  },
  {
    heading: "What I never do",
    list: [
      "Sell or rent your data to anyone",
      "Share it with third parties, except where the law requires it",
      "Run advertising, ad networks or third-party trackers",
      "Email you anything you did not ask for",
      "Use any of it to make automated decisions about you",
    ],
  },
  {
    heading: "Where it lives",
    body: "Analytics are stored in a Postgres database hosted on Neon, and the site runs on Vercel. Those two providers process the data on my behalf. Nothing is copied anywhere else.",
  },
  {
    heading: "Cookies",
    body: "No tracking cookies. Session identifiers are held in your browser's sessionStorage and disappear when you close the tab; your theme preference is stored locally so the site remembers whether you wanted dark or light.",
  },
  {
    heading: "Your rights",
    body: "Email me and I will delete everything associated with you, tell you what I hold, or stop collecting it going forward. No forms, no process — I will just do it. If you would rather not be measured at all, any content blocker or a browser with tracking protection will stop the tracker from loading.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy"
      lede="I run my own analytics here, which means more detail than most personal sites collect. This page says exactly what, and what never happens to it."
      updated="30 September 2026"
      sections={sections}
    />
  );
}
