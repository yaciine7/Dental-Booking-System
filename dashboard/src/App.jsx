import { useState } from 'react';
import Sidebar, { PAGE_KEYS } from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import Appointments from '@/pages/Appointments';

export default function App() {
  const [page, setPage] = useState(PAGE_KEYS.DASHBOARD);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar current={page} onNavigate={setPage} />
      <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
        {page === PAGE_KEYS.DASHBOARD && <Dashboard onNavigate={setPage} />}
        {page === PAGE_KEYS.APPOINTMENTS && <Appointments />}
      </main>
    </div>
  );
}
