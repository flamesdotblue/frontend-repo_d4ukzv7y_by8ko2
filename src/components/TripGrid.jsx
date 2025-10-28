import { useMemo, useState } from "react";
import { Users, User, Mountain, Star, DollarSign, MapPin, ChevronRight } from "lucide-react";

const typeIcon = {
  solo: <User className="h-4 w-4" />,
  group: <Users className="h-4 w-4" />,
  trek: <Mountain className="h-4 w-4" />,
};

export default function TripGrid({ trips, onCompareSelect }) {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (trip) => {
    setSelected((prev) => {
      const exists = prev.find((t) => t.id === trip.id);
      const next = exists ? prev.filter((t) => t.id !== trip.id) : [...prev.slice(0, 2), trip];
      onCompareSelect(next);
      return next;
    });
  };

  const avgPrice = useMemo(() => {
    if (trips.length === 0) return 0;
    return Math.round(trips.reduce((s, t) => s + t.price, 0) / trips.length);
  }, [trips]);

  return (
    <section id="trips" className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Top picks for you</h2>
          <p className="text-slate-600">Average price: ${avgPrice}</p>
        </div>
        {selected.length > 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 text-sky-700">
            <DollarSign className="h-5 w-5" /> Comparing {selected.length} trip{selected.length > 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <article
            key={trip.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={trip.image}
                alt={trip.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{trip.title}</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                  {typeIcon[trip.type]} {trip.type}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {trip.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500" /> {trip.rating}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-slate-900">
                  <span className="text-xl font-bold">${trip.price}</span>
                  <span className="text-sm text-slate-500"> / person</span>
                </div>
                <button
                  onClick={() => toggleSelect(trip)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                    selected.find((t) => t.id === trip.id)
                      ? "bg-sky-600 text-white hover:bg-sky-700"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {selected.find((t) => t.id === trip.id) ? "Selected" : "Compare"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selected.length > 0 && (
        <ComparisonBar selected={selected} onClear={() => { setSelected([]); onCompareSelect([]); }} />
      )}
    </section>
  );
}

function ComparisonBar({ selected, onClear }) {
  const lowest = selected.reduce((min, t) => (t.price < min.price ? t : min), selected[0]);

  return (
    <div className="sticky bottom-4 mt-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
          <div className="flex flex-wrap items-center gap-3">
            {selected.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2">
                <img src={t.image} alt={t.title} className="h-10 w-14 rounded-md object-cover" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{t.title}</p>
                  <p className="text-xs text-slate-600">${t.price} • {t.duration}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700">
              Best deal: <span className="font-semibold">{lowest.title}</span>
            </div>
            <a href="#guides" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white shadow-sm hover:bg-sky-700">
              Continue booking <ChevronRight className="h-5 w-5" />
            </a>
            <button onClick={onClear} className="rounded-xl border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
