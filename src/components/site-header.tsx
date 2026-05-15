import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoDark from "@/assets/logo-dark.jpeg";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-prose flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Rapulana Attorneys home">
          <img src={logoDark} alt="Rapulana Attorneys logo" className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-secondary after:transition-transform hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Book a Consultation
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-primary"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container-prose flex flex-col gap-4 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="inline-flex w-fit items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
