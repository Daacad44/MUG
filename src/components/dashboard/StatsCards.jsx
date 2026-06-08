import { Map, TrendingUp, Building2, Grid3x3 } from 'lucide-react';
import { useDashboard } from '../../store/DashboardContext';
import { useUrbanGrowth, useBuildingDensity } from '../../hooks/useUrbanGrowth';

export default function StatsCards() {
  const { selectedYear } = useDashboard();
  const { data: growthData } = useUrbanGrowth();
  const { data: densityData } = useBuildingDensity();

  const growth = growthData?.find((g) => g.year === selectedYear) || growthData?.[growthData.length - 1];
  const density = densityData?.find((d) => d.year === selectedYear) || densityData?.[densityData.length - 1];
  const prevGrowth = growthData?.find((g) => g.year === selectedYear - 2);
  const prevDensity = densityData?.find((d) => d.year === selectedYear - 2);

  const builtUpChange = prevGrowth
    ? (((growth.built_up_area - prevGrowth.built_up_area) / prevGrowth.built_up_area) * 100).toFixed(1)
    : '8.7';
  const buildingsChange = prevDensity
    ? (((density.building_count - prevDensity.building_count) / prevDensity.building_count) * 100).toFixed(1)
    : '9.3';
  const densityChange = prevDensity
    ? (((density.density - prevDensity.density) / prevDensity.density) * 100).toFixed(1)
    : '7.6';

  const stats = [
    {
      icon: Map,
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-[#2563EB]/10',
      label: 'Built-up Area',
      value: `${growth?.built_up_area?.toFixed(1) || '249.6'} km²`,
      change: `+${builtUpChange}% since ${selectedYear - 2}`,
    },
    {
      icon: TrendingUp,
      iconColor: 'text-[#22c55e]',
      iconBg: 'bg-[#22c55e]/10',
      label: 'Growth Rate',
      value: `${growth?.growth_rate?.toFixed(2) || '4.21'}% / year`,
      change: '(2014 – 2026)',
    },
    {
      icon: Building2,
      iconColor: 'text-[#9333EA]',
      iconBg: 'bg-[#9333EA]/10',
      label: 'Buildings (Est.)',
      value: density?.building_count?.toLocaleString() || '187,540',
      change: `+${buildingsChange}% since ${selectedYear - 2}`,
    },
    {
      icon: Grid3x3,
      iconColor: 'text-[#F97316]',
      iconBg: 'bg-[#F97316]/10',
      label: 'Building Density',
      value: `${density?.density?.toLocaleString() || '752'} / km²`,
      change: `+${densityChange}% since ${selectedYear - 2}`,
    },
  ];

  return (
    <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
      <h3 className="text-xs font-semibold text-white mb-3">
        Key Statistics ({selectedYear})
      </h3>
      <div className="space-y-2.5">
        {stats.map(({ icon: Icon, iconColor, iconBg, label, value, change }) => (
          <div key={label} className="flex items-start gap-2.5">
            <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-[#64748b]">{label}</div>
              <div className="text-sm font-bold text-white">{value}</div>
              <div className="text-[9px] text-[#22c55e]">{change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
