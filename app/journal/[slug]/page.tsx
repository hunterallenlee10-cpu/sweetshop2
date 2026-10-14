import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate } from "@/lib/site";
import { Container, Breadcrumbs } from "@/components/ui";
import { JsonLd, articleLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/journal/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.publishedAt, images: p.image ? [p.image] : undefined },
  };
}

export default function PostPage({ params }: PageProps<"/journal/[slug]">) {
  return (
    <Suspense fallback={<Container className="h-[60vh]" aria-hidden />}>
      <PostView params={params} />
    </Suspense>
  );
}

async function PostView({ params }: Pick<PageProps<"/journal/[slug]">, "params">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const next = posts[(posts.indexOf(p) + 1) % posts.length];
  return (
    <article>
      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { name: "Journal", path: "/journal" },
            { name: p.title, path: `/journal/${p.slug}` },
          ]}
        />
      </Container>
      <Container className="max-w-[860px]! py-10">
        <p className="text-cocoa-700">{formatDate(p.publishedAt)}</p>
        <h1 className="display mt-3 text-[clamp(2.4rem,1.5rem+3.4vw,4.5rem)]">{p.title}</h1>
      </Container>
      {p.image && (
        <Container className="max-w-[1100px]!">
          <div className="warm relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]">
            <Image src={p.image} alt="" fill preload sizes="(min-width: 1100px) 1100px, 100vw" className="object-cover" />
          </div>
        </Container>
      )}
      <Container className="max-w-[760px]! py-12">
        <div className="prose-journal text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: p.bodyHtml }} />
        <div className="mt-14 border-t border-cream-200 pt-8">
          <p className="text-cocoa-700">Next story</p>
          <Link href={`/journal/${next.slug}`} className="display mt-1 block text-3xl hover:underline">
            {next.title}
          </Link>
        </div>
      </Container>
      <JsonLd data={articleLd(p)} />
    </article>
  );
}
