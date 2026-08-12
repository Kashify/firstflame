import { useState, lazy, Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Leaf, ShieldCheck, Sprout, Star, Truck, Sparkles, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/catalog";
import heroImg from "@/assets/hero-spices.jpg";
import farmImg from "@/assets/story-farm.jpg";
import grindImg from "@/assets/story-grind.jpg";
import brandLogo from "@/assets/brand-logo.png";
import chilliImg from "@/assets/products/red-chilli-powder.jpg";
import dhaniaImg from "@/assets/products/dhania-powder.jpg";
import pepperImg from "@/assets/products/black-pepper-powder.jpg";
import haldiImg from "@/assets/products/haldi-powder.jpg";

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
      { title: "FIRST FLAME — Premium Spices & Dry Fruits | Purity, Freshness & Authentic Taste" },
      {
        name: "description",
        content:
          "FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste. Processed under hygienic standards for healthy everyday cooking.",
      },
      { property: "og:title", content: "FIRST FLAME — Premium Spices & Dry Fruits | Purity, Freshness & Authentic Taste" },
      {
        property: "og:description",
        content:
          "FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste. Processed under hygienic standards for healthy everyday cooking.",
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
    a: "We grind and pack to order. Every pack leaves our facility within 48 hours of milling, and we print the milling date — not just the expiry — on every pack.",
  },
  {
    q: "Do you use any artificial colours, fillers or preservatives?",
    a: "No. FIRST FLAME products are 100% natural with zero artificial colours, zero preservatives, and zero anti-caking additives.",
  },
  {
    q: "Do you supply restaurants and hotel kitchens?",
    a: "Yes. We supply over 400 professional kitchens across India in bulk packaging with custom invoice billing. Contact us for commercial pricing.",
  },
  {
    q: "What is your satisfaction guarantee?",
    a: "If a pack arrives damaged or the aroma is not what you expected, contact us within 7 days for an immediate replacement or full refund.",
  },
];

function Home() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      {/* Hero Section with Layered 3D Particle Atmosphere & Official Product Pouch Showcase */}
      <section className="relative min-h-[85vh] overflow-hidden bg-[#0F1E16] text-[oklch(0.97_0.012_88)]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={heroImg}
            alt="Single origin Indian spices arranged on dark Jaipur stone"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E16] via-[#0F1E16]/80 to-transparent" />
        </div>

        {/* 3D Volumetric Spice Particles Layer */}
        <Suspense fallback={null}>
          <SpiceHeroCanvas />
        </Suspense>

        {/* Hero Content Overlay: Left Headlines + Right Official FIRST FLAME Pouches Showcase */}
        <div className="container-page relative z-20 flex min-h-[85vh] items-center py-16 md:py-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-12">
            {/* Left Copy Column */}
            <div className="lg:col-span-7">
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
                  FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste for healthy everyday cooking.
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
                    Find My Spice
                  </Button>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[oklch(0.9_0.012_88_/_0.75)] border-t border-[oklch(1_0_0_/_0.12)] pt-6">
                  <span className="flex items-center gap-2 font-medium text-[oklch(0.97_0.012_88)]">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    4.9 / 5 Customer Rating
                  </span>
                  <span>•</span>
                  <span>400+ Kitchen Accounts</span>
                  <span>•</span>
                  <span>100% Natural & Wholesome</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Official FIRST FLAME Pouch & Emblem Showcase */}
            <div className="hidden lg:col-span-5 lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto flex max-w-md flex-col items-center justify-center text-center"
              >
                {/* Glow Halo behind center seal */}
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-gold/30 via-emerald-500/20 to-amber-500/10 blur-3xl opacity-70" />

                {/* Floating Composite Grid of Official Pouches around the Logo Seal */}
                <div className="relative grid grid-cols-2 gap-3.5 p-2">
                  {/* Pouch 1: Red Chilli */}
                  <motion.div
                    whileHover={{ y: -5, rotate: -2, scale: 1.04 }}
                    className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-[#0F1E16]/85 p-2 shadow-2xl backdrop-blur"
                  >
                    <img
                      src={chilliImg}
                      alt="FIRST FLAME Red Chilli Powder Pouch"
                      className="h-40 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-1.5 text-center">
                      <p className="font-display text-xs font-semibold text-gold">RED CHILLI</p>
                      <p className="text-[10px] text-[oklch(0.85_0.012_88)]">100g • ₹95</p>
                    </div>
                  </motion.div>

                  {/* Pouch 2: Haldi */}
                  <motion.div
                    whileHover={{ y: -5, rotate: 2, scale: 1.04 }}
                    className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-[#0F1E16]/85 p-2 shadow-2xl backdrop-blur"
                  >
                    <img
                      src={haldiImg}
                      alt="FIRST FLAME Haldi Powder Pouch"
                      className="h-40 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-1.5 text-center">
                      <p className="font-display text-xs font-semibold text-gold">HALDI POWDER</p>
                      <p className="text-[10px] text-[oklch(0.85_0.012_88)]">100g • ₹65</p>
                    </div>
                  </motion.div>

                  {/* Center Official Brand Seal Emblem Badge */}
                  <div className="col-span-2 relative my-0.5 flex items-center justify-center">
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      className="relative z-10 flex items-center gap-3 rounded-full border border-gold/60 bg-[#0F1E16]/95 px-5 py-2 shadow-2xl backdrop-blur"
                    >
                      <img src={brandLogo} alt="FIRST FLAME Seal Logo" className="h-8 w-8 rounded-full object-contain" />
                      <div className="text-left">
                        <p className="font-display text-xs font-bold text-gold tracking-wide">TRADITIONAL TASTE</p>
                        <p className="text-[10px] text-emerald-400 font-medium">100% Natural • Pure & Wholesome</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Pouch 3: Dhania */}
                  <motion.div
                    whileHover={{ y: -5, rotate: -2, scale: 1.04 }}
                    className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-[#0F1E16]/85 p-2 shadow-2xl backdrop-blur"
                  >
                    <img
                      src={dhaniaImg}
                      alt="FIRST FLAME Dhania Powder Pouch"
                      className="h-40 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-1.5 text-center">
                      <p className="font-display text-xs font-semibold text-gold">DHANIA POWDER</p>
                      <p className="text-[10px] text-[oklch(0.85_0.012_88)]">80g • ₹50</p>
                    </div>
                  </motion.div>

                  {/* Pouch 4: Black Pepper */}
                  <motion.div
                    whileHover={{ y: -5, rotate: 2, scale: 1.04 }}
                    className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-[#0F1E16]/85 p-2 shadow-2xl backdrop-blur"
                  >
                    <img
                      src={pepperImg}
                      alt="FIRST FLAME Black Pepper Powder Pouch"
                      className="h-40 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-1.5 text-center">
                      <p className="font-display text-xs font-semibold text-gold">BLACK PEPPER</p>
                      <p className="text-[10px] text-[oklch(0.85_0.012_88)]">100g • ₹180</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-surface py-10">
        <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Primary 4-Product Collection Showcase */}
      <section className="container-page py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow text-gold font-semibold">OUR MASALE RANGE</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Pure Natural Authentic Taste — The 4 Core Spices</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/shop">
              Shop collection <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Interactive 3D Stone Grinder Section */}
      <div className="container-page">
        <Suspense fallback={<div className="h-64 rounded-3xl bg-surface animate-pulse" />}>
          <SpiceGrinderInteractive />
        </Suspense>
      </div>

      {/* Farm to kitchen Story & Brand Commitments */}
      <section className="bg-surface py-16 md:py-24 border-y border-border">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="min-w-0"
          >
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Authentic Taste for Everyday Cooking & Healthy Living
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste. We focus on sourcing high-quality raw materials, processing them under hygienic standards, and providing natural products that enhance everyday cooking. With a dedication to quality and customer satisfaction, FIRST FLAME aims to become a trusted name in households and food markets.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { n: "100%", l: "Pure & Natural" },
                { n: "0", l: "Artificial Colours" },
                { n: "48 hr", l: "Freshly Sealed" },
              ].map((s) => (
                <div key={s.l} className="min-w-0">
                  <dt className="font-display text-3xl text-primary font-bold">{s.n}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
            <Button asChild className="mt-8 rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              <Link to="/about">Read our full story</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src={farmImg}
              alt="Fresh raw spice materials sourced directly from farms"
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover shadow-soft sm:h-80 border border-border"
            />
            <img
              src={grindImg}
              alt="Hygienic stone milling under strict quality standards"
              loading="lazy"
              className="mt-8 h-64 w-full rounded-2xl object-cover shadow-soft sm:h-80 border border-border"
            />
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews & Social Proof */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container-page">
          <h2 className="max-w-2xl font-display text-3xl md:text-4xl">
            Trusted by Professional Chefs & Home Cooks
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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

      {/* FAQ Section */}
      <section className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="min-w-0">
          <h2 className="font-display text-3xl md:text-4xl">Questions, answered</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Have questions about our sourcing or bulk orders? Our team answers every inquiry personally.
          </p>
          <Button asChild variant="outline" className="mt-6 rounded-full border-border hover:bg-surface">
            <Link to="/contact">Talk to our team</Link>
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
