import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { ProgramMarquee } from "@/components/sections/ProgramMarquee";
import { StatsBand } from "@/components/sections/StatsBand";
import { BrandPromise } from "@/components/sections/BrandPromise";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { ProgramsShowcase } from "@/components/sections/ProgramsShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Audiences } from "@/components/sections/Audiences";
import { Community } from "@/components/sections/Community";
import { Experiences } from "@/components/sections/Experiences";
import { ForGyms } from "@/components/sections/ForGyms";
import { Proof } from "@/components/sections/Proof";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageView } from "@/components/PageView";
import { answeredFaqs, faqs } from "@/data/faqs";
import { site } from "@/data/site";
import { JsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/url";

/**
 * Only the social card is declared here — title, description and canonical come
 * from the root layout, which already says the right thing for the home page.
 *
 * Without this the `opengraph-image` file convention wins over the layout and
 * emits an extension-less URL that static hosts serve as octet-stream.
 */
export const metadata = {
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: site.name }],
  },
  twitter: { images: [absoluteUrl("/og.png")] },
};

export default function HomePage() {
  return (
    <>
      <PageView title="Home" />
      {/* FAQPage carries only questions that have a real answer. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${site.url}/#faq`,
          mainEntity: answeredFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      {/* Order follows the reference's rhythm: one image, one statement, then
          the product — and only after that the explanation of how it works. */}
      <Hero />
      <Manifesto />
      <ProgramMarquee />
      <ProgramsShowcase />
      <Proof />
      <Ecosystem />
      <BrandPromise />
      <Experiences />
      <HowItWorks />
      <Audiences />
      <Community />
      <ForGyms />
      <StatsBand />
      <FaqSection faqs={faqs.slice(0, 6)} tone="base" />
      <FinalCta />
    </>
  );
}
