import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        crumbs={[{ label: "Início", href: "/" }, { label: title }]}
        title={title}
        lead={intro}
      />
      <Section>
        <div className="prose-wuf max-w-3xl space-y-8 leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-chalk [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </Section>
    </>
  );
}
