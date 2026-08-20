interface Props {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: Props) {
  return (
    <div className={`mx-auto mb-16 max-w-3xl text-center ${className}`.trim()}>
      <h2 className="font-heading text-4xl font-bold tracking-tight text-primary lg:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-lg text-slate-600">
        {subtitle}
      </p>
    </div>
  );
}
