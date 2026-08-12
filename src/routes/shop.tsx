import { createFileRoute } from "@tanstack/react-router";
import { ShopBrowser } from "@/components/shop-browser";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — FIRST FLAME | Pure Spices & Masale Range" },
      {
        name: "description",
        content:
          "Browse the official FIRST FLAME collection of pure spices and masale. Red Chilli Powder, Haldi Powder, Dhania Powder, and Black Pepper Powder.",
      },
      { property: "og:title", content: "Shop | FIRST FLAME" },
      {
        property: "og:description",
        content: "100% natural, hygienically processed pure spices with no added colours or preservatives.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="eyebrow text-gold font-semibold">OUR MASALE RANGE</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">FIRST FLAME Collection</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Explore our signature {products.length} pure spices — Red Chilli, Haldi, Dhania, and Black Pepper. 100% natural, hygienically processed under strict quality standards with zero artificial colours or preservatives.
        </p>
      </header>
      <ShopBrowser source={products} />
    </div>
  );
}
