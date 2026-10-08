import { ArrowUpRight } from "lucide-react";
import type { Copy } from "@/components/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContactSection({
  content,
  contactLink,
  isIndonesian,
}: {
  content: Copy;
  contactLink?: string;
  isIndonesian: boolean;
}) {
  const actionLabel = contactLink ? content.ctaButton : content.fallbackCta;

  return (
    <section id="contact" className="relative overflow-hidden bg-[#071a35] py-20 text-white sm:py-28">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="orb absolute -right-20 top-0 h-[430px] w-[430px] rounded-full bg-blue-600/15 blur-[90px]" />
      <div className="container-wide relative grid gap-9 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <Reveal>
          <SectionHeading eyebrow={content.ctaEyebrow} title={content.ctaTitle} description={content.ctaText} dark />
        </Reveal>
        <Reveal delay={0.1} className="lg:justify-self-end">
          <div className="max-w-[380px] rounded-[20px] border border-white/10 bg-white/[.05] p-5 sm:p-6">
            <p className="text-sm font-semibold text-white">{contactLink ? content.contactNote : content.fallbackNote}</p>
            {contactLink && (
              <p className="mt-2 text-[11px] leading-5 text-blue-50/70">
                {isIndonesian
                  ? "Hubungi tim Treffix untuk membahas kebutuhan operasional Anda."
                  : "Reach the Treffix team to discuss your operational needs."}
              </p>
            )}
            <ButtonLink href={contactLink || "#solutions"} className="group mt-5 min-h-12 gap-3 px-5 text-[12px]">
              {actionLabel}
              <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
