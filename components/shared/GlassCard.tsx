interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`.trim()}
    >
      {children}
    </div>
  );
}
