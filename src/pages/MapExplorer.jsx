import UrbanGrowthMap from '../components/map/UrbanGrowthMap';
import LayerControls from '../components/dashboard/LayerControls';
import MapLegend from '../components/dashboard/MapLegend';
import { useDashboard } from '../store/DashboardContext';
import { YEARS } from '../types';

export default function MapExplorer() {
  const { selectedYear, setSelectedYear } = useDashboard();

  return (
    <div className="flex h-full min-h-0 overflow-hidden p-2 gap-2">
      <div className="flex-1 min-w-0">
        <UrbanGrowthMap className="h-full" />
      </div>
      <div className="w-[240px] shrink-0 flex flex-col gap-2 overflow-y-auto">
        <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
          <h3 className="text-xs font-semibold text-white mb-3">District Filter</h3>
          <select className="w-full bg-[#1a2332] border border-[#1e293b] text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2563EB]">
            <option>All Districts</option>
            <option>Hodan</option>
            <option>Wadajir</option>
            <option>Kahda</option>
            <option>Daynile</option>
            <option>Hamrweyne</option>
          </select>
        </div>

        <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
          <h3 className="text-xs font-semibold text-white mb-3">Compare Years</h3>
          <div className="grid grid-cols-2 gap-2">
            {YEARS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setSelectedYear(y)}
                className={`text-xs py-1.5 rounded-lg border transition-colors ${
                  selectedYear === y
                    ? 'bg-[#2563EB] border-[#2563EB] text-white'
                    : 'border-[#1e293b] text-[#94a3b8] hover:border-[#334155]'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <LayerControls />
        <MapLegend />
      </div>
    </div>
  );
}
