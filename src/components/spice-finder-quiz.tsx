import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Flame, CheckCircle, ArrowRight, RotateCcw } from "lucide-react";
import { bestSellers } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

interface SpiceQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpiceFinderQuiz({ isOpen, onClose }: SpiceQuizModalProps) {
  const [step, setStep] = useState(1);
  const [heat, setHeat] = useState<"Mild" | "Medium" | "Hot">("Medium");
  const [dish, setDish] = useState<"curries" | "biryani" | "everyday" | "gourmet">("everyday");
  const [format, setFormat] = useState<"whole" | "ground" | "blend">("ground");

  const handleReset = () => {
    setStep(1);
  };

  // Filter recommendations
  const recommendations = bestSellers.filter((p) => {
    if (step < 4) return true;
    return p.spiceLevel === heat || p.category.includes(format);
  }).slice(0, 2);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background border-border rounded-3xl p-6 sm:p-8">
        <DialogHeader>
          <div className="flex items-center gap-2 text-gold">
            <Sparkles className="h-4 w-4" />
            <span className="eyebrow">Personal Spice Sommelier</span>
          </div>
          <DialogTitle className="font-display text-2xl text-foreground">
            {step === 1 && "What heat level do you enjoy most in your dishes?"}
            {step === 2 && "What type of meals do you cook most often?"}
            {step === 3 && "How do you prefer to prepare your masalas?"}
            {step === 4 && "Your Personalized First Flames Spice Curation"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { level: "Mild", label: "Aromatic & Gentle", desc: "Rich aroma, minimal sting. Perfect for delicate stews and kids." },
                { level: "Medium", label: "Balanced Warmth", desc: "Classic North Indian warmth. Satisfying kick with deep terpene fragrance." },
                { level: "Hot", label: "Bold & Vibrant", desc: "High Capsaicin percentage. Kashmiri & Guntur hot profile." },
              ].map((h) => (
                <button
                  key={h.level}
                  onClick={() => {
                    setHeat(h.level as any);
                    setStep(2);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all hover:border-gold ${
                    heat === h.level ? "border-gold bg-gold/10" : "border-border bg-surface"
                  }`}
                >
                  <Flame className={`h-5 w-5 ${h.level === "Hot" ? "text-red-500" : h.level === "Medium" ? "text-amber-500" : "text-emerald-500"}`} />
                  <p className="font-semibold text-foreground mt-2">{h.label}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{h.desc}</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "everyday", name: "Everyday Dal & Sabzi", desc: "Simple homestyle Indian cooking" },
                { id: "curries", name: "Rich Royal Curries", desc: "Korma, Butter Masala, Rogan Josh" },
                { id: "biryani", name: "Slow-Cooked Biryanis", desc: "Fragrant rice & whole spice infusion" },
                { id: "gourmet", name: "Modern Fusion & Grills", desc: "Dry rubs, roasted vegetables, dips" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setDish(d.id as any);
                    setStep(3);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all hover:border-gold ${
                    dish === d.id ? "border-gold bg-gold/10" : "border-border bg-surface"
                  }`}
                >
                  <p className="font-semibold text-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "ground", name: "Stone-Ground Powders", desc: "Ready to sprinkle and bloom in ghee" },
                { id: "whole", name: "Whole Sun-Dried Pods", desc: "Tempering & fresh hand-crushing" },
                { id: "blend", name: "Master Craft Blends", desc: "Complex 14-ingredient traditional masalas" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFormat(f.id as any);
                    setStep(4);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all hover:border-gold ${
                    format === f.id ? "border-gold bg-gold/10" : "border-border bg-surface"
                  }`}
                >
                  <p className="font-semibold text-foreground">{f.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Based on your preference for <strong>{heat} heat</strong> and <strong>{dish}</strong>, our Jaipur master blenders recommend:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
              <div className="flex justify-between items-center pt-2">
                <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-full">
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Retake Quiz
                </Button>
                <Button onClick={onClose} className="rounded-full bg-primary text-primary-foreground">
                  Explore Full Catalog <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
