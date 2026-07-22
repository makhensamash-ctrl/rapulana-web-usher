import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import disclaimer from "@/assets/disclaimer.pdf.asset.json";

export const Route = createFileRoute("/legal/disclaimer")({
  component: DisclaimerPage,
  head: () => ({
    meta: [
      { title: "Disclaimer & Terms | Rapulana Attorneys" },
      { name: "description", content: "Website disclaimer and terms and conditions for use of the Rapulana Attorneys website." },
      { property: "og:title", content: "Disclaimer & Terms | Rapulana Attorneys" },
      { property: "og:description", content: "Website disclaimer and terms and conditions for use of the Rapulana Attorneys website." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-secondary/30">
          <div className="container-prose py-12">
            <p className="eyebrow text-gold">Legal</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Disclaimer & Terms</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Terms of use and disclaimer governing your access to and use of the Rapulana Attorneys website.
            </p>
            <a
              href={disclaimer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium text-gold hover:underline"
            >
              Download PDF ↗
            </a>
          </div>
        </section>
        <section className="container-prose py-12">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              src={disclaimer.url}
              title="Disclaimer and Terms"
              className="h-[85vh] w-full"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
