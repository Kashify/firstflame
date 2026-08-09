import { useState, lazy, Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Leaf, ShieldCheck, Sprout, Star, Truck, Sparkles, Compass, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { bestSellers, categories, newArrivals } from "@/lib/catalog";
import heroImg from "@/assets/hero-spices.jpg";
import farmImg from "@/assets/story-farm.jpg";
import grindImg from "@/assets/story-grind.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SpiceFinderQuiz } from "@/components/spice-finder-quiz";

const SpiceHeroCanvas = lazy(() => import("@/components/3d/spice-hero-canvas"));
const SpiceGrinderInteractive = lazy(() => import("@/components/3d/spice-grinder-interactive"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "First Flames Spices — Luxury Single-Origin Indian Spices & Masalas" },
      {
        name: "description",
        content:
          "Single-origin turmeric, Kashmiri chilli, stone-ground garam masala and gift boxes. Sourced from named Indian farms and ground to order within 48 hours.",
      },
      { property: "og:title", content: "First Flames Spices — Luxury Single-Origin Indian Spices & Masalas" },
      {
        property: "og:description",
        content:
          "Single-origin turmeric, Kashmiri chilli, stone-ground garam masala and gift boxes. Sourced from named Indian farms and ground to order within 48 hours.",
      },
    ],
  }),
  component: Home,
});

const trust = [
  { icon: Sprout, title: "Direct from farms", copy: "Bought from named growers, never through spot markets." },
  { icon: Leaf, title: "Nothing added", copy: "No colour, no fillers, no anti-caking agents. Ever." },
  { icon: ShieldCheck, title: "Lab tested", copy: "Every batch checked for pesticide and aflatoxin limits." },
  { icon: Truck, title: "Packed in 48 hrs", copy: "Ground to order so the volatile oils reach you intact." },
];

const testimonials = [
  {
    quote:
      "I run a 90-cover kitchen and I have not found a garam masala with this much aroma at any price. We switched our entire line.",
    name: "Chef Rohan Mehta",
    role: "Executive Chef, Amara, Mumbai",
  },
  {
    quote:
      "The Kashmiri chilli gives the colour my mother's rogan josh had. Nothing off the supermarket shelf comes close.",
    name: "Anjali Suri",
    role: "Home cook, Gurugram",
  },
  {
    quote:
      "We order the restaurant packs monthly. Consistent grind, consistent colour, and the invoicing is painless.",
    name: "Vikram Iyer",
    role: "Purchase Head, Spice Route Hotels",
  },
];

const faqs = [
  {
    q: "How fresh are the spices when they arrive?",
    a: "We grind and pack to order. Every jar leaves our Jaipur facility within 48 hours of milling, and we print the milling date — not just the expiry — on every pack.",
  },
  {
    q: "Do you use any colour, fillers or anti-caking agents?",
    a: "No. Our Kashmiri chilli gets its colour from the chilli itself, which is why the shade varies slightly between harvests. That variation is the proof.",
  },
  {
    q: "Do you supply restaurants and hotels?",
    a: "Yes. We supply over 400 kitchens across India in 1 kg and 5 kg packs with monthly invoicing. Write to us and our wholesale team will set up an account.",
  },
  {
    q: "What is your return policy?",
    a: "If a pack arrives damaged or the aroma is not what you expected, tell us within 7 days and we will replace it or refund you in full. No return shipping required.",
  },
];

function Section({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="eyebrow text-gold font-semibold">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Home() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      {/* Opulent Editorial Hero Section with Layered 3D Atmosphere */}
      <section className="relative min-h-[85vh] overflow-hidden bg-[#0F1E16] text-[oklch(0.97_0.012_88)]">
        {/* Editorial Stock Image Background Layer */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={heroImg}
            alt="Single origin Indian spices arranged on dark Jaipur stone"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E16] via-[#0F1E16]/80 to-transparent" />
        </div>

        {/* Atmospheric 3D Volumetric Spice Particles Layer */}
        <Suspense fallback={null}>
          <SpiceHeroCanvas />
        </Suspense>

        {/* Hero Editorial Content Overlay */}
        <div className="container-page relative z-20 flex min-h-[85vh] items-center py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs text-gold font-semibold tracking-wider uppercase mb-6 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Asli Masalon Ka Asli Swaad — FIRST FLAME</span>
              </div>

              <h1 className="font-display text-4xl leading-[1.08] text-[oklch(0.97_0.012_88)] sm:text-6xl lg:text-7xl font-light tracking-tight">
                Purity, Freshness & Authentic Taste.
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[oklch(0.9_0.012_88_/_0.85)] font-light">
                FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste. Sourced with care, processed under hygienic standards, with zero artificial colours or preservatives.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm gold-border-glow shadow-lift">
                  <Link to="/shop">
                    Explore Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setQuizOpen(true)}
                  className="rounded-full border-gold/30 bg-surface/20 px-8 text-[oklch(0.97_0.012_88)] hover:bg-surface/40 backdrop-blur"
                >
                  <Compass className="mr-2 h-4 w-4 text-gold" />
                  Find My Blend
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[oklch(0.9_0.012_88_/_0.75)] border-t border-[oklch(1_0_0_/_0.12)] pt-6">
                <span className="flex items-center gap-2 font-medium text-[oklch(0.97_0.012_88)]">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  4.8 / 5 from 12,400+ reviews
                </span>
                <span>•</span>
                <span>Trusted by 400+ Michelin & Fine Kitchens</span>
                <span>•</span>
                <span>100% Traceable Harvests</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-surface">
        <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex min-w-0 items-start gap-3"
            >
              <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{t.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <Section
        eyebrow="Browse Shelves"
        title="Every shelf of the Indian kitchen"
        action={
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/shop">
              All products <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
            >
              <Link
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group relative block h-full min-h-[220px] overflow-hidden rounded-2xl border border-border"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.02_155_/_0.88)] via-[oklch(0.18_0.02_155_/_0.25)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-xl text-[oklch(0.97_0.012_88)]">{c.name}</p>
                  <p className="mt-1 text-sm text-[oklch(0.9_0.012_88_/_0.8)]">{c.tagline}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Our Masale Range */}
      <Section
        eyebrow="OUR MASALE RANGE"
        title="Pure Natural Authentic Taste — The 4 Core Spices"
        action={
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/shop">
              View all <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </Section>

      {/* Interactive 3D Stone Grinder Section */}
      <div className="container-page">
        <Suspense fallback={<div className="h-64 rounded-3xl bg-surface animate-pulse" />}>
          <SpiceGrinderInteractive />
        </Suspense>
      </div>

      {/* Farm to kitchen */}
      <section className="bg-surface py-16 md:py-24 border-y border-border">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <p className="eyebrow text-gold font-semibold">Har Vyanjan Mein, Shuddhata Ka Vaada!</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              Authentic Taste for Everyday Cooking & Healthy Living
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste. We focus on sourcing high-quality raw materials, processing them under hygienic standards, and providing natural products that enhance everyday cooking. With a dedication to quality and customer satisfaction, FIRST FLAME aims to become a trusted name in households and food markets.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-6">
              {[
                { n: "50", l: "Years of milling" },
                { n: "260+", l: "Partner farms" },
                { n: "48 hr", l: "Grind to pack" },
              ].map((s) => (
                <div key={s.l} className="min-w-0">
                  <dt className="font-display text-3xl text-primary">{s.n}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
            <Button asChild className="mt-8 rounded-full px-7">
              <Link to="/about">Read our story</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src={farmImg}
              alt="Farmer holding freshly harvested turmeric roots"
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover shadow-soft sm:h-80 border border-border"
            />
            <img
              src={grindImg}
              alt="Traditional stone grinding of turmeric"
              loading="lazy"
              className="mt-8 h-64 w-full rounded-2xl object-cover shadow-soft sm:h-80 border border-border"
            />
          </motion.div>
        </div>
      </section>

      {/* Freshly Ground & Sealed */}
      <Section eyebrow="Freshly Ground & Sealed" title="Har Vyanjan Mein, Shuddhata Ka Vaada!">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container-page">
          <p className="eyebrow text-gold">In Their Kitchens</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl md:text-4xl">
            Chefs, restaurateurs and home cooks agree
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[oklch(1_0_0_/_0.14)] bg-[oklch(1_0_0_/_0.06)] p-6 backdrop-blur-sm"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed opacity-90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block opacity-70">{t.role}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="min-w-0">
          <p className="eyebrow text-gold font-semibold">Good to Know</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Questions, answered</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Still unsure about something? Our team in Jaipur answers every message personally.
          </p>
          <Button asChild variant="outline" className="mt-6 rounded-full">
            <Link to="/contact">Talk to us</Link>
          </Button>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-display text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Quiz Modal */}
      <SpiceFinderQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
}
