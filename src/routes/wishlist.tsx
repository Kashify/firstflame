import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist | First Flames Spices" },
      { name: "description", content: "Spices you've saved for later at First Flames Spices." },
      { property: "og:title", content: "Your Wishlist | First Flames Spices" },
      { property: "og:description", content: "Spices you've saved for later." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-3xl md:text-4xl">Your wishlist</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {saved.length} {saved.length === 1 ? "item" : "items"} saved
      </p>

      {saved.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border py-24 text-center">
          <p className="font-display text-xl">Nothing saved yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap the heart on any product to keep it here.
          </p>
          <Button asChild className="mt-6 rounded-full px-8">
            <Link to="/shop">Browse the shop</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
