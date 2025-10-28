import { useMemo, useState } from "react";
import Hero from "./components/Hero";
import TripFilters from "./components/TripFilters";
import TripGrid from "./components/TripGrid";
import GuideBooking from "./components/GuideBooking";

const ALL_TRIPS = [
  {
    id: 1,
    title: "Bali Island Escape",
    type: "group",
    location: "Bali, Indonesia",
    duration: "5 days",
    rating: 4.7,
    price: 780,
    image:
      "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Manali Himalayan Trek",
    type: "trek",
    location: "Himachal, India",
    duration: "7 days",
    rating: 4.8,
    price: 620,
    image:
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b3?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Swiss Alps Solo Rail",
    type: "solo",
    location: "Bernese Oberland, CH",
    duration: "4 days",
    rating: 4.6,
    price: 990,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Andaman Family Retreat",
    type: "group",
    location: "Andaman, India",
    duration: "6 days",
    rating: 4.5,
    price: 850,
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Everest Base Camp",
    type: "trek",
    location: "Sagarmatha, Nepal",
    duration: "10 days",
    rating: 4.9,
    price: 1350,
    image:
      "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Kyoto Solo Culture Tour",
    type: "solo",
    location: "Kyoto, Japan",
    duration: "3 days",
    rating: 4.7,
    price: 540,
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1470&auto=format&fit=crop",
  },
];

export default function App() {
  const [filters, setFilters] = useState({ query: "", type: "all", budget: "any", duration: "any" });
  const [compare, setCompare] = useState([]);

  const filteredTrips = useMemo(() => {
    return ALL_TRIPS.filter((t) => {
      const matchesQuery = filters.query
        ? `${t.title} ${t.location} ${t.type}`.toLowerCase().includes(filters.query.toLowerCase())
        : true;
      const matchesType = filters.type === "all" ? true : t.type === filters.type;
      const matchesBudget =
        filters.budget === "any"
          ? true
          : filters.budget === "low"
          ? t.price < 500
          : filters.budget === "mid"
          ? t.price >= 500 && t.price <= 1500
          : t.price > 1500;
      const matchesDuration =
        filters.duration === "any"
          ? true
          : filters.duration === "short"
          ? parseInt(t.duration) <= 3
          : filters.duration === "medium"
          ? parseInt(t.duration) <= 7
          : parseInt(t.duration) >= 8;
      return matchesQuery && matchesType && matchesBudget && matchesDuration;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TripFilters onChange={setFilters} />
      <TripGrid trips={filteredTrips} onCompareSelect={setCompare} />
      <GuideBooking />
      <footer className="border-t border-slate-200 py-10 text-center text-slate-600">
        Built for explorers. Compare, book, and go.
      </footer>
    </div>
  );
}
