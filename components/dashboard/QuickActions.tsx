import Link from "next/link";

interface QuickActionProps {
  title: string;
  description: string;
  href: string;
}

export default function QuickAction({
  title,
  description,
  href,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-slatenpm run dev-200 bg-white p-5 transition hover:border-orange-500 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-[#102A43]">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </Link>
  );
}