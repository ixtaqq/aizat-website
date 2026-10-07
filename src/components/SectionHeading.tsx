interface SectionHeadingProps {
  title: string;
  children?: React.ReactNode;
}

export function SectionHeading({ title, children }: SectionHeadingProps) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
