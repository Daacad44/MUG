import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useUrbanGrowth, useBuildingDensity } from '../../hooks/useUrbanGrowth';
import { ANNUAL_GROWTH_RATES } from '../../utils/mockData';

const tooltipStyle = {
  background: '#111827',
  border: '1px solid #1e293b',
  borderRadius: '8px',
  fontSize: '10px',
  color: '#f1f5f9',
};

export default function ChartsSection() {
  const { data: growthData } = useUrbanGrowth();
  const { data: densityData } = useBuildingDensity();

  const builtUpChart = growthData?.map((g) => ({
    year: g.year,
    area: g.built_up_area,
  })) || [];

  const densityChart = densityData?.map((d) => ({
    year: d.year,
    density: d.density,
  })) || [];

  const latestArea = builtUpChart[builtUpChart.length - 1]?.area;
  const latestDensity = densityChart[densityChart.length - 1]?.density;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 shrink-0">
      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-semibold text-white">Built-up Area Over Time (km²)</h3>
          {latestArea && (
            <span className="text-[10px] font-bold text-[#2563EB]">{latestArea} km²</span>
          )}
        </div>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={builtUpChart}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="area" stroke="#2563EB" fill="url(#areaGradient)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-semibold text-white">Annual Growth Rate (%)</h3>
          <span className="text-[10px] font-bold text-[#22c55e]">4.21%</span>
        </div>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ANNUAL_GROWTH_RATES}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="period" tick={{ fontSize: 8, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="rate" fill="#22c55e" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-semibold text-white">Building Density (per km²)</h3>
          {latestDensity && (
            <span className="text-[10px] font-bold text-[#9333EA]">{latestDensity} / km²</span>
          )}
        </div>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={densityChart}>
              <defs>
                <linearGradient id="densityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333EA" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#9333EA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="density"
                stroke="#9333EA"
                strokeWidth={2}
                dot={{ r: 3, fill: '#9333EA' }}
                fill="url(#densityGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
