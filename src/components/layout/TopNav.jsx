import { NavLink, useNavigate } from 'react-router-dom';
import { Building2, Sun, Download, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.jsx';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/dashboard/map', label: 'Map' },
  { to: '/dashboard/analysis', label: 'Analysis' },
  { to: '/dashboard/prediction', label: 'Prediction' },
  { to: '/dashboard/reports', label: 'Reports' },
  { to: '/dashboard/about', label: 'About' },
];

export default function TopNav() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-[#1e293b] bg-[#0B1120] shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold tracking-wide text-white leading-tight">
              MOGADISHU
            </div>
            <div className="text-[10px] font-medium tracking-wider text-[#94a3b8] leading-tight">
              URBAN GROWTH OBSERVATORY
            </div>
          </div>
        </div>
        <div className="hidden lg:block text-[11px] text-[#64748b] border-l border-[#1e293b] pl-3 ml-1 truncate">
          A Web-Based GIS System for Urban Growth Analysis and Prediction
        </div>
      </div>

      <nav className="flex items-center gap-1">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `px-3 py-1.5 text-xs font-medium transition-colors relative ${
                isActive
                  ? 'text-white after:absolute after:bottom-[-13px] after:left-2 after:right-2 after:h-0.5 after:bg-[#2563EB] after:rounded-full'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1a2332] transition-colors"
          aria-label="Toggle theme"
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#94a3b8] border border-[#1e293b] rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export Report</span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#94a3b8] border border-[#1e293b] rounded-lg hover:bg-[#1a2332] hover:text-red-400 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
