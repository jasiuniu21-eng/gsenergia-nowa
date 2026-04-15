import type { Metadata } from "next";
import Link from "next/link";
import { getAll } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog energetyczny · GS Energia",
  description:
    "Artykuły eksperckie GS Energia o audytach energetycznych, efektywności energetycznej, dekarbonizacji i obowiązkach prawnych. Wiedza praktyczna z 400+ zrealizowanych projektów.",
};

export default function BlogPage() {
  const posts = getAll("blog");

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Blog energetyczny</h1>
      <p className="text-lg text-gray-600 mb-12">
        Eksperci GS Energia piszą o audytach energetycznych, przepisach, technologiach
        i dobrych praktykach zarządzania energią w przedsiębiorstwach.
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500">Artykuły wkrótce. Zapraszamy ponownie.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => {
            const excerpt =
              post.frontmatter.excerpt ??
              post.content.replace(/[#*_`>-]/g, "").trim().slice(0, 120) + "…";
            const dateStr = post.frontmatter.date
              ? new Date(post.frontmatter.date).toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : null;

            return (
              <li key={post.slug} className="border-b border-gray-100 pb-8">
                <Link href={`/blog/${post.slug}`} className="group">
                  <time className="text-xs text-gray-400 uppercase tracking-wide">
                    {dateStr}
                  </time>
                  <h2 className="text-xl font-semibold mt-1 group-hover:text-blue-600 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">{excerpt}</p>
                  <span className="inline-block mt-3 text-sm text-blue-600 font-medium group-hover:underline">
                    Czytaj dalej →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
