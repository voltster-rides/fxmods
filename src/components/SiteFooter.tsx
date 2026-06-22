import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list", { description: "We'll send drops and deals.", position: "top-right" });
    setEmail("");
  };
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link to="/" className="font-display text-3xl tracking-[0.2em] uppercase text-primary">
              FX Mods
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Premium plug-and-play upgrades for Surron and e-bikes. Built by riders, for riders.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="hover:text-primary">All Products</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase mb-4">Get on the list</h4>
            <p className="text-sm text-muted-foreground mb-4">Early access to drops and exclusive deals.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-border"
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider">
                Join
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} FX Mods. All rights reserved.</p>
          <p>Preorders may take 1–2 weeks to ship.</p>
        </div>
      </div>
    </footer>
  );
}