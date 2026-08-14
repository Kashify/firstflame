import { createFileRoute, Link } from "@tanstack/react-router";
import { searchProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Search | First flame Spices" },
      { name: "description", content: "Search single-origin spices, masalas and gift boxes." },
      { property: "og:title", content: "Search | First flame Spices" },
      { property: "og:description", content: "Search premium Indian spices and masalas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchProducts(q);

  return (
    <div className="container-page py-12 md:py-16">
      <p className="eyebrow text-accent">Search</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">
        {q ? `Results for “${q}”` : "Search our shelves"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "match" : "matches"}
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border py-24 text-center">
          <p className="font-display text-xl">No matches found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a broader term like “masala”, “chilli” or “cardamom”.
          </p>
          <Button asChild className="mt-6 rounded-full px-8">
            <Link to="/shop">Browse everything</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
