import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.08}>
          <p className="mt-3 text-muted max-w-xl">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
