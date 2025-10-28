import { useState } from "react";
import { Search, DollarSign, Calendar, MapPin } from "lucide-react";

export default function TripFilters({ onChange }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [budget, setBudget] = useState("any");
  const [duration, setDuration] = useState("any");

  const apply = () => {
    onChange({ query, type, budget, duration });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <div className="col-span-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <Search className="h-5 w-5 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && apply()}
              placeholder="Search destination or trek..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <Select
            label="Type"
            value={type}
            onChange={setType}
            options={[
              { value: "all", label: "All" },
              { value: "solo", label: "Solo" },
              { value: "group", label: "Group" },
              { value: "trek", label: "Trek" },
            ]}
          />

          <Select
            label="Budget"
            value={budget}
            onChange={setBudget}
            options={[
              { value: "any", label: "Any" },
              { value: "low", label: "<$500" },
              { value: "mid", label: "$500-$1500" },
              { value: "high", label: ">$1500" },
            ]}
          />

          <Select
            label="Duration"
            value={duration}
            onChange={setDuration}
            options={[
              { value: "any", label: "Any" },
              { value: "short", label: "1-3 days" },
              { value: "medium", label: "4-7 days" },
              { value: "long", label: "8+ days" },
            ]}
          />

          <button
            onClick={apply}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2 font-medium text-white shadow-sm shadow-sky-200 transition hover:bg-sky-700"
          >
            <Calendar className="h-5 w-5" /> Apply Filters
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
          <MapPin className="h-4 w-4 text-slate-500" /> Popular: Bali, Manali, Swiss Alps
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
          <DollarSign className="h-4 w-4 text-slate-500" /> Tips: Book early for best rates
        </span>
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col">
      <span className="mb-1 text-xs font-medium text-slate-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
