import { Database, Globe, Calendar, TrendingUp, Code } from 'lucide-react';

const footerItems = [
  { icon: Database, label: 'Real Data', sub: 'Open & Public Sources' },
  { icon: Globe, label: 'Web GIS', sub: 'Interactive & Accessible' },
  { icon: Calendar, label: 'All Years', sub: '2014 – 2026 Analysis' },
  { icon: TrendingUp, label: 'Prediction', sub: 'Future Growth Areas' },
  { icon: Code, label: 'Open Source', sub: 'Open Technologies' },
];

export default function Footer() {
  return (
    <footer className="h-12 flex items-center justify-between px-4 border-t border-[#1e293b] bg-[#0B1120] shrink-0">
      <div className="flex items-center gap-4 lg:gap-6 overflow-x-auto">
        {footerItems.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-1.5 shrink-0">
            <Icon className="w-3.5 h-3.5 text-[#2563EB]" />
            <div className="text-[10px] leading-tight">
              <span className="text-[#94a3b8] font-medium">{label}</span>
              <span className="text-[#64748b] hidden sm:inline"> · {sub}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-[#64748b] shrink-0 hidden md:block">
        Mogadishu Urban Growth Observatory © 2024 All rights reserved.
      </div>
    </footer>
  );
}
