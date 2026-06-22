import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Instagram } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FX Mods" },
      { name: "description", content: "Get in touch with the FX Mods team for support, custom builds, or wholesale inquiries." },
      { property: "og:title", content: "Contact — FX Mods" },
      { property: "og:description", content: "Get in touch with the FX Mods team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent", { description: "We'll get back to you within 24 hours.", position: "top-right" });
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-display tracking-[0.3em] uppercase text-primary mb-2">// Contact</p>
      <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight">Get in touch</h1>
      <p className="mt-4 text-muted-foreground max-w-xl">
        Questions, custom builds, or wholesale? Drop us a line.
      </p>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 bg-card border-border" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 bg-card border-border" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 bg-card border-border" />
            </div>
            <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-[0.2em] uppercase">
              Send Message
            </Button>
          </form>
        </div>
        <aside className="space-y-6">
          <div className="p-6 border border-border bg-card">
            <Mail className="h-6 w-6 text-primary mb-3" />
            <p className="font-display uppercase tracking-wider text-sm">Email</p>
            <p className="text-muted-foreground text-sm mt-1">support@fxmods.co</p>
          </div>
          <div className="p-6 border border-border bg-card">
            <MessageSquare className="h-6 w-6 text-primary mb-3" />
            <p className="font-display uppercase tracking-wider text-sm">Response</p>
            <p className="text-muted-foreground text-sm mt-1">Within 24 hours, Mon–Fri</p>
          </div>
          <div className="p-6 border border-border bg-card">
            <Instagram className="h-6 w-6 text-primary mb-3" />
            <p className="font-display uppercase tracking-wider text-sm">Follow</p>
            <p className="text-muted-foreground text-sm mt-1">@fxmods</p>
          </div>
        </aside>
      </div>
    </div>
  );
}