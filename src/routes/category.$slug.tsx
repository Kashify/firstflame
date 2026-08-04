import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ShopBrowser } from "@/components/shop-browser";
import { categories, productsByCategory, type CategorySlug } from "@/lib/catalog";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Category not found | First Flames Spices" }, { name: "robots", content: "noindex" }],
      };
    const { category } = loaderData;
    const title = `${category.name} — ${category.tagline} | First Flames Spices`;
    const description = `Shop premium ${category.name.toLowerCase()} from First Flames Spices. ${category.tagline}, packed within 48 hours of milling.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = productsByCategory(category.slug as CategorySlug);

  return (
    <div className="container-page py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <header className="mb-10 overflow-hidden rounded-3xl border border-border">
        <div className="relative min-h-[220px]">
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.02_155_/_0.9)] to-[oklch(0.18_0.02_155_/_0.35)]" />
          <div className="relative max-w-xl p-8 md:p-12">
            <p className="eyebrow text-gold">{items.length} products</p>
            <h1 className="mt-2 font-display text-3xl text-[oklch(0.97_0.012_88)] md:text-4xl">
              {category.name}
            </h1>
            <p className="mt-3 text-sm text-[oklch(0.9_0.012_88_/_0.85)]">{category.tagline}</p>
          </div>
        </div>
      </header>

      <ShopBrowser source={items} lockedCategory={category.slug} />
    </div>
  );
}
