import { Plane, Mountain, Users, Compass } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="flex items-center gap-2 text-sky-600 font-medium">
            <Compass className="h-5 w-5" />
            <span>Plan. Compare. Go.</span>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Your next adventure, simplified
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Discover curated treks, solo escapes, and group getaways. Compare
            prices across operators in one place and book verified local guides
            for solo, family, or group trips.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <a
              href="#trips"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white shadow-sm shadow-sky-200 transition hover:bg-sky-700"
            >
              <Plane className="h-5 w-5" /> Explore trips
            </a>
            <a
              href="#guides"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sky-700 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-50"
            >
              <Users className="h-5 w-5" /> Book a guide
            </a>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FeatureCard
            icon={<Mountain className="h-6 w-6 text-sky-600" />}
            title="Epic treks"
            desc="Handpicked routes with verified difficulty, seasons, and costs."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6 text-sky-600" />}
            title="Solo to groups"
            desc="Flexible plans that scale from solo escapes to big crews."
          />
          <FeatureCard
            icon={<Plane className="h-6 w-6 text-sky-600" />}
            title="Best prices"
            desc="Side-by-side price comparison across trusted operators."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}
