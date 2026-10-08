import { ArrowRight, Globe2 } from "lucide-react";
import Link from "next/link";
import type { Copy, Lang } from "@/components/content";
import { BrandLogo } from "@/components/ui/brand-logo";

const footerNavIds = ["platform", "solutions", "industries"];

export function SiteFooter({
  content,
  language,
  contactLink,
}: {
  content: Copy;
  language: Lang;
  contactLink?: string;
}) {
  const switchLanguage = language === "id" ? "/en" : "/id";
  const contactHref = contactLink || "#solutions";

  return (
    <footer className="bg-[#051329] py-10 text-white">
      <div className="container-wide">
        <div className="grid gap-9 border-b border-white/[.08] pb-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_.6fr_.6fr]">
          <div>
            <BrandLogo homeLabel={content.homeLabel} />
            <p className="mt-4 max-w-[300px] text-[11px] leading-5 text-white/60">{content.footerText}</p>
          </div>
          <nav aria-label={content.footerNav}>
            <p className="mb-4 text-[10px] font-bold tracking-[.16em] text-white/60">{content.footerNav}</p>
            {content.nav.slice(0, 3).map((item, index) => (
              <a key={item} href={`#${footerNavIds[index]}`} className="flex min-h-11 items-center text-[11px] text-white/70 transition hover:text-white">{item}</a>
            ))}
          </nav>
          <div>
            <p className="mb-4 text-[10px] font-bold tracking-[.16em] text-white/60">{content.contact}</p>
            <a href={contactHref} className="flex min-h-11 items-center text-[11px] text-white/70 transition hover:text-white">
              {contactLink ? content.talk : content.explore}
            </a>
          </div>
        </div>
        <div className="flex flex-col-reverse items-start justify-between gap-4 pt-5 text-[10px] text-white/60 sm:flex-row sm:items-center">
          <span>{content.rights}</span>
          <Link href={switchLanguage} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-3 text-white/60 transition hover:text-white">
            <Globe2 size={12} aria-hidden="true" />{content.language}<ArrowRight size={11} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
