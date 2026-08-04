import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Wholesale Enquiries | First Flames Spices" },
      {
        name: "description",
        content:
          "Reach the First Flames Spices team in Jaipur for orders, wholesale accounts and restaurant supply.",
      },
      { property: "og:title", content: "Contact Us | First Flames Spices" },
      {
        property: "og:description",
        content: "Talk to our team in Jaipur about orders, wholesale and restaurant supply.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="container-page py-12 md:py-20">
      <div className="max-w-xl">
        <p className="eyebrow text-accent">Get in Touch</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">We would love to hear from you.</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Questions about a blend, tracking an order, or setting up a wholesale account for your
          restaurant — write to us and a team member in Jaipur will respond within one working day.
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <form
          className="space-y-5 rounded-3xl border border-border bg-surface p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thank you. Our team in Jaipur will write back within 24 hours.");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">First Name</label>
              <Input required className="mt-1.5 rounded-xl bg-background" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Last Name</label>
              <Input required className="mt-1.5 rounded-xl bg-background" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground">Email</label>
            <Input type="email" required className="mt-1.5 rounded-xl bg-background" />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground">Message</label>
            <Textarea rows={5} required className="mt-1.5 rounded-xl bg-background" />
          </div>

          <Button type="submit" size="lg" className="rounded-full px-8">
            Send message
          </Button>
        </form>

        <aside className="space-y-4">
          {[
            { icon: MapPin, t: "Our mill", d: "Plot 14, Sitapura Industrial Area, Jaipur 302022" },
            { icon: Phone, t: "Phone", d: "+91 141 400 1974 · Mon–Sat, 9am–7pm IST" },
            { icon: MessageCircle, t: "WhatsApp", d: "+91 98290 01974" },
            { icon: Mail, t: "Email", d: "hello@firstflamesspices.in" },
          ].map((c) => (
            <div key={c.t} className="flex gap-3 rounded-2xl border border-border p-5">
              <c.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{c.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
