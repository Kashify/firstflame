import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { Product } from "@/lib/catalog";
import { inr } from "@/lib/format";
import { lineUnitPrice, useStore } from "@/lib/store";
import { Link } from "@tanstack/react-router";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  if (!product) return null;

  const { addToCart, setCartOpen } = useStore();
  const [selectedWeight, setSelectedWeight] = useState(product.weight || product.weights?.[0] || "100g");
  const [qty, setQty] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const price = lineUnitPrice(product, selectedWeight);
  const mrp = Math.round((price / (100 - product.discount)) * 100);

  const handleAdd = () => {
    addToCart(product.slug, selectedWeight, qty);
    onClose();
    setCartOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-background border-border rounded-3xl p-6 sm:p-8">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name} Quick View</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Image preview */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-surface">
              <img
                src={product.images[activeImgIdx] || product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`h-16 w-16 rounded-xl overflow-hidden border ${
                      activeImgIdx === idx ? "border-primary ring-2 ring-primary/20" : "border-border"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="eyebrow text-gold">{product.categoryName} • {product.origin}</span>
              <h2 className="font-display text-2xl text-foreground mt-1">{product.name}</h2>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <div className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                  ))}
                </div>
                <span>{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {product.description || product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-display text-2xl text-primary font-semibold">{inr(price * qty)}</span>
              {mrp > price && (
                <span className="text-sm text-muted-foreground line-through">{inr(mrp * qty)}</span>
              )}
              <Badge variant="outline" className="text-xs border-gold text-gold">
                Save {product.discount}%
              </Badge>
            </div>

            {/* Weight variant selector */}
            {product.weights && product.weights.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-medium text-foreground">Select Weight Pack:</span>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        selectedWeight === w
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-surface border-border text-foreground hover:bg-surface/80"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-4 space-y-3">
              <Button
                onClick={handleAdd}
                size="lg"
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium gold-border-glow"
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart — {inr(price * qty)}
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full rounded-full">
                <Link to="/product/$slug" params={{ slug: product.slug }} onClick={onClose}>
                  View Full Details & Story <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground border-t border-border">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Single-origin verified harvest • Packed within 48 hrs</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
