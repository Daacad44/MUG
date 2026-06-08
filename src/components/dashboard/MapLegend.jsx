export default function MapLegend() {
  const items = [
    { color: '#FACC15', label: 'Older Development (2014)' },
    { color: '#9333EA', label: 'Recent Development (2026)' },
    { color: '#2563EB', label: 'Water' },
  ];

  return (
    <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
      <h3 className="text-xs font-semibold text-white mb-3">Legend</h3>
      <div className="space-y-2">
        {items.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-[#94a3b8]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
