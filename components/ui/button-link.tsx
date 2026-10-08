import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "text";
};

const variants = {
  primary: "button-primary rounded-full px-5 text-white",
  secondary: "rounded-full border border-white/20 px-5 text-white/90 hover:border-white/40 hover:text-white",
  light: "button-primary rounded-full px-5 text-white",
  text: "text-blue-600 hover:text-blue-700",
};

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...props}
      className={`micro-interaction inline-flex min-h-11 items-center justify-center gap-2 font-semibold transition ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
