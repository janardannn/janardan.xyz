import Reveal from "@/components/site/Reveal";

/**
 * Left-aligned, hairline-ruled, index-numbered. Deliberately never centred —
 * the centred section header was the clearest template tell in the old design.
 */
export default function SectionHeader({
  index,
  label,
  title,
  lede,
  action,
}: {
  index: string;
  label: string;
  title: string;
  lede?: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal as="header" className="rule-t pt-4 mb-10 md:mb-14">
      <div className="flex items-baseline justify-between gap-6 mb-6">
        <div className="t-label text-muted-foreground flex items-baseline gap-3">
          <span className="text-signal">{index}</span>
          <span>{label}</span>
        </div>
        {action}
      </div>

      <div className="grid gap-4 md:grid-cols-12 md:gap-6 items-end">
        <h2 className="t-display t-h2 md:col-span-7">{title}</h2>
        {lede ? (
          <p className="t-mono text-muted-foreground md:col-span-4 md:col-start-9">
            {lede}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
