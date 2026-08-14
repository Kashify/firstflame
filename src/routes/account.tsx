import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, MapPin, Package, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inr } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | First flame Spices" },
      { name: "description", content: "Manage your profile, shipping addresses and order history." },
      { property: "og:title", content: "My Account | First flame Spices" },
      { property: "og:description", content: "Your orders, addresses and wishlist." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

function Account() {
  const { orders, addresses, wishlist, removeAddress } = useStore();

  return (
    <div className="container-page py-12 md:py-16">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-surface">
            <User className="h-6 w-6 text-primary" />
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-display text-3xl">My account</h1>
            <p className="text-sm text-muted-foreground">Guest session on this device</p>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Package, label: "Orders", value: orders.length },
          { icon: MapPin, label: "Saved addresses", value: addresses.length },
          { icon: Heart, label: "Wishlist items", value: wishlist.length },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-border p-5">
            <s.icon className="h-5 w-5 shrink-0 text-accent" />
            <div className="min-w-0">
              <p className="font-display text-2xl">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="orders" className="mt-10">
        <TabsList className="rounded-full bg-surface p-1">
          <TabsTrigger value="orders" className="rounded-full px-5">
            Orders
          </TabsTrigger>
          <TabsTrigger value="addresses" className="rounded-full px-5">
            Addresses
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-full px-5">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="pt-6">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center">
              <p className="font-display text-xl">No orders yet</p>
              <Button asChild className="mt-5 rounded-full px-8">
                <Link to="/shop">Start shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o.id} className="rounded-2xl border border-border p-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-mono text-xs text-muted-foreground">{o.id}</p>
                      <p className="mt-1 text-sm">
                        {new Date(o.placedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-surface px-3 py-1 text-xs font-medium">
                      {o.status}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {o.lines.map((l) => (
                      <li key={`${l.name}-${l.weight}`} className="truncate">
                        {l.name} · {l.weight} × {l.qty}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-display text-base">{inr(o.total)}</p>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="addresses" className="pt-6">
          {addresses.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border py-20 text-center text-sm text-muted-foreground">
              Addresses you use at checkout are saved here.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {addresses.map((a) => (
                <li key={a.id} className="rounded-2xl border border-border p-5 text-sm">
                  <p className="font-medium">
                    {a.name} · {a.label}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {a.line1}
                    {a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} {a.pincode}
                  </p>
                  <p className="mt-1 text-muted-foreground">{a.phone}</p>
                  <Button
                    variant="ghost"
                    className="mt-3 rounded-full px-3 text-xs"
                    onClick={() => removeAddress(a.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="settings" className="pt-6">
          <div className="max-w-lg rounded-2xl border border-border p-6">
            <p className="flex items-center gap-2 font-display text-lg">
              <Settings className="h-4 w-4" /> Preferences
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your bag, wishlist and addresses are stored on this device. Sign-in with email, OTP
              and Google — plus synced orders across devices — is the next milestone.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
