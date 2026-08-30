import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/Faq";
import type { Faq } from "@/data/faqs";

export function FaqSection({
  faqs,
  title = "Perguntas frequentes",
  showAllLink = true,
  tone = "base",
}: {
  faqs: Faq[];
  title?: string;
  showAllLink?: boolean;
  tone?: "base" | "raised" | "deep";
}) {
  return (
    <Section id="faq" tone={tone}>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <Heading level={2} size="display-md" className="mt-5">
            {title}
          </Heading>
          {showAllLink && (
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Não encontrou o que procurava?{" "}
              <Link href="/contato" className="font-semibold text-volt-400 hover:text-volt-300">
                Fale com a gente
              </Link>
              .
            </p>
          )}
        </Reveal>

        <Reveal delay={0.08}>
          <FaqList faqs={faqs} openFirst />
        </Reveal>
      </div>
    </Section>
  );
}
