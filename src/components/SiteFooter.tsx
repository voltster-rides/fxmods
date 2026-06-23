import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list", { description: "We'll send drops and deals.", position: "top-right" });
    setEmail("");
  };
  return (
    <footer className="mt-16">
      {/* Lime newsletter band */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 md:py-24 text-center">
          <h2 className="font-display uppercase text-4xl md:text-6xl tracking-tight">
            Ride with us
          </h2>
          <p className="mt-4 text-sm md:text-base opacity-80">
            Be the first to know about new drops and exclusive offers.
          </p>
          <form onSubmit={handleSubscribe} className="mt-8 mx-auto max-w-md flex items-center border border-primary-foreground/60 bg-transparent">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent px-5 py-4 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none"
            />
            <button type="submit" aria-label="Subscribe" className="px-5 py-4 hover:opacity-70 transition-opacity">
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Dark footer */}
      <div className="bg-card">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-display text-sm tracking-[0.25em] uppercase mb-6">About FX</h4>
            <ul className="space-y-4 text-sm uppercase tracking-[0.15em] text-muted-foreground font-display">
              <li><Link to="/catalog" className="hover:text-primary">Catalog</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div className="flex md:justify-end gap-6 items-start">
            <Link to="/" className="font-display text-4xl uppercase tracking-tight text-primary">
              FX<span className="text-foreground">.</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              We find freedom in the throttle, and the ride to find it is half the fun.
            </p>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6 text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} FX Mods. Built by riders, for riders.
          </div>
        </div>
      </div>
    </footer>
  );
}