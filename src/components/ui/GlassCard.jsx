export default function GlassCard({ children, className = "", onClick }) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick(e) : undefined}
      className={`glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-brand-500/5 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
