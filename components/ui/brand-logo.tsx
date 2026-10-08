import Image from "next/image";

type BrandLogoProps = {
  homeLabel: string;
  priority?: boolean;
  className?: string;
};

export function BrandLogo({ homeLabel, priority = false, className = "" }: BrandLogoProps) {
  return (
    <a href="#top" aria-label={homeLabel} className={`flex w-fit items-center ${className}`}>
      <Image
        src="/treffix-logo.png"
        alt=""
        width={2798}
        height={796}
        sizes="150px"
        priority={priority}
        className="h-10 shrink-0 object-contain"
        style={{ width: "auto", height: "40px" }}
      />
    </a>
  );
}
