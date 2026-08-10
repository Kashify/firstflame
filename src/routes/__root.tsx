import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import { SiteHeader } from "@/components/site-header";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { StoreProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-muted-foreground">Error 404</p>
        <h1 className="mt-3 font-display text-5xl text-foreground">This shelf is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has moved or never existed. Our spices, thankfully, are all
          where they should be.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Browse the shop
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FIRST FLAME — Premium Spices & Dry Fruits | Purity, Freshness & Authentic Taste" },
      {
        name: "description",
        content:
          "FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste. Processed under hygienic standards for healthy everyday cooking.",
      },
      { name: "author", content: "FIRST FLAME" },
      { property: "og:site_name", content: "FIRST FLAME" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#234B36" },
      { property: "og:title", content: "FIRST FLAME — Premium Spices & Dry Fruits | Purity, Freshness & Authentic Taste" },
      { name: "twitter:title", content: "FIRST FLAME — Premium Spices & Dry Fruits | Purity, Freshness & Authentic Taste" },
      { property: "og:description", content: "FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste. Processed under hygienic standards for healthy everyday cooking." },
      { name: "twitter:description", content: "FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste. Processed under hygienic standards for healthy everyday cooking." },
    ],

    links: [
      { rel: "icon", type: "image/png", href: "/brand-logo.png" },
      { rel: "apple-touch-icon", href: "/brand-logo.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            {/* Required: nested routes render here. */}
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <CartDrawer />
        <Toaster position="bottom-right" />
      </StoreProvider>
    </QueryClientProvider>
  );
}
