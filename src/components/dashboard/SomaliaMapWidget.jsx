import { MapPin } from 'lucide-react';
import SomaliaMap from '../map/SomaliaMap';

export default function SomaliaMapWidget() {
  return (
    <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
      <div className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">
        Study Area
      </div>
      <div className="relative h-20 mb-2">
        <SomaliaMap variant="compact" className="h-full" />
      </div>
      <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
        <MapPin className="w-3 h-3 text-[#2563EB]" />
        Mogadishu, Somalia
      </div>
    </div>
  );
}
