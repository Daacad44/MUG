import { Building2 } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="h-14 flex items-center px-4 border-b border-[#1e293b] bg-[#0B1120] shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-sm font-semibold text-white truncate">
          Mogadishu Urban Growth Observatory
        </h1>
      </div>
    </header>
  );
}
