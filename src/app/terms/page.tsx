import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/components/site/LegalDocument";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms for using this site: what you may do with the writing and code here, and what is offered without warranty.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "The basics",
    body: "This is my personal site — portfolio, writing, and a few experiments. Using it means you are fine with what follows. Nothing here creates a contract between us, and nothing here is professional advice.",
  },
  {
    heading: "What you can do",
    list: [
      "Read, browse and share anything on the site",
      "Link to any page, including individual posts — no permission needed",
      "Quote from the writing with attribution and a link back",
      "Get in touch about work, collaboration, or to tell me I got something wrong",
    ],
  },
  {
    heading: "What you can't do",
    list: [
      "Republish whole articles as your own, or feed them into a product without asking",
      "Use my name, likeness or work to imply I endorse something I do not",
      "Attack the site — scraping at volume, probing for holes, or attempting to reach the admin area",
      "Send spam, malware, or anything harmful through the contact channels",
    ],
  },
  {
    heading: "Who owns what",
    body: "The writing, design and images here are mine unless credited otherwise. Source code for the projects is released separately on GitHub under whatever licence each repository states — those licences govern the code, not this page.",
  },
  {
    heading: "Links out",
    body: "This site links to other people's work, repositories and products. I do not control those and am not responsible for what they do or say once you leave.",
  },
  {
    heading: "No warranty",
    body: "The site is provided as is. I keep it working and try to keep it accurate, but I make no promise that it will be available, correct or up to date, and I am not liable for anything arising from your use of it.",
    note: "The technical writing in particular reflects what was true when I published it. Treat code samples as illustrations rather than something to paste into production unexamined.",
  },
  {
    heading: "Changes",
    body: "I may revise these terms. The date at the top is the honest record of when that last happened, and continuing to use the site means the current version applies.",
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms"
      lede="What you may do with the writing and code here, and the usual reminder that it all comes without warranty."
      updated="30 September 2026"
      sections={sections}
    />
  );
}
