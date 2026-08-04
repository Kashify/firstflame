import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import farmImg from "@/assets/story-farm.jpg";
import grindImg from "@/assets/story-grind.jpg";
import heroImg from "@/assets/hero-spices.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Fifty Years of Milling | First Flames Spices" },
      {
        name: "description",
        content:
          "From a single stone mill in Jaipur to 260 partner farms: how First Flames Spices sources, grinds and packs India's finest spices.",
      },
      { property: "og:title", content: "Our Story | First Flames Spices" },
      {
        property: "og:description",
        content: "Fifty years of sourcing, stone-grinding and packing India's finest spices.",
      },
    ],
  }),
  component: About,
});

const process = [
  { n: "01", t: "Sourcing", d: "We buy directly from 260 partner farms, paying above mandi rates for the top grade of each harvest." },
  { n: "02", t: "Cleaning & sorting", d: "Every lot is destoned, de-dusted and optically sorted. Anything below grade goes back." },
  { n: "03", t: "Lab testing", d: "Pesticide residue, aflatoxin, moisture and colour value are tested batch by batch." },
  { n: "04", t: "Stone grinding", d: "Cold stone mills keep temperatures below 40°C so the volatile oils stay in the powder." },
  { n: "05", t: "Packing", d: "Nitrogen-flushed, food-grade pouches and glass, sealed within 48 hours of milling." },
];

export function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[oklch(0.18_0.02_155_/_0.82)]" />
        <div className="container-page relative py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow text-gold">Est. 1974 · Jaipur</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl text-[oklch(0.97_0.012_88)] md:text-5xl">
              Three generations, one stone mill, and a refusal to cut corners
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div className="min-w-0">
          <p className="eyebrow text-accent">How it started</p>
          <h2 className="mt-2 font-display text-3xl">A shop, a scale and a sack of turmeric</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              In 1974, Devraj Agarwal opened a nine-foot shopfront in Jaipur's Johari Bazaar with one
              stone mill and one rule: never sell a spice you would not cook with at home. Customers
              came for the turmeric and stayed for fifty years.
            </p>
            <p>
              His grandchildren run the business today. The mill is bigger, the lab is new, and the
              packaging finally does the contents justice — but the rule has not moved. We still
              refuse lots. We still print the milling date. We still name the village.
            </p>
            <p>
              Today we supply more than 400 professional kitchens and tens of thousands of homes
              across India, and we buy from 260 farms we can each name.
            </p>
          </div>
          <Button asChild className="mt-8 rounded-full px-7">
            <Link to="/shop">Shop the collection</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={farmImg} alt="Turmeric harvest" loading="lazy" className="h-80 w-full rounded-2xl object-cover" />
          <img src={grindImg} alt="Stone grinding" loading="lazy" className="mt-10 h-80 w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="container-page">
          <p className="eyebrow text-accent">Manufacturing & quality</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl md:text-4xl">
            Five steps between the field and your jar
          </h2>
          <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-border">
            {process.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="grid gap-3 border-b border-border bg-card p-6 last:border-0 sm:grid-cols-[80px_200px_minmax(0,1fr)] sm:items-baseline"
              >
                <span className="font-display text-2xl text-accent">{s.n}</span>
                <span className="font-display text-lg">{s.t}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{s.d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
