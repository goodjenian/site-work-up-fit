import Link from "next/link";
import { PageView } from "@/components/PageView";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Mark } from "@/components/brand/Mark";
import { posts } from "@/data/posts";
import { site } from "@/data/site";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { Card } from "@/components/ui/Card";

export const metadata = buildMetadata({
  title: "Conteúdo — Work Up Fit",
  description:
    "Artigos sobre metodologia de aula coletiva, formação de instrutores e gestão de grade para academias.",
  path: "/blog",
});

const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

export default function BlogPage() {
  return (
    <>
      <PageView title="Blog" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: site.url },
            { "@type": "ListItem", position: 2, name: "Conteúdo", item: `${site.url}/blog` },
          ],
        }}
      />

      <PageHero
        eyebrow="Conteúdo"
        crumbs={[{ label: "Início", href: "/" }, { label: "Conteúdo" }]}
        title={
          <>
            Sobre método,
            <span className="block text-volt-400">turma e carreira.</span>
          </>
        }
        lead="Textos para quem dá aula e para quem monta grade — metodologia, condução de turma e o negócio por trás da aula coletiva."
      />

      <Section>
        {posts.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                {/* The link wraps only the title; `after:inset-0` still makes
                    the whole card clickable, without giving screen readers a
                    link whose name is the entire card. */}
                <Card className="relative flex h-full flex-col p-6 transition-colors hover:border-ink-500">
                  <time dateTime={post.publishedAt} className="text-xs uppercase tracking-[0.12em] text-muted">
                    {dateFmt.format(new Date(post.publishedAt))}
                  </time>
                  <h2 className="mt-3 font-display text-xl text-chalk">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal>
            <Card className="relative mx-auto max-w-2xl overflow-hidden p-8 text-center md:p-12">
              <Mark
                className="pointer-events-none absolute -right-12 -top-12 h-52 w-auto text-volt-400/8"
                weight={0.5}
              />
              <div className="relative">
                <Eyebrow className="justify-center">Em breve</Eyebrow>
                <Heading level={2} size="display-sm" className="mt-4">
                  Os primeiros textos estão sendo escritos.
                </Heading>
                <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-muted">
                  Estamos preparando o conteúdo sobre metodologia, condução de turma e gestão de
                  grade. Enquanto isso, comece pelas metodologias.
                </p>
                <Link
                  href="/certificacoes"
                  className="mt-7 inline-flex h-11 items-center rounded-full bg-volt-400 px-6 font-semibold text-ink-950 transition-colors hover:bg-volt-300"
                >
                  Ver as certificações
                </Link>
              </div>
            </Card>
          </Reveal>
        )}
      </Section>

      <FinalCta />
    </>
  );
}
