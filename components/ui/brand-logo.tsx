import Image from "next/image";

type BrandLogoProps = {
  homeLabel: string;
  homeHref?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function BrandLogo({ homeLabel, homeHref = "#top", priority = false, className = "", imageClassName = "h-10" }: BrandLogoProps) {
  return (
    <a href={homeHref} aria-label={homeLabel} className={`flex w-fit items-center ${className}`}>
      <Image
        src="/treffix-logo.png"
        alt=""
        width={2798}
        height={796}
        sizes="150px"
        priority={priority}
        className={`${imageClassName} shrink-0 object-contain`}
        style={{ width: "auto" }}
      />
    </a>
  );
}
