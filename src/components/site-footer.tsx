import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { categories } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-display text-xl">
            First Flames<span className="ml-1.5 text-accent">Spices</span>
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Sourced from named farms across India, stone-ground in small batches and packed within
            48 hours. Since 1974.
          </p>
          <div className="flex gap-2">
            {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-background"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4 text-muted-foreground">Shop</p>
          <ul className="space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="text-foreground/75 transition-colors hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-muted-foreground">Company</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/about" className="text-foreground/75 transition-colors hover:text-foreground">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-foreground/75 transition-colors hover:text-foreground">
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="text-foreground/75 transition-colors hover:text-foreground"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-foreground/75 transition-colors hover:text-foreground"
              >
                Contact & Support
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="eyebrow text-muted-foreground">The Spice Letter</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Recipes, harvest notes and early access to festival boxes. One email a month.
          </p>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
              if (!input.value) return;
              toast.success("You're on the list. Welcome to the kitchen.");
              input.value = "";
            }}
          >
            <Input
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="h-11 rounded-full bg-background"
            />
            <Button type="submit" className="h-11 shrink-0 rounded-full px-5">
              Join
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} First Flames Spices Pvt. Ltd. · FSSAI Lic. 10019011002345</p>
          <p>Shipping Policy · Returns · Privacy · Terms</p>
        </div>
      </div>
    </footer>
  );
}
