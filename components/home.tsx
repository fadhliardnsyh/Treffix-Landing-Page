import { copy, type Lang } from "@/components/content";
import { AboutSection } from "@/components/sections/about-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BlogSection } from "@/components/sections/blog-section";
import { MotionProvider } from "@/components/ui/motion-provider";
import { InPageScroll } from "@/components/ui/in-page-scroll";

// Turn on when approved testimonial content is ready to publish.
const HOMEPAGE_TESTIMONIALS_ENABLED = false;

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
        <SolutionsSection content={content} language={language} contactLink={contactLink} />
        <ApproachSection content={content} />
        {HOMEPAGE_TESTIMONIALS_ENABLED && <TestimonialsSection content={content} contactLink={contactLink} />}
        <BlogSection content={content} language={language} />
        <FaqSection content={content} />
      </main>
    </MotionProvider>
  );
}
