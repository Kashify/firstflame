import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { categories, searchProducts } from "@/lib/catalog";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

import logoImg from "@/assets/brand-logo.png";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;

function SearchPanel({ onDone }: { onDone: () => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { recentSearches, rememberSearch } = useStore();
  const results = searchProducts(query).slice(0, 6);

  const go = (term: string) => {
    rememberSearch(term);
    onDone();
    navigate({ to: "/search", search: { q: term } });
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) go(query);
        }}
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search turmeric, garam masala, saffron…"
            className="h-12 rounded-full pl-11"
          />
        </div>
      </form>

      {results.length > 0 && (
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {results.map((p) => (
            <li key={p.slug}>
              <Link
                to="/product/$slug"
                params={{ slug: p.slug }}
                onClick={onDone}
                className="flex items-center gap-3 bg-card px-3 py-2.5 transition-colors hover:bg-surface"
              >
                <img
                  src={p.images[0]}
                  alt=""
                  loading="lazy"
                  className="h-11 w-11 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{p.name}</span>
                  <span className="block text-xs text-muted-foreground">{p.categoryName}</span>
                </span>
                <span className="shrink-0 text-sm">{inr(p.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!query && (
        <div className="space-y-3">
          {recentSearches.length > 0 && (
            <div>
              <p className="eyebrow mb-2 text-muted-foreground">Recent</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => go(term)}
                    className="rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-surface"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="eyebrow mb-2 text-muted-foreground">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {["Garam Masala", "Saffron", "Turmeric", "Biryani", "Kasuri Methi"].map((term) => (
                <button
                  key={term}
                  onClick={() => go(term)}
                  className="rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-surface"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="bg-primary py-2 text-center text-[12px] tracking-wide text-primary-foreground font-medium">
        Asli Masalon Ka Asli Swaad, Har Rasoi Mein — FIRST FLAME · Free shipping across India above ₹999
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/85 backdrop-blur-xl"
            : "border-transparent bg-background",
        )}
      >
        <div className="container-page grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 md:h-20">
          <div className="flex items-center gap-1 md:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto p-6">
                <SheetTitle className="font-display text-xl">First Flames Spices</SheetTitle>
                <nav className="mt-6 flex flex-col gap-1">
                  {navLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-surface"
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
                <p className="eyebrow mt-6 px-3 text-muted-foreground">Categories</p>
                <nav className="mt-2 flex flex-col gap-1">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    >
                      {c.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logoImg} alt="FIRST FLAME" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full border border-gold/40 shadow-soft transition-transform hover:scale-105" />
            <span className="font-display text-lg sm:text-xl leading-none tracking-tight flex flex-col justify-center">
              <span className="font-bold text-foreground">FIRST FLAME</span>
              <span className="text-[10px] tracking-widest text-gold uppercase font-semibold mt-1">MASALA & FOOD</span>
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-8 lg:flex">
            <div className="group relative">
              <Link
                to="/shop"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                Shop
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-popover p-3 shadow-lift">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface"
                    >
                      <img
                        src={c.image}
                        alt=""
                        loading="lazy"
                        className="h-11 w-11 shrink-0 rounded-lg object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{c.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {c.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {navLinks.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="justify-self-center md:hidden">
            <span className="font-display text-lg leading-none">First Flames</span>
          </Link>

          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? <X className="h-[18px] w-[18px]" /> : <Search className="h-[18px] w-[18px]" />}
            </Button>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link to="/wishlist" aria-label="Wishlist">
                <span className="relative">
                  <Heart className="h-[18px] w-[18px]" />
                  {wishlist.length > 0 && (
                    <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-spice px-1 text-[10px] font-semibold text-spice-foreground">
                      {wishlist.length}
                    </span>
                  )}
                </span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" asChild>
              <Link to="/account" aria-label="Account">
                <User className="h-[18px] w-[18px]" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Shopping bag"
              onClick={() => setCartOpen(true)}
            >
              <span className="relative">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </span>
            </Button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="container-page py-5">
              <SearchPanel onDone={() => setSearchOpen(false)} />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
