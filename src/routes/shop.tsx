import { createFileRoute } from "@tanstack/react-router";
import { ShopBrowser } from "@/components/shop-browser";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Spices, Masalas & Gift Boxes | First Flames Spices" },
      {
        name: "description",
        content:
          "Browse our complete collection of single-origin Indian spices, stone-ground masalas and luxury gift boxes. Ground to order in Jaipur.",
      },
      { property: "og:title", content: "Shop All Spices & Masalas | First Flames Spices" },
      {
        property: "og:description",
        content: "Single-origin ground spices, whole spices, masalas, herbs and gift boxes.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="eyebrow text-accent">The full pantry</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Shop all products</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {products.length} spices, masalas and kitchen essentials — each traceable to a farm, a
          harvest and a milling date.
        </p>
      </header>
      <ShopBrowser source={products} />
    </div>
  );
}
