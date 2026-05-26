import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-gradient-to-r from-brand-500 to-brand-400 text-white font-semibold hover:shadow-lg hover:shadow-brand-500/25",
  secondary:
    "glass text-brand-700 hover:bg-white border-brand-500/20",
  ghost: "text-brand-600 hover:text-brand-800 hover:bg-brand-500/10",
};

export default function Button({
  children,
  variant = "primary",
  to,
  href,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm transition-all duration-300 " +
    (variants[variant] || variants.primary) +
    " " +
    className;

  if (to) {
    return (
      <Link to={to} className={base} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={base} {...props}>
        {children}
      </a>
    );
  }

  const { type = "button", ...rest } = props;
  return (
    <button type={type} className={base} {...rest}>
      {children}
    </button>
  );
}
