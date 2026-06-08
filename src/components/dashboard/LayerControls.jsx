import { useDashboard } from '../../store/DashboardContext';

export default function LayerControls() {
  const { layers, toggleLayer, setLayerOpacity } = useDashboard();

  return (
    <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-3">
      <h3 className="text-xs font-semibold text-white mb-3">Map Layers</h3>
      <div className="space-y-2">
        {layers.map((layer) => (
          <div key={layer.id}>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={layer.enabled}
                onChange={() => toggleLayer(layer.id)}
                className="w-3.5 h-3.5 rounded border-[#334155] bg-[#1a2332] text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-[11px] text-[#94a3b8] group-hover:text-white transition-colors">
                {layer.label}
              </span>
            </label>
            {layer.enabled && (
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={layer.opacity}
                onChange={(e) => setLayerOpacity(layer.id, Number(e.target.value))}
                className="w-full mt-1 ml-5 opacity-60"
                aria-label={`${layer.label} opacity`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
