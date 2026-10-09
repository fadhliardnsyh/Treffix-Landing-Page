import { copy, type Lang } from "@/components/content";
import { SiteFooter } from "@/components/site-footer";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { BlogSection } from "@/components/sections/blog-section";
import { MotionProvider } from "@/components/ui/motion-provider";
import { InPageScroll } from "@/components/ui/in-page-scroll";

export default function Home({ language }: { language: Lang }) {
  const content = copy[language];
  const contactLink = process.env.NEXT_PUBLIC_TREFFIX_CONTACT_URL;

  return (
    <MotionProvider>
      <main id="main-content" tabIndex={-1} className="overflow-clip">
        <InPageScroll />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-[#071a35]"
        >
          {content.skipToContent}
        </a>
        <HeroSection content={content} language={language} />
        <AboutSection content={content} language={language} />
        <SolutionsSection content={content} language={language} />
        <IndustriesSection content={content} contactLink={contactLink} />
        <BlogSection content={content} language={language} />
        <FaqSection content={content} contactLink={contactLink} />
        <ContactSection content={content} contactLink={contactLink} isIndonesian={language === "id"} />
        <SiteFooter content={content} language={language} contactLink={contactLink} />
      </main>
    </MotionProvider>
  );
}
