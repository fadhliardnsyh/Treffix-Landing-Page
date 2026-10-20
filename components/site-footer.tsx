import { ArrowUpRight, ArrowRight, Globe2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { products, type Copy, type Lang } from "@/components/content";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { BackToTop } from "@/components/ui/back-to-top";
import { ContactCtaRouteVisibility } from "@/components/ui/contact-cta-route-visibility";

type FooterDetails = {
  address?: string;
  phone?: string;
  email?: string;
};

type FooterSocialLinks = {
  instagram?: string;
  linkedin?: string;
};

function InstagramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="64 64 896 896" fill="currentColor" aria-hidden="true">
      <path d="M847.7 112H176.3c-35.5 0-64.3 28.8-64.3 64.3v671.4c0 35.5 28.8 64.3 64.3 64.3h671.4c35.5 0 64.3-28.8 64.3-64.3V176.3c0-35.5-28.8-64.3-64.3-64.3zm0 736c-447.8-.1-671.7-.2-671.7-.3.1-447.8.2-671.7.3-671.7 447.8.1 671.7.2 671.7.3-.1 447.8-.2 671.7-.3 671.7zM230.6 411.9h118.7v381.8H230.6zm59.4-52.2c37.9 0 68.8-30.8 68.8-68.8a68.8 68.8 0 10-137.6 0c-.1 38 30.7 68.8 68.8 68.8zm252.3 245.1c0-49.8 9.5-98 71.2-98 60.8 0 61.7 56.9 61.7 101.2v185.7h118.6V584.3c0-102.8-22.2-181.9-142.3-181.9-57.7 0-96.4 31.7-112.3 61.7h-1.6v-52.2H423.7v381.8h118.6V604.8z" />
    </svg>
  );
}

export function SiteFooter({
  content,
  language,
  contactLink,
  ctaTitle,
  contactDetails,
  socialLinks,
}: {
  content: Copy;
  language: Lang;
  contactLink?: string;
  ctaTitle?: string;
  contactDetails?: FooterDetails;
  socialLinks?: FooterSocialLinks;
}) {
  const switchLanguage = language === "id" ? "/en" : "/id";
  const contactHref = contactLink || `/${language}#solutions`;
  const companyLinks = [
    { label: content.companyMenu.about, href: `/${language}#about` },
    { label: content.companyMenu.stories, href: `/${language}/blog` },
  ];
  const customerLinks = [
    { label: content.footerByRole, href: `/${language}#solutions` },
    { label: content.footerByIndustry, href: `/${language}#industries` },
  ];
  const displayedCtaTitle = ctaTitle ?? content.ctaTitle;
  const highlightedPhrase = "Solusi Digital";
  const highlightedPhraseIndex = displayedCtaTitle.indexOf(highlightedPhrase);
  const socialItems = [
    socialLinks?.instagram ? { label: "Instagram", href: socialLinks.instagram, icon: "instagram" as const } : null,
    socialLinks?.linkedin ? { label: "LinkedIn", href: socialLinks.linkedin, icon: "linkedin" as const } : null,
  ].filter((item) => item !== null);
  const phoneDigits = contactDetails?.phone?.replace(/\D/g, "");

  return (
    <div id="contact" className="relative isolate overflow-hidden bg-black text-white">
      <ContactCtaRouteVisibility>
        <section aria-labelledby="contact-cta-title" className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="container-wide mx-auto">
            <div className="relative isolate flex flex-col gap-7 overflow-hidden rounded-2xl border border-white/[.06] bg-black px-6 py-8 text-white shadow-[0_14px_42px_rgba(7,26,53,.12)] sm:gap-8 sm:rounded-[24px] sm:px-9 sm:py-9 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-10">
              <div aria-hidden="true" className="cta-orbit-ring cta-orbit-ring-outer pointer-events-none absolute -right-24 -top-40 -z-10 size-[25rem] rounded-full border border-[var(--blue)]/[.14]" />
              <div aria-hidden="true" className="cta-orbit-ring cta-orbit-ring-inner pointer-events-none absolute -right-9 -top-24 -z-10 size-[17rem] rounded-full border border-[var(--blue)]/[.23]" />
              <div aria-hidden="true" className="cta-border-beam pointer-events-none absolute inset-0 z-20 rounded-[inherit] p-[3px]" />
              <div className="min-w-0 max-w-[760px]">
                <h2 id="contact-cta-title" className="text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.12] tracking-[-.045em] text-white [text-wrap:balance]">
                  {highlightedPhraseIndex < 0 ? displayedCtaTitle : <>
                    {displayedCtaTitle.slice(0, highlightedPhraseIndex)}
                    <span className="text-[var(--blue)]">{highlightedPhrase}</span>
                    {displayedCtaTitle.slice(highlightedPhraseIndex + highlightedPhrase.length)}
                  </>}
                </h2>
                <p className="mt-3 max-w-[620px] text-[14px] leading-6 text-white/75 sm:text-[15px] sm:leading-7">
                  {content.ctaText}
                </p>
              </div>
              <ButtonLink href={contactHref} className="static-motion min-h-12 w-fit shrink-0 gap-3 px-6 text-[12px] sm:text-[13px]">
                {content.ctaButton}
                <ArrowUpRight size={15} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </section>
      </ContactCtaRouteVisibility>

      <footer className="relative z-10 bg-black px-5 pb-7 text-white sm:px-6 sm:pb-8">
        <div className="container-wide mx-auto">
          <div className="grid gap-x-9 gap-y-10 border-t border-white/10 py-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:py-11 xl:grid-cols-[minmax(210px,1.15fr)_minmax(280px,1.55fr)_minmax(110px,.7fr)_minmax(150px,.85fr)_minmax(230px,1.2fr)] xl:gap-8">
            <div>
              <BrandLogo homeHref={`/${language}`} homeLabel={content.homeLabel} imageClassName="h-9" />
              <p className="mt-4 max-w-[320px] text-[12px] leading-6 text-white/65">{content.footerText}</p>
              {socialItems.length > 0 && (
                <div className="mt-5">
                  <p className="sr-only">{content.footerSocial}</p>
                  <ul className="flex items-center gap-2">
                    {socialItems.map(({ label, href, icon }) => (
                      <li key={label}>
                        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-white/[.06] text-[var(--blue)] transition-colors duration-200 ease-out hover:bg-[var(--blue)] hover:text-white focus-visible:bg-[var(--blue)] focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]">
                          {icon === "instagram" ? <InstagramIcon /> : <LinkedInIcon />}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <nav aria-label={content.footerProducts}>
              <p className="mb-3 text-[10px] font-bold tracking-[.16em] text-white/55">{content.footerProducts}</p>
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    <a
                      href={product.id === "FixTrack" ? "https://fixtrack.id/" : `/${language}#solutions`}
                      target={product.id === "FixTrack" ? "_blank" : undefined}
                      rel={product.id === "FixTrack" ? "noopener noreferrer" : undefined}
                      className="flex min-h-10 items-center text-[12px] text-white/75 transition-colors hover:text-white focus-visible:text-white xl:whitespace-nowrap"
                    >
                      {content.footerProductNames[product.id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label={content.footerCustomers}>
              <p className="mb-3 text-[10px] font-bold tracking-[.16em] text-white/55">{content.footerCustomers}</p>
              <ul>
                {customerLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="flex min-h-10 items-center text-[12px] text-white/75 transition-colors hover:text-white focus-visible:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label={content.footerCompany}>
              <p className="mb-3 text-[10px] font-bold tracking-[.16em] text-white/55">{content.footerCompany}</p>
              <ul>
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="flex min-h-10 items-center text-[12px] text-white/75 transition-colors hover:text-white focus-visible:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="mb-3 text-[10px] font-bold tracking-[.16em] text-white/55">{content.footerContact}</p>
              <div className="space-y-3 text-[12px] leading-5 text-white/75">
                {contactDetails?.address && (
                  <p className="flex items-start gap-3">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--blue)]" aria-hidden="true" />
                    <span><span className="sr-only">{content.footerAddress}: </span>{contactDetails.address}</span>
                  </p>
                )}
                {phoneDigits && (
                  <a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener noreferrer" aria-label={`${content.footerPhone}: ${contactDetails?.phone}`} className="flex min-h-10 items-center gap-3 transition-colors hover:text-white focus-visible:text-white">
                    <Phone size={17} className="shrink-0 text-[var(--blue)]" aria-hidden="true" />
                    <span>{contactDetails?.phone}</span>
                  </a>
                )}
                {contactDetails?.email && (
                  <a href={`mailto:${contactDetails.email}`} aria-label={`${content.footerEmail}: ${contactDetails.email}`} className="flex min-h-10 items-center gap-3 transition-colors hover:text-white focus-visible:text-white">
                    <Mail size={17} className="shrink-0 text-[var(--blue)]" aria-hidden="true" />
                    <span>{contactDetails.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse items-start justify-between gap-3 border-t border-white/10 pt-5 text-[10px] text-white/55 sm:flex-row sm:items-center">
            <span>{content.rights}</span>
            <div className="flex items-center gap-3">
              <Link href={switchLanguage} className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-white/65 transition-colors hover:text-white focus-visible:text-white">
                <Globe2 size={13} aria-hidden="true" />{content.language}<ArrowRight size={12} aria-hidden="true" />
              </Link>
              <BackToTop label={content.footerBackToTop} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
