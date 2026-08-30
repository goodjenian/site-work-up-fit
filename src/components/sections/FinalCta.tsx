import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Mark } from "@/components/brand/Mark";

export function FinalCta({
  title = (
    <>
      Seu próximo movimento
      <span className="block text-volt-400">começa aqui.</span>
    </>
  ),
  body = "Escolha uma metodologia, entre para a rede de instrutores certificados e leve uma nova experiência de aula para a sua turma.",
  primary = { label: "Conheça as certificações", href: "/certificacoes" },
  secondary = { label: "Fale com a Work Up Fit", href: "/contato" },
  location = "final_cta",
}: {
  title?: React.ReactNode;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  location?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(58% 62% at 50% 108%, rgb(55 183 255 / 0.24) 0%, transparent 68%)",
        }}
      />
      <Mark
        className="pointer-events-none absolute -right-16 top-1/2 h-80 w-auto -translate-y-1/2 text-volt-400/8 md:h-[26rem]"
        weight={0.5}
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Heading level={2} size="display-lg">
            {title}
          </Heading>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-chalk-dim">
            {body}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={primary.href}
              size="lg"
              analyticsName={primary.label}
              analyticsLocation={location}
            >
              {primary.label}
            </ButtonLink>
            <ButtonLink
              href={secondary.href}
              variant="secondary"
              size="lg"
              analyticsName={secondary.label}
              analyticsLocation={location}
            >
              {secondary.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
