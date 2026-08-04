import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/catalog";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";
import { QuickViewModal } from "@/components/quick-view-modal";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useStore();
  const wishlisted = isWishlisted(product.slug);
  const outOfStock = product.stock === 0;
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:shadow-lift hover:border-gold/40"
      >
        {/* Full Card Invisible Link Overlay so clicking ANYWHERE on the card opens the product */}
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={`View details for ${product.name}`}
          className="absolute inset-0 z-0"
        />

        <div className="relative block aspect-square overflow-hidden bg-surface pointer-events-none">
          <img
            src={product.images[0]}
            alt={`${product.name} from ${product.origin}`}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />

          <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10 pointer-events-auto">
            {product.discount > 0 && (
              <Badge className="rounded-full bg-spice px-2.5 py-0.5 text-[11px] font-semibold text-spice-foreground hover:bg-spice">
                {product.discount}% off
              </Badge>
            )}
            {product.organic && (
              <Badge
                variant="outline"
                className="rounded-full border-primary/30 bg-background/85 px-2.5 py-0.5 text-[11px] font-medium text-primary backdrop-blur"
              >
                Organic
              </Badge>
            )}
          </div>

          {/* Quick View Hover Trigger */}
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 px-3 pointer-events-auto">
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setQuickViewOpen(true);
              }}
              className="w-full rounded-full bg-background/90 text-foreground backdrop-blur border border-border text-xs font-medium hover:bg-background shadow-md"
            >
              <Eye className="mr-1.5 h-3.5 w-3.5 text-gold" /> Quick View
            </Button>
          </div>

          {outOfStock && (
            <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-[2px] z-10">
              <span className="eyebrow rounded-full border border-border bg-card px-3 py-1.5">
                Sold out
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleWishlist(product.slug);
            toast.success(wishlisted ? "Removed from wishlist" : "Saved to wishlist");
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/85 backdrop-blur transition-colors hover:bg-background shadow-sm pointer-events-auto"
        >
          <Heart
            className={cn("h-4 w-4", wishlisted ? "fill-spice text-spice" : "text-muted-foreground")}
          />
        </button>

        <div className="flex flex-1 flex-col gap-2 p-4 relative z-10 pointer-events-none">
          <p className="eyebrow text-gold font-semibold">{product.categoryName}</p>
          <h3 className="font-display text-base leading-snug text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>({product.reviewCount})</span>
            <span aria-hidden>·</span>
            <span>{product.weight}</span>
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <div className="min-w-0">
              <p className="font-display text-lg text-foreground">{inr(product.price)}</p>
              <p className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</p>
            </div>
            <Button
              size="sm"
              disabled={outOfStock}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addToCart(product.slug, product.weight);
                toast.success(`${product.name} added to bag`);
                setCartOpen(true);
              }}
              className="shrink-0 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 shadow-sm pointer-events-auto"
            >
              <ShoppingBag className="mr-1.5 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </motion.article>

      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
