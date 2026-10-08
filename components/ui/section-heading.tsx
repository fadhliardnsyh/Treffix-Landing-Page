import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  dark?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  dark = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p
        className={`mb-5 flex items-center gap-3 text-[10px] font-bold tracking-[.17em] ${dark ? "text-blue-300" : "text-blue-600"}`}
      >
        <span className={`h-px w-7 ${dark ? "bg-blue-400" : "bg-blue-500"}`} />
        {eyebrow}
      </p>
      {title && (
        <h2
          className={`text-[37px] font-semibold leading-[1.1] tracking-[-.045em] sm:text-[48px] ${dark ? "text-white" : "text-[#0a1c37]"}`}
        >
          {title}
        </h2>
      )}
      {description && (
        <p className={`mt-5 max-w-[600px] text-[14px] leading-7 ${dark ? "text-blue-50/70" : "text-slate-500"}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
