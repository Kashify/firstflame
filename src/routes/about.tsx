import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, HeartHandshake, Leaf, CheckCircle2 } from "lucide-react";
import farmImg from "@/assets/story-farm.jpg";
import grindImg from "@/assets/story-grind.jpg";
import heroImg from "@/assets/hero-spices.jpg";
import logoImg from "@/assets/brand-logo.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Pure Spices & Dry Fruits | FIRST FLAME" },
      {
        name: "description",
        content:
          "At First Flame, we believe that exceptional taste begins with uncompromising purity. Every spice and every ingredient is carefully selected to bring you authentic flavour, rich aroma, and premium quality.",
      },
      { property: "og:title", content: "About Us | FIRST FLAME" },
      {
        property: "og:description",
        content:
          "Because when it comes to your family and your food, purity isn’t a choice — it’s a promise. First Flame — Har Vyanjan Mein Shudhta Ka Wada.",
      },
    ],
  }),
  component: About,
});

const processSteps = [
  { n: "01", t: "Raw Material Sourcing", d: "We select only high-quality raw spices and premium dry fruits directly from trusted farms and growers across India." },
  { n: "02", t: "Hygienic Processing", d: "Processed under strict hygienic standards in small batches to preserve volatile essential oils, natural aroma, and rich flavor." },
  { n: "03", t: "No Artificial Additives", d: "Zero artificial colours, zero preservatives, and no synthetic chemical additives — 100% natural, wholesome purity." },
  { n: "04", t: "Quality Testing", d: "Every lot undergoes rigorous quality inspections for aroma, purity, moisture, and authentic taste before packaging." },
  { n: "05", t: "Sealed Freshness", d: "Packed within 48 hours in food-grade, moisture-proof packaging so the real taste reaches your kitchen intact." },
];

const pillars = [
  {
    icon: Leaf,
    title: "100% Natural Purity",
    desc: "Sourced from the finest natural harvests with zero added artificial colours or chemical preservatives.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Standards",
    desc: "Cleaned, processed, and sealed under strict hygienic food safety protocols to ensure uncompromised quality.",
  },
  {
    icon: Sparkles,
    title: "Authentic Taste & Aroma",
    desc: "Har Vyanjan Mein, Shudhta Ka Wada — rich aroma and traditional flavor that enhances everyday healthy living.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Trust",
    desc: "Dedicated to quality and customer satisfaction, aiming to be a trusted name in every household and kitchen.",
  },
];

export function About() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-border">
        <img src={heroImg} alt="FIRST FLAME Spices & Dry Fruits" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[oklch(0.16_0.02_155_/_0.88)] backdrop-blur-[2px]" />
        <div className="container-page relative py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <img src={logoImg} alt="FIRST FLAME Seal of Purity" className="h-28 w-28 sm:h-36 sm:w-36 object-contain mb-4 filter drop-shadow-lg" />
            <span className="eyebrow inline-block rounded-full bg-gold/20 px-4 py-1.5 text-gold border border-gold/30 backdrop-blur font-medium">
              Har Swad Mein, Pehla Sa Pyar — FIRST FLAME
            </span>
            <h1 className="mx-auto mt-5 max-w-4xl font-display text-3xl text-[oklch(0.97_0.012_88)] md:text-5xl lg:text-6xl font-normal leading-tight">
              Purity, Freshness & Authentic Taste for Everyday Healthy Living
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[oklch(0.9_0.012_88_/_0.85)] font-light leading-relaxed">
              Bring home the real taste of pure spices and premium dry fruits, carefully sourced and processed to perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Official Client Text Passage 2: Editorial Brand Manifesto */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />
        <div className="container-page relative z-10 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-2 text-xs text-gold font-bold tracking-widest uppercase">
              <Sparkles className="h-4 w-4" />
              <span>THE FIRST FLAME PROMISE</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light leading-snug text-gold">
              At First Flame, we believe that exceptional taste begins with uncompromising purity.
            </h2>

            <div className="space-y-6 text-base sm:text-lg md:text-xl font-light leading-relaxed text-[oklch(0.92_0.012_88_/_0.95)] max-w-3xl mx-auto">
              <p>
                Every spice and every ingredient is carefully selected to bring you authentic flavour, rich aroma, and premium quality.
              </p>
              <p>
                Rooted in the timeless traditions of Indian kitchens, First Flame brings together the goodness of carefully chosen ingredients with the standards of modern quality.
              </p>
              <p className="font-medium text-white text-xl sm:text-2xl pt-2">
                Because when it comes to your family and your food, purity isn’t a choice — it’s a promise.
              </p>
            </div>

            <div className="pt-8 border-t border-[oklch(1_0_0_/_0.15)] max-w-md mx-auto">
              <p className="font-display text-2xl sm:text-3xl text-gold font-semibold tracking-wide">
                First Flame — Har Vyanjan Mein Shudhta Ka Wada.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Official Client Brand Overview Section */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <p className="eyebrow text-gold font-semibold">About FIRST FLAME</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl text-foreground leading-snug">
                Committed to Purity, Freshness, and Authentic Taste
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p className="font-medium text-foreground text-lg leading-relaxed border-l-4 border-gold pl-4 py-1 bg-surface/50 rounded-r-lg">
                FIRST FLAME is a premium spices and dry fruits brand committed to delivering purity, freshness, and authentic taste.
              </p>
              <p>
                The company focuses on sourcing high-quality raw materials, processing them under hygienic standards, and providing natural products that enhance everyday cooking and healthy living.
              </p>
              <p>
                With a dedication to quality and customer satisfaction, the brand aims to become a trusted name in households and food markets across India and beyond.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              {["100% Natural", "No Additional Colours", "No Preservatives", "Hygienically Processed"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {badge}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lift">
                <Link to="/shop">Explore Our Products</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img src={farmImg} alt="Fresh high quality raw material sourcing" loading="lazy" className="h-64 w-full rounded-2xl object-cover border border-border shadow-soft" />
              <div className="p-4 rounded-2xl bg-card border border-border text-center">
                <span className="font-display text-2xl text-gold font-bold block">100%</span>
                <span className="text-xs text-muted-foreground font-medium">Pure & Natural Spices</span>
              </div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-2xl bg-primary text-primary-foreground text-center shadow-soft">
                <span className="font-display text-xl block font-semibold">Zero Additives</span>
                <span className="text-xs opacity-90 block mt-0.5">No artificial colors or flavors</span>
              </div>
              <img src={grindImg} alt="Hygienic processing under strict standards" loading="lazy" className="h-64 w-full rounded-2xl object-cover border border-border shadow-soft" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Four Brand Pillars */}
      <section className="bg-surface py-16 md:py-24 border-y border-border">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow text-gold font-semibold">Why Choose FIRST FLAME</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Our Promise of Uncompromised Quality</h2>
            <p className="mt-3 text-sm text-muted-foreground">Har Vyanjan mein, Shudhta ka Vaada!</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-card border border-border space-y-3 hover:border-gold/40 transition-colors shadow-soft"
              >
                <div className="h-10 w-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="container-page py-16 md:py-24">
        <p className="eyebrow text-gold font-semibold">Hygienic Process</p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl md:text-4xl">
          5 Steps from Sourcing to Household Kitchens
        </h2>
        <div className="mt-10 space-y-px overflow-hidden rounded-2xl border border-border">
          {processSteps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="grid gap-3 border-b border-border bg-card p-6 last:border-0 sm:grid-cols-[80px_220px_minmax(0,1fr)] sm:items-baseline"
            >
              <span className="font-display text-2xl text-gold font-semibold">{s.n}</span>
              <span className="font-display text-lg font-medium">{s.t}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{s.d}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
