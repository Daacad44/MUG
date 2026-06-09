import { NavLink } from 'react-router-dom';
import {
  LineChart,
  Clock,
  Building,
  TrendingUp,
  GitCompare,
  Download,
  FileText,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { LAST_UPDATED } from '../../utils/mockData';
import SomaliaMapWidget from '../dashboard/SomaliaMapWidget';

const sidebarItems = [
  { to: '/dashboard', label: 'Overview', icon: LineChart, end: true },
  { to: '/dashboard/analysis', label: 'Time Analysis', icon: Clock },
  { to: '/dashboard/analysis/density', label: 'Building Density', icon: Building },
  { to: '/dashboard/prediction', label: 'Growth Prediction', icon: TrendingUp },
  { to: '/dashboard/map/compare', label: 'Compare Years', icon: GitCompare },
  { to: '/dashboard/reports/download', label: 'Download Data', icon: Download },
  { to: '/dashboard/reports', label: 'Reports', icon: FileText },
];

export default function LeftSidebar() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.replace('/');
  };

  return (
    <aside className="w-[200px] shrink-0 flex flex-col border-r border-[#1e293b] bg-[#0B1120] overflow-y-auto">
      <div className="p-3">
        <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 flex items-center justify-center mb-3">
          <LineChart className="w-4 h-4 text-[#2563EB]" />
        </div>

        <nav className="space-y-0.5">
          {sidebarItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#64748b] hover:text-[#94a3b8] hover:bg-[#111827]'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-3 space-y-2">
        <SomaliaMapWidget />

        <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
          <div className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
            Coordinate System
          </div>
          <div className="text-[11px] text-[#94a3b8]">WGS 84 / UTM Zone 37N</div>
        </div>

        <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
          <div className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-1">
            Last Updated
          </div>
          <div className="text-[11px] text-[#94a3b8]">{LAST_UPDATED}</div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#64748b] border border-[#1e293b] hover:bg-[#111827] hover:text-red-400 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
