import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useDashboard } from '../../store/DashboardContext';
import { useLandUse } from '../../hooks/useUrbanGrowth';

const COLORS = {
  built_up: '#ef4444',
  vegetation: '#22c55e',
  bare_land: '#FACC15',
  water: '#2563EB',
  others: '#64748b',
};

const LABELS = {
  built_up: 'Built-up',
  vegetation: 'Vegetation',
  bare_land: 'Bare Land',
  water: 'Water',
  others: 'Others',
};

export default function LandUseChart() {
  const { selectedYear } = useDashboard();
  const { data } = useLandUse();
  const record = data?.find((d) => d.year === selectedYear) || data?.[data.length - 1];

  const chartData = record
    ? Object.keys(LABELS).map((key) => ({
        name: LABELS[key],
        value: record[key],
        color: COLORS[key],
      }))
    : [];

  return (
    <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
      <h3 className="text-xs font-semibold text-white mb-2">Land Use ({selectedYear})</h3>
      <div className="flex items-center gap-2">
        <div className="w-[100px] h-[100px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={45}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#111827',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  fontSize: '10px',
                }}
                formatter={(value) => [`${value}%`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1 flex-1 min-w-0">
          {chartData.map(({ name, value, color }) => (
            <div key={name} className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-[9px] text-[#94a3b8] truncate">{name}</span>
              </div>
              <span className="text-[9px] font-medium text-white shrink-0">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
