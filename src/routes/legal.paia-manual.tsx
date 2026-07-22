import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import paiaManual from "@/assets/paia-manual.pdf.asset.json";

export const Route = createFileRoute("/legal/paia-manual")({
  component: PaiaManualPage,
  head: () => ({
    meta: [
      { title: "PAIA Manual | Rapulana Attorneys" },
      { name: "description", content: "Rapulana Attorneys PAIA Manual prepared under Section 51 of the Promotion of Access to Information Act." },
      { property: "og:title", content: "PAIA Manual | Rapulana Attorneys" },
      { property: "og:description", content: "Rapulana Attorneys PAIA Manual prepared under Section 51 of the Promotion of Access to Information Act." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function PaiaManualPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-secondary/30">
          <div className="container-prose py-12">
            <p className="eyebrow text-gold">Legal</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">PAIA Manual</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Prepared in accordance with Section 51 of the Promotion of Access to Information Act 2 of 2000.
            </p>
            <a
              href={paiaManual.url}
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
              src={paiaManual.url}
              title="PAIA Manual"
              className="h-[85vh] w-full"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
