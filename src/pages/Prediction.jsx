import { useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { usePredictionZones } from '../hooks/useUrbanGrowth';
import { generatePredictionGeoJSON, MOGADISHU_CENTER, MOGADISHU_ZOOM } from '../utils/geoUtils';
import { Target, MapPin, BarChart3 } from 'lucide-react';

function zoneStyle(feature) {
  const score = feature.properties.probability_score || 0.5;
  return {
    fillColor: score > 0.8 ? '#9333EA' : score > 0.65 ? '#2563EB' : '#F97316',
    fillOpacity: score * 0.5,
    color: score > 0.8 ? '#9333EA' : '#2563EB',
    weight: 2,
    dashArray: '6',
  };
}

export default function Prediction() {
  const { data: zones } = usePredictionZones();
  const predictionGeoJSON = useMemo(() => generatePredictionGeoJSON(), []);

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div>
        <h1 className="text-lg font-bold text-white">Growth Prediction</h1>
        <p className="text-xs text-[#64748b]">Future urban expansion forecast and probability zones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-[#1e293b] bg-[#111827] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1e293b]">
            <h2 className="text-sm font-semibold text-white">Future Growth Forecast Map</h2>
            <p className="text-[10px] text-[#64748b]">Predicted expansion zones (2026–2030)</p>
          </div>
          <div className="h-[400px]">
            <MapContainer center={MOGADISHU_CENTER} zoom={MOGADISHU_ZOOM} className="h-full w-full" zoomControl={true} attributionControl={false}>
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" maxZoom={19} />
              <GeoJSON data={predictionGeoJSON} style={zoneStyle} />
            </MapContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-[#9333EA]" />
              <h2 className="text-sm font-semibold text-white">Forecast Statistics</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Predicted Built-up (2030)', value: '312.4 km²', change: '+25.1%' },
                { label: 'Expansion Area', value: '62.8 km²', change: 'New zones' },
                { label: 'Avg. Probability', value: '72.5%', change: 'High confidence' },
                { label: 'Est. New Buildings', value: '48,200', change: '2026–2030' },
              ].map(({ label, value, change }) => (
                <div key={label} className="p-3 rounded-lg bg-[#1a2332] border border-[#1e293b]">
                  <div className="text-[10px] text-[#64748b]">{label}</div>
                  <div className="text-lg font-bold text-white">{value}</div>
                  <div className="text-[9px] text-[#22c55e]">{change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-[#2563EB]" />
          <h2 className="text-sm font-semibold text-white">Expansion Zones</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {zones?.map((zone) => (
            <div key={zone.id} className="p-4 rounded-lg bg-[#1a2332] border border-[#1e293b]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white">{zone.zone_name}</span>
                <BarChart3 className="w-3.5 h-3.5 text-[#9333EA]" />
              </div>
              <div className="text-2xl font-bold text-[#9333EA]">
                {(zone.probability_score * 100).toFixed(0)}%
              </div>
              <div className="text-[10px] text-[#64748b]">Growth Probability</div>
              <div className="mt-2 h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#9333EA] rounded-full"
                  style={{ width: `${zone.probability_score * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
