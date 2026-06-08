import ChartsSection from '../components/dashboard/ChartsSection';
import StatsCards from '../components/dashboard/StatsCards';
import { useUrbanGrowth, useBuildingDensity } from '../hooks/useUrbanGrowth';
import { TrendingUp, Flame } from 'lucide-react';

export default function GrowthAnalysis() {
  const { data: growthData } = useUrbanGrowth();
  const { data: densityData } = useBuildingDensity();

  const hotspots = [
    { name: 'Hodan District', growth: '+12.4%', area: '34.2 km²' },
    { name: 'Wadajir Corridor', growth: '+9.8%', area: '28.7 km²' },
    { name: 'Kahda Periphery', growth: '+8.1%', area: '22.1 km²' },
    { name: 'Daynile Fringe', growth: '+6.5%', area: '18.9 km²' },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div>
        <h1 className="text-lg font-bold text-white">Growth Analysis</h1>
        <p className="text-xs text-[#64748b]">Built-up area growth, annual rates, and density changes (2014–2026)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <StatsCards />
        </div>
        <div className="lg:col-span-3">
          <ChartsSection />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#2563EB]" />
            <h2 className="text-sm font-semibold text-white">Built-up Area Growth Timeline</h2>
          </div>
          <div className="space-y-2">
            {growthData?.map((g, i) => (
              <div key={g.year} className="flex items-center gap-3">
                <span className="text-xs text-[#64748b] w-12">{g.year}</span>
                <div className="flex-1 h-5 bg-[#1a2332] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full transition-all"
                    style={{ width: `${(g.built_up_area / 250) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-white w-16 text-right">{g.built_up_area} km²</span>
                {i > 0 && (
                  <span className="text-[10px] text-[#22c55e] w-12 text-right">
                    +{((g.built_up_area - growthData[i - 1].built_up_area) / growthData[i - 1].built_up_area * 100).toFixed(1)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-[#F97316]" />
            <h2 className="text-sm font-semibold text-white">Growth Hotspots</h2>
          </div>
          <div className="space-y-3">
            {hotspots.map((h) => (
              <div key={h.name} className="flex items-center justify-between p-3 rounded-lg bg-[#1a2332] border border-[#1e293b]">
                <div>
                  <div className="text-xs font-medium text-white">{h.name}</div>
                  <div className="text-[10px] text-[#64748b]">{h.area}</div>
                </div>
                <span className="text-sm font-bold text-[#22c55e]">{h.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4">
        <h2 className="text-sm font-semibold text-white mb-4">Building Density Changes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {densityData?.map((d) => (
            <div key={d.year} className="text-center p-3 rounded-lg bg-[#1a2332] border border-[#1e293b]">
              <div className="text-[10px] text-[#64748b]">{d.year}</div>
              <div className="text-lg font-bold text-[#9333EA]">{d.density}</div>
              <div className="text-[9px] text-[#64748b]">/ km²</div>
              <div className="text-[9px] text-[#94a3b8] mt-1">{d.building_count.toLocaleString()} bldgs</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
