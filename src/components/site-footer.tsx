import logoLight from "@/assets/logo-light.jpeg";

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
            <li><a href="#about" className="hover:text-gold">About</a></li>
            <li><a href="#services" className="hover:text-gold">Services</a></li>
            <li><a href="#team" className="hover:text-gold">Team</a></li>
            <li><a href="#contact" className="hover:text-gold">Contact</a></li>
            <li><a href="#booking" className="hover:text-gold">Book Consultation</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-gold">Contact</p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>353 Festival Street, Pretoria</li>
            <li>Hatfield</li>
            <li>073 989 7286</li>
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
