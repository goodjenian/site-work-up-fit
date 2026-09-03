import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The statement that used to be the hero's supporting paragraph, given a whole
 * frame of its own — the reference opens the same way, with one large claim on
 * black before any product is shown.
 *
 * Accent picks out the three things worth remembering, not every other phrase.
 * There is deliberately no attribution: no spokesperson has been named by the
 * client, and inventing one would be a fabricated endorsement.
 */
export function Manifesto() {
  return (
    <section id="o-que-e" className="section-y bg-void">
      <Container>
        <Reveal>
          <p className="max-w-[22ch] font-sans text-calm-lg font-medium text-balance text-chalk sm:max-w-[30ch] md:max-w-4xl">
            A Work Up Fit forma instrutores em{" "}
            <span className="text-volt-400">onze metodologias de aula coletiva</span> e leva essas
            experiências para academias de todo o Brasil. Cada programa tem sequência, música,
            progressão e material próprios — e um profissional certificado à frente da turma.{" "}
            <span className="text-volt-400">Movimento que conecta pessoas</span> — e transforma quem
            ensina.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
