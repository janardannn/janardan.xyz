import Link from "next/link";
import Reveal from "@/components/site/Reveal";

export type LegalSection = {
  heading: string;
  body?: string;
  list?: string[];
  note?: string;
};

/**
 * Shared shell for the privacy and terms pages.
 *
 * Both previously carried their own hardcoded dark gradient and ignored the
 * theme tokens entirely, so they broke in light mode. Now they are ordinary
 * ruled documents in the site's own system: numbered sections, mono labels,
 * prose body.
 */
export default function LegalDocument({
  eyebrow,
  title,
  lede,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="rule-b grid-field">
        <div className="shell pt-8 pb-12">
          <Link
            href="/"
            className="link-mono t-label text-muted-foreground mb-12 inline-flex"
          >
            <span aria-hidden="true">←</span> Index
          </Link>

          <div className="grid gap-x-6 gap-y-6 md:grid-cols-12 items-end">
            <div className="md:col-span-7">
              <p className="t-label text-signal mb-5">{eyebrow}</p>
              <h1 className="t-display t-h2 text-foreground">{title}</h1>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <p className="t-mono text-muted-foreground">{lede}</p>
              <p className="t-label text-muted-foreground mt-4">
                Last updated {updated}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="shell py-4 pb-24">
        <ol>
          {sections.map((section, i) => (
            <Reveal as="li" key={section.heading} index={i} className="rule-b">
              <div className="grid gap-x-6 gap-y-4 py-9 md:grid-cols-12">
                <div className="md:col-span-2 flex md:block items-baseline gap-3">
                  <span className="t-label text-signal tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="md:col-span-8">
                  <h2 className="t-display t-h3 text-foreground mb-4">
                    {section.heading}
                  </h2>

                  {section.body ? (
                    <p className="t-mono text-muted-foreground max-w-2xl">
                      {section.body}
                    </p>
                  ) : null}

                  {section.list ? (
                    <ul className="mt-4 space-y-2 max-w-2xl">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            className="t-mono text-signal shrink-0 select-none"
                            aria-hidden="true"
                          >
                            —
                          </span>
                          <span className="t-mono text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.note ? (
                    <p className="t-mono text-muted-foreground max-w-2xl mt-4 rule-l pl-4">
                      {section.note}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="pt-9">
          <div className="grid gap-x-6 gap-y-4 md:grid-cols-12">
            <div className="md:col-span-2">
              <span className="t-label text-muted-foreground">Contact</span>
            </div>
            <div className="md:col-span-8">
              <p className="t-mono text-muted-foreground mb-4 max-w-2xl">
                Questions about any of this, or a request about your own data —
                email me and I&apos;ll answer.
              </p>
              <a
                href="mailto:janardanhazarika20@gmail.com"
                className="link-mono t-label"
              >
                <span aria-hidden="true">→</span> janardanhazarika20@gmail.com
              </a>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
