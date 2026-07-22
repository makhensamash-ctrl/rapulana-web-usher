import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import privacyPolicy from "@/assets/privacy-policy.pdf.asset.json";

export const Route = createFileRoute("/legal/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Rapulana Attorneys" },
      { name: "description", content: "How Rapulana Attorneys collects, uses, and protects personal information under POPIA." },
      { property: "og:title", content: "Privacy Policy | Rapulana Attorneys" },
      { property: "og:description", content: "How Rapulana Attorneys collects, uses, and protects personal information under POPIA." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-secondary/30">
          <div className="container-prose py-12">
            <p className="eyebrow text-gold">Legal</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Privacy Policy</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              How we collect, use, and safeguard personal information in line with the Protection of Personal Information Act.
            </p>
            <a
              href={privacyPolicy.url}
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
              src={privacyPolicy.url}
              title="Privacy Policy"
              className="h-[85vh] w-full"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
