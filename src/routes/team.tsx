import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import t1 from "@/assets/team-1.jpg";
import t2 from "@/assets/team-2.jpg";
import t3 from "@/assets/team-3.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Rapulana Attorneys" },
      { name: "description", content: "Meet the senior attorneys behind Rapulana — a boutique bench with decades of combined courtroom and corporate experience." },
    ],
  }),
  component: TeamPage,
});

const team = [
  { img: t1, name: "Thabo Rapulana", role: "Founding Partner", bio: "Senior commercial and M&A attorney with over twenty years advising listed and family-owned companies across SADC." },
  { img: t2, name: "Nomsa Dlamini", role: "Partner — Family & Estates", bio: "Trusted counsel on sensitive family, trust and estate matters. Admitted notary and conveyancer." },
  { img: t3, name: "Daniel van Wyk", role: "Partner — Litigation", bio: "Seasoned litigator with a deep High Court practice in commercial disputes, urgent applications and arbitration." },
];

function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="A small bench of senior attorneys you'll actually meet."
        description="Every matter at Rapulana is led by a partner. These are the people who will pick up the phone."
      />

      <section className="container-prose py-24">
        <div className="grid gap-12 md:grid-cols-3">
          {team.map((m) => (
            <article key={m.name} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
                <img
                  src={m.img}
                  alt={`Portrait of ${m.name}`}
                  width={800}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-6">{m.role}</p>
              <h3 className="mt-2 text-2xl text-primary">{m.name}</h3>
              <p className="mt-3 text-muted-foreground">{m.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="container-prose grid gap-12 py-20 md:grid-cols-2 md:items-center">
          <img
            src={teamMeeting}
            alt="The Rapulana team in collaboration"
            width={1600}
            height={1024}
            loading="lazy"
            className="rounded-sm object-cover shadow-md"
          />
          <div>
            <p className="eyebrow">Beyond the partners</p>
            <h2 className="mt-3 text-3xl font-medium text-primary md:text-4xl">
              A trusted network of associates, candidate attorneys and counsel.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Our partners are supported by a carefully selected team of
              associates and candidate attorneys, plus a curated network of
              senior advocates we brief regularly across the country.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
