import { useEffect, useState } from 'react';
import { Trash2, CalendarDays, Phone, Mail, Search, ChevronDown, Stethoscope } from 'lucide-react';
import { api } from '@/lib/api';
import { StatusBadge, LoadingState, ErrorState } from './Dashboard';

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function Appointments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.listAppointments();
        setItems(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = items.filter((a) => {
    const matchesSearch =
      a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.phone?.includes(search) ||
      a.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.service?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const updated = await api.updateAppointment(id, { status });
      setItems((prev) => prev.map((a) => (a._id === id ? updated : a)));
    } catch (e) {
      alert(e.message);
    } finally {
      setUpdating(null);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this appointment? This cannot be undone.')) return;
    try {
      await api.deleteAppointment(id);
      setItems((prev) => prev.filter((a) => a._id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
        <p className="text-slate-500 mt-1">Manage and track all booking requests</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, phone, email, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition"
          />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition bg-white cursor-pointer"
          >
            <option value="all">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No appointments found</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <div key={a._id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-800">{a.fullName}</h3>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                      {formatDate(a.date)} at {a.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-slate-400" />
                      {a.service}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {a.phone}
                    </span>
                    {a.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {a.email}
                      </span>
                    )}
                  </div>
                  {a.message && (
                    <p className="text-sm text-slate-500 mt-2 bg-slate-50 rounded-lg p-3">{a.message}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative">
                    <select
                      value={a.status}
                      disabled={updating === a._id}
                      onChange={(e) => updateStatus(a._id, e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition bg-white cursor-pointer disabled:opacity-50"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="capitalize">{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <button
                    onClick={() => remove(a._id)}
                    className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition"
                    title="Delete appointment"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
