import Link from "next/link";

interface SecondaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function SecondaryButton({ href, children, className = "" }: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-2 font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
