import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/product-card";
import { categories, priceBounds, type CategorySlug, type Product } from "@/lib/catalog";
import { inr } from "@/lib/format";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "discount";

const sortLabels: Record<SortKey, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
  discount: "Biggest saving",
};

const spiceLevels = ["Mild", "Medium", "Hot"] as const;

export function ShopBrowser({
  source,
  lockedCategory,
}: {
  source: Product[];
  lockedCategory?: CategorySlug;
}) {
  const [selectedCats, setSelectedCats] = useState<CategorySlug[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [levels, setLevels] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const list = source.filter((p) => {
      if (!lockedCategory && selectedCats.length && !selectedCats.includes(p.category)) return false;
      if (p.price > maxPrice) return false;
      if (organicOnly && !p.organic) return false;
      if (inStockOnly && p.stock === 0) return false;
      if (levels.length && !levels.includes(p.spiceLevel)) return false;
      if (p.rating < minRating) return false;
      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        sorted.sort((a, b) => b.discount - a.discount);
        break;
      default:
        sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
    }
    return sorted;
  }, [source, lockedCategory, selectedCats, maxPrice, organicOnly, inStockOnly, levels, minRating, sort]);

  const activeCount =
    selectedCats.length +
    (organicOnly ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    levels.length +
    (minRating > 0 ? 1 : 0) +
    (maxPrice < priceBounds.max ? 1 : 0);

  const reset = () => {
    setSelectedCats([]);
    setMaxPrice(priceBounds.max);
    setOrganicOnly(false);
    setInStockOnly(false);
    setLevels([]);
    setMinRating(0);
  };

  const Filters = (
    <div className="space-y-8">
      {!lockedCategory && (
        <div>
          <p className="eyebrow mb-3 text-muted-foreground">Category</p>
          <div className="space-y-2.5">
            {categories.map((c) => (
              <div key={c.slug} className="flex items-center gap-2.5">
                <Checkbox
                  id={`cat-${c.slug}`}
                  checked={selectedCats.includes(c.slug)}
                  onCheckedChange={(v) =>
                    setSelectedCats((prev) =>
                      v ? [...prev, c.slug] : prev.filter((s) => s !== c.slug),
                    )
                  }
                />
                <Label htmlFor={`cat-${c.slug}`} className="cursor-pointer text-sm font-normal">
                  {c.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow mb-3 text-muted-foreground">Max price</p>
        <Slider
          value={[maxPrice]}
          min={priceBounds.min}
          max={priceBounds.max}
          step={50}
          onValueChange={([v]) => setMaxPrice(v ?? priceBounds.max)}
        />
        <p className="mt-2.5 text-sm text-muted-foreground">Up to {inr(maxPrice)}</p>
      </div>

      <div>
        <p className="eyebrow mb-3 text-muted-foreground">Spice level</p>
        <div className="flex flex-wrap gap-2">
          {spiceLevels.map((l) => (
            <button
              key={l}
              onClick={() =>
                setLevels((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]))
              }
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                levels.includes(l)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-surface"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3 text-muted-foreground">Rating</p>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                minRating === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-surface"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="organic"
            checked={organicOnly}
            onCheckedChange={(v) => setOrganicOnly(Boolean(v))}
          />
          <Label htmlFor="organic" className="cursor-pointer text-sm font-normal">
            Organic only
          </Label>
        </div>
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="instock"
            checked={inStockOnly}
            onCheckedChange={(v) => setInStockOnly(Boolean(v))}
          />
          <Label htmlFor="instock" className="cursor-pointer text-sm font-normal">
            In stock only
          </Label>
        </div>
      </div>

      {activeCount > 0 && (
        <Button variant="ghost" onClick={reset} className="rounded-full px-3">
          <X className="mr-1.5 h-4 w-4" /> Clear filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="sticky top-28">{Filters}</div>
      </aside>

      <div className="min-w-0">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 truncate text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="rounded-full lg:hidden">
                  <SlidersHorizontal className="mr-1.5 h-4 w-4" />
                  Filters{activeCount > 0 ? ` (${activeCount})` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto p-6">
                <SheetTitle className="mb-6 font-display text-xl">Filters</SheetTitle>
                {Filters}
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="w-[170px] rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                  <SelectItem key={k} value={k}>
                    {sortLabels[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-24 text-center">
            <p className="font-display text-xl">Nothing matches those filters</p>
            <p className="mt-2 text-sm text-muted-foreground">Try widening your price or rating.</p>
            <Button variant="outline" onClick={reset} className="mt-5 rounded-full">
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
