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
      className={`rounded-lg border border-white/30 px-5 py-2 text-white transition hover:bg-blue-800 ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
