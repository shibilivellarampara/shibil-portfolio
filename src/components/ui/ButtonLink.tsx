import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:brightness-110",
  secondary:
    "border border-line bg-card text-ink hover:border-accent/60 hover:text-accent",
  ghost: "text-muted hover:text-ink",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant };

export default function ButtonLink({
  variant = "secondary",
  className = "",
  href,
  children,
  ...rest
}: Props) {
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
