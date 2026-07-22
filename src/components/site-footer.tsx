import { Link } from "@tanstack/react-router";
import logoLight from "@/assets/logo-light.jpeg";
import paiaManual from "@/assets/paia-manual.pdf.asset.json";
import privacyPolicy from "@/assets/privacy-policy.pdf.asset.json";
import disclaimer from "@/assets/disclaimer.pdf.asset.json";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-prose grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logoLight} alt="Rapulana Attorneys logo" className="h-20 w-auto rounded-sm" />
          <p className="mt-6 max-w-sm text-sm text-primary-foreground/70">
            A boutique South African law firm built on integrity, precision,
            and decades of combined courtroom experience.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4 text-gold">Explore</p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/" hash="about" className="hover:text-gold">About</Link></li>
            <li><Link to="/" hash="services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/" hash="team" className="hover:text-gold">Team</Link></li>
            <li><Link to="/" hash="contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/booking" className="hover:text-gold">Book Consultation</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-gold">Contact</p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>Office 6.1 East</li>
            <li>First Floor, Brooklyn Court</li>
            <li>361 Veale Street</li>
            <li>Nieuw Muckleneuk</li>
            <li>Pretoria</li>
            <li>012 880 3154</li>
            <li>info@rapulana.co.za</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-prose flex flex-col items-center justify-between gap-2 py-6 text-xs text-primary-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} Rapulana Attorneys Inc. All rights reserved.</p>
          <p>Admitted attorneys of the High Court of South Africa.</p>
        </div>
      </div>
    </footer>
  );
}
