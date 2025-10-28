import { useState } from "react";
import { Users, User, Calendar, DollarSign, Phone, Mail } from "lucide-react";

export default function GuideBooking() {
  const [form, setForm] = useState({
    type: "solo",
    start: "",
    days: 3,
    people: 1,
    name: "",
    email: "",
    phone: "",
  });

  const pricePerDay = form.type === "solo" ? 80 : form.type === "group" ? 60 : 70; // trek mid price
  const estimate = form.days * pricePerDay * (form.type === "group" ? Math.max(1, Math.ceil(form.people / 4)) : 1);

  const submit = (e) => {
    e.preventDefault();
    alert(`Guide request submitted!\nType: ${form.type}\nStart: ${form.start}\nDays: ${form.days}\nPeople: ${form.people}\nEstimate: $${estimate}`);
  };

  return (
    <section id="guides" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Book a local guide</h2>
            <p className="text-slate-600">Certified experts for solo, family, and group adventures.</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <Badge icon={<User className="h-4 w-4" />} label="Solo" active={form.type === "solo"} onClick={() => setForm({ ...form, type: "solo", people: 1 })} />
            <Badge icon={<Users className="h-4 w-4" />} label="Group" active={form.type === "group"} onClick={() => setForm({ ...form, type: "group" })} />
            <Badge icon={<Users className="h-4 w-4" />} label="Family" active={form.type === "group"} onClick={() => setForm({ ...form, type: "group" })} />
          </div>
        </div>

        <form onSubmit={submit} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Trip type">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            >
              <option value="solo">Solo</option>
              <option value="group">Group / Family</option>
              <option value="trek">Trek</option>
            </select>
          </Field>

          <Field label="Start date">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <Calendar className="h-5 w-5 text-slate-500" />
              <input
                type="date"
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </Field>

          <Field label="Duration (days)">
            <input
              type="number"
              min={1}
              value={form.days}
              onChange={(e) => setForm({ ...form, days: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />
          </Field>

          <Field label="People">
            <input
              type="number"
              min={form.type === "solo" ? 1 : 1}
              value={form.people}
              onChange={(e) => setForm({ ...form, people: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />
          </Field>

          <Field className="sm:col-span-2" label="Full name">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />
          </Field>

          <Field label="Email">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <Mail className="h-5 w-5 text-slate-500" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </Field>

          <Field label="Phone">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <Phone className="h-5 w-5 text-slate-500" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 234 567 890"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </Field>

          <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div className="text-slate-700">
              <span className="text-sm">Instant estimate: </span>
              <span className="text-xl font-bold text-slate-900">${estimate}</span>
              <span className="text-sm text-slate-500"> (includes guide fees)</span>
            </div>
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 font-medium text-white shadow-sm shadow-sky-200 hover:bg-sky-700">
              <DollarSign className="h-5 w-5" /> Request guide
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function Badge({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-1 text-sm ${
        active ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
