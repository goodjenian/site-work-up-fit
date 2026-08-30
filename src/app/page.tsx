import { Hero } from "@/components/sections/Hero";
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

      <Hero />
      <BrandPromise />
      <Ecosystem />
      <ProgramsShowcase />
      <HowItWorks />
      <Audiences />
      <Community />
      <Experiences />
      <ForGyms />
      <Proof />
      <FaqSection faqs={faqs.slice(0, 6)} tone="base" />
      <FinalCta />
    </>
  );
}
