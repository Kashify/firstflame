import React, { useEffect, useState } from "react";
import { Product } from "@/lib/catalog";
import { inr } from "@/lib/format";
import { lineUnitPrice, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StickyAddToCartProps {
  product: Product;
  selectedWeight: string;
}

export function StickyAddToCart({ product, selectedWeight }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const { addToCart, setCartOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero PDP area (> 480px)
      if (window.scrollY > 480) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const price = lineUnitPrice(product, selectedWeight);

  const handleAdd = () => {
    addToCart(product.slug, selectedWeight, 1);
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 inset-x-0 z-40 bg-background/90 backdrop-blur-md border-t border-border py-3 px-4 shadow-lift"
        >
          <div className="container-page flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-11 w-11 rounded-xl object-cover border border-border shrink-0"
              />
              <div className="min-w-0 hidden sm:block">
                <p className="font-display text-sm font-semibold truncate text-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">{selectedWeight} • Single-origin harvest</p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="font-display text-lg font-semibold text-primary">{inr(price)}</span>
                <span className="text-[10px] block text-muted-foreground">Taxes included</span>
              </div>
              <Button
                onClick={handleAdd}
                size="default"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 shadow-sm gold-border-glow"
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
