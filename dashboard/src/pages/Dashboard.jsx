import { useEffect, useState } from "react";
import {
  CalendarDays,
  Stethoscope,
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  Hourglass,
} from "lucide-react";
import { api } from "@/lib/api";

export default function Dashboard({ onNavigate }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async (isInitial = false) => {
      try {
        const a = await api.listAppointments();
        setAppointments(a);
        if (error) setError((prev) => (prev ? null : prev)); // clear stale error once a poll succeeds
      } catch (e) {
        if (isInitial) setError(e.message);
        else console.error("Background refresh failed:", e.message);
      } finally {
        if (isInitial) setLoading(false);
      }
    };

    fetchAppointments(true); // initial load
    const interval = setInterval(() => fetchAppointments(false), 5000); // background refresh

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const pending = appointments.filter((a) => a.status === "pending");
  const confirmed = appointments.filter((a) => a.status === "confirmed");
  const completed = appointments.filter((a) => a.status === "completed");
  const cancelled = appointments.filter((a) => a.status === "cancelled");

  const today = new Date().toISOString().slice(0, 10);
  const todayAppts = appointments.filter((a) => a.date?.startsWith(today));

  const stats = [
    {
      label: "Total Appointments",
      value: appointments.length,
      icon: CalendarDays,
      color: "sky",
      page: "appointments",
    },
    {
      label: "Pending",
      value: pending.length,
      icon: Hourglass,
      color: "amber",
      page: "appointments",
    },
    {
      label: "Confirmed",
      value: confirmed.length,
      icon: CheckCircle2,
      color: "emerald",
      page: "appointments",
    },
    {
      label: "Today",
      value: todayAppts.length,
      icon: Clock,
      color: "rose",
      page: "appointments",
    },
  ];

  const colorMap = {
    sky: "bg-sky-50 text-sky-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    cyan: "bg-cyan-50 text-cyan-600",
    violet: "bg-violet-50 text-violet-600",
    rose: "bg-rose-50 text-rose-600",
  };

  const upcoming = [...appointments]
    .filter((a) => a.status === "pending" || a.status === "confirmed")
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your clinic activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color, page }) => (
          <button
            key={label}
            onClick={() => onNavigate(page)}
            className="bg-white rounded-xl border border-slate-200 p-5 text-left hover:shadow-md hover:border-sky-200 transition group"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold text-slate-800 group-hover:text-sky-600 transition">
                {value}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-3">{label}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">
            Upcoming Appointments
          </h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">
              No upcoming appointments
            </p>
          ) : (
            <div className="space-y-3">
              {upcoming.map((a) => (
                <div
                  key={a._id}
                  className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-700 truncate">
                      {a.fullName}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {a.service} — {formatDate(a.date)} at {a.time}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-800 mb-4">
            Appointment Status
          </h2>
          <div className="space-y-4">
            <StatusBar
              label="Pending"
              value={pending.length}
              total={appointments.length}
              color="bg-amber-400"
            />
            <StatusBar
              label="Confirmed"
              value={confirmed.length}
              total={appointments.length}
              color="bg-emerald-400"
            />
            <StatusBar
              label="Completed"
              value={completed.length}
              total={appointments.length}
              color="bg-sky-400"
            />
            <StatusBar
              label="Cancelled"
              value={cancelled.length}
              total={appointments.length}
              color="bg-rose-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ label, value, total, color }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-400">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-600 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-600 border-emerald-200",
    completed: "bg-sky-50 text-sky-600 border-sky-200",
    cancelled: "bg-rose-50 text-rose-600 border-rose-200",
  };
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${styles[status] || ""}`}
    >
      {status}
    </span>
  );
}

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <XCircle className="w-12 h-12 text-rose-400 mb-3" />
      <p className="text-slate-700 font-medium">Something went wrong</p>
      <p className="text-sm text-slate-400 mt-1">{message}</p>
      <p className="text-xs text-slate-400 mt-3">
        Make sure your backend is running on port 5000.
      </p>
    </div>
  );
}
