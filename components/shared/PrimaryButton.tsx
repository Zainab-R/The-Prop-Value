import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function PrimaryButton({ href, children, className = "" }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-accent-foreground transition hover:bg-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
