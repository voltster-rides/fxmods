import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, Instagram, Youtube, Facebook } from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list", { description: "We'll send drops and deals.", position: "top-right" });
    setEmail("");
  };
  return (
    <footer className="mt-12 px-3 pb-3 lg:px-4 lg:pb-4">
      <div className="rounded-3xl bg-foreground text-background">
        {/* Newsletter row */}
        <div className="grid gap-10 lg:grid-cols-2 px-8 lg:px-14 py-16 lg:py-20 border-b border-white/10">
          <div>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-[-0.03em] leading-[0.95]">
              Join the crew.
            </h2>
            <p className="mt-4 text-sm md:text-base opacity-70 max-w-md">
              Get first access to new drops, install guides, and rider-only deals.
            </p>
          </div>
          <div className="flex items-center lg:justify-end">
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center rounded-full border border-white/30 bg-transparent">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent px-6 py-4 text-sm text-background placeholder:text-background/50 focus:outline-none"
              />
              <button type="submit" aria-label="Subscribe" className="mr-1.5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground hover:opacity-90 transition">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8 lg:px-14 py-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display font-black text-2xl tracking-tight">FX MODS</Link>
            <p className="mt-4 text-sm opacity-60 max-w-xs">
              Premium mods for Surron and modern e-bikes. Built by riders, for riders.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Shop" links={[
            { label: "All Products", to: "/catalog" },
            { label: "Throttles", to: "/catalog" },
            { label: "Baja Lights", to: "/catalog" },
            { label: "Ignitions", to: "/catalog" },
            { label: "Bundles", to: "/catalog" },
          ]} />
          <FooterCol title="Support" links={[
            { label: "Contact", to: "/contact" },
            { label: "Install Guides", to: "/contact" },
            { label: "Warranty", to: "/contact" },
            { label: "Shipping", to: "/contact" },
            { label: "Returns", to: "/contact" },
          ]} />
          <FooterCol title="Company" links={[
            { label: "About", to: "/" },
            { label: "Team Riders", to: "/" },
            { label: "Wholesale", to: "/contact" },
            { label: "Press", to: "/contact" },
          ]} />
        </div>

        <div className="border-t border-white/10 px-8 lg:px-14 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-60">
          <p>© {new Date().getFullYear()} FX Mods. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100">Privacy</a>
            <a href="#" className="hover:opacity-100">Terms</a>
            <a href="#" className="hover:opacity-100">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-60 mb-5">{title}</h4>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="opacity-90 hover:opacity-100 hover:underline underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}