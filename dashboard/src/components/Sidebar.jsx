import { LayoutDashboard, CalendarDays, Stethoscope, Mail } from 'lucide-react';

export const PAGE_KEYS = {
  DASHBOARD: 'dashboard',
  APPOINTMENTS: 'appointments',
};

const nav = [
  { key: PAGE_KEYS.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { key: PAGE_KEYS.APPOINTMENTS, label: 'Appointments', icon: CalendarDays },
];

export default function Sidebar({ current, onNavigate }) {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-sm">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-slate-800 leading-tight">Dental Admin</p>
          <p className="text-xs text-slate-400">Clinic Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {nav.map(({ key, label, icon: Icon }) => {
          const active = current === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                active
                  ? 'bg-sky-50 text-sky-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-sky-600' : 'text-slate-400'}`} />
              {label}
            </button>
          );
        })}
      </nav>

    </aside>
  );
}
