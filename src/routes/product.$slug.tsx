import { useEffect, useState, lazy, Suspense } from "react";
import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Minus, Plus, ShieldCheck, Star, Truck, Box, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product-card";
import { productBySlug, relatedProducts, type Product } from "@/lib/catalog";
import { deliveryEstimate, inr } from "@/lib/format";
import { lineUnitPrice, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { StickyAddToCart } from "@/components/sticky-add-to-cart";

const Product3DViewer = lazy(() => import("@/components/3d/product-3d-viewer"));

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): { product?: Product } => {
    const product = productBySlug(params.slug);
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData || !loaderData.product)
      return {
        meta: [
          { title: "Product not found | FIRST FLAME" },
          { name: "robots", content: "noindex" },
        ],
      };
    const p = loaderData.product;
    const title = `${p.name} — ${p.origin} | FIRST FLAME`;
    const description = `${p.shortDescription} ${p.weight} from ${p.origin}. ${inr(p.price)}, rated ${p.rating}/5 by ${p.reviewCount} customers.`;

    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: p.name,
      image: p.images,
      description: p.description,
      sku: p.id,
      brand: { "@type": "Brand", name: "FIRST FLAME" },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: p.price,
        availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.rating,
        reviewCount: p.reviewCount,
      },
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const params = Route.useParams();
  const loaderData = Route.useLoaderData();
  const product = loaderData?.product || productBySlug(params.slug);

  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, viewProduct, recentlyViewed, setCartOpen } =
    useStore();
  const [weight, setWeight] = useState(product?.weight || "100 g");
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [eta, setEta] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [mediaView, setMediaView] = useState<"2d" | "3d">("2d");

  useEffect(() => {
    if (product) {
      viewProduct(product.slug);
      setActiveImage(0);
      setWeight(product.weight);
      setQty(1);
    }
  }, [product?.slug, product?.weight, viewProduct]);

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Product Not Found</h1>
        <p className="mt-4 text-muted-foreground">The requested spice product could not be found.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/shop">Explore Collection</Link>
        </Button>
      </div>
    );
  }

  const unit = lineUnitPrice(product, weight);
  const mrpForWeight = Math.round((unit / (100 - product.discount)) * 100);
  const wishlisted = isWishlisted(product.slug);

  const related = relatedProducts(product);
  const recently = recentlyViewed
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <div className="container-page py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-foreground">
            {product.categoryName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Media gallery with 2D/3D toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-0"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="eyebrow text-gold font-semibold">Product Media</span>
              <div className="flex gap-1 rounded-full border border-border bg-surface p-1 text-xs">
                <button
                  onClick={() => setMediaView("2d")}
                  className={`rounded-full px-3 py-1 font-medium transition-colors ${
                    mediaView === "2d" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  2D Photos
                </button>
                <button
                  onClick={() => setMediaView("3d")}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 font-medium transition-colors ${
                    mediaView === "3d" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Box className="h-3.5 w-3.5 text-gold" /> 3D Model Jar
                </button>
              </div>
            </div>

            {mediaView === "2d" ? (
              <>
                <div className="group overflow-hidden rounded-3xl border border-border bg-surface">
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    width={1024}
                    height={1024}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveImage(i);
                        setMediaView("2d");
                      }}
                      aria-label={`View image ${i + 1}`}
                      className={cn(
                        "h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors",
                        i === activeImage && mediaView === "2d" ? "border-primary" : "border-border"
                      )}
                    >
                      <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <Suspense fallback={<div className="h-[420px] rounded-3xl bg-surface animate-pulse" />}>
                <Product3DViewer productName={product.name} categoryName={product.categoryName} />
              </Suspense>
            )}
          </motion.div>

          {/* Product details */}
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <Badge key={b} variant="outline" className="rounded-full border-gold/40 text-gold font-medium">
                  {b}
                </Badge>
              ))}
            </div>
            <h1 className="mt-3 font-display text-3xl md:text-4xl text-foreground">{product.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {product.origin} · Single-Origin Harvest · SKU {product.id}
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted-foreground/40"
                    )}
                  />
                ))}
              </span>
              <span className="font-medium text-foreground">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <p className="mt-5 leading-relaxed text-muted-foreground">{product.shortDescription}</p>

            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-3xl font-semibold text-primary">{inr(unit)}</span>
              <span className="pb-1 text-sm text-muted-foreground line-through">
                {inr(mrpForWeight)}
              </span>
              <span className="pb-1 text-sm font-semibold text-spice">Save {product.discount}%</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

            {/* Size selector */}
            <div className="mt-6">
              <p className="eyebrow mb-2 text-muted-foreground">Select Weight Pack</p>
              <div className="flex flex-wrap gap-2">
                {product.weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      w === weight
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-surface hover:bg-surface/80"
                    )}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-border bg-surface">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-11 w-11 place-items-center rounded-l-full transition-colors hover:bg-background"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="grid h-11 w-11 place-items-center rounded-r-full transition-colors hover:bg-background"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                disabled={product.stock === 0}
                className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground gold-border-glow"
                onClick={() => {
                  addToCart(product.slug, weight, qty);
                  toast.success(`${product.name} (${weight}) added to bag`);
                  setCartOpen(true);
                }}
              >
                Add to bag
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={product.stock === 0}
                className="rounded-full px-8 border-border"
                onClick={() => {
                  addToCart(product.slug, weight, qty);
                  setCartOpen(false);
                  navigate({ to: "/checkout" });
                }}
              >
                Buy now
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Save to wishlist"
                onClick={() => toggleWishlist(product.slug)}
                className="h-11 w-11 rounded-full border border-border"
              >
                <Heart className={cn("h-4 w-4", wishlisted && "fill-spice text-spice")} />
              </Button>
            </div>

            <p className="mt-3 text-sm">
              {product.stock === 0 ? (
                <span className="text-destructive">Currently sold out — restocking soon</span>
              ) : product.stock < 20 ? (
                <span className="text-spice">Only {product.stock} packs left in harvest</span>
              ) : (
                <span className="text-primary font-medium">In stock · Ground to order within 48 hours</span>
              )}
            </p>

            {/* Pincode estimate */}
            <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
              <p className="eyebrow mb-3 text-gold font-semibold">Check Express Delivery</p>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!/^[1-9]\d{5}$/.test(pincode)) {
                    toast.error("Enter a valid 6-digit Indian pincode");
                    return;
                  }
                  setEta(deliveryEstimate(pincode));
                }}
              >
                <Input
                  type="text"
                  placeholder="Enter 6-digit pincode (e.g. 302001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="rounded-full bg-background"
                />
                <Button type="submit" variant="secondary" className="rounded-full shrink-0">
                  Check
                </Button>
              </form>
              {eta && (
                <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <Truck className="h-4 w-4" /> {eta}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tabbed Info */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 rounded-none">
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent px-6 pb-3 pt-2 font-display text-base data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Product Details
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="rounded-none border-b-2 border-transparent px-6 pb-3 pt-2 font-display text-base data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Ingredients & Usage
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="rounded-none border-b-2 border-transparent px-6 pb-3 pt-2 font-display text-base data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Nutrition Facts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="pt-6">
              <div className="prose max-w-none text-muted-foreground leading-relaxed">
                <p>{product.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <p className="eyebrow text-gold">Origin</p>
                    <p className="mt-1 font-semibold text-foreground">{product.origin}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <p className="eyebrow text-gold">Shelf Life</p>
                    <p className="mt-1 font-semibold text-foreground">{product.shelfLife}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <p className="eyebrow text-gold">Heat Level</p>
                    <p className="mt-1 font-semibold text-foreground">{product.spiceLevel}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-surface p-4">
                    <p className="eyebrow text-gold">Certification</p>
                    <p className="mt-1 font-semibold text-foreground">{product.organic ? "100% Organic" : "FSSAI Grade A"}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="font-display text-lg text-foreground mb-3">Ingredients</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                    {product.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="font-display text-lg text-foreground mb-3">Chef Usage Tips</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                    {product.usage.map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="pt-6">
              <div className="max-w-md rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-display text-lg text-foreground mb-4">Nutritional Values (per 100g)</h3>
                <dl className="divide-y divide-border">
                  {product.nutrition.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 text-sm">
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd className="font-medium text-foreground">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <p className="eyebrow text-gold font-semibold">Pairs Perfectly With</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">Complementary Harvests</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recently.length > 0 && (
          <section className="mt-16">
            <p className="eyebrow text-gold font-semibold">Your Browsing History</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">Recently Viewed Spices</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recently.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky floating Add to Cart */}
      <StickyAddToCart product={product} selectedWeight={weight} />
    </>
  );
}
