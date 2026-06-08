import { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  ZoomIn,
  ZoomOut,
  Home,
  Layers,
  Maximize2,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { useDashboard } from '../../store/DashboardContext';
import { generateBuiltUpGeoJSON, generatePredictionGeoJSON, MOGADISHU_CENTER, MOGADISHU_ZOOM, getYearColor } from '../../utils/geoUtils';
import { YEARS } from '../../types';
import TimeSlider from './TimeSlider';

function MapController({ geoJsonRef }) {
  const map = useMap();

  useEffect(() => {
    window.__mogadishuMap = map;
    return () => { delete window.__mogadishuMap; };
  }, [map]);

  return null;
}

function BuiltUpStyle(feature) {
  return {
    fillColor: feature.properties.color || getYearColor(feature.properties.year),
    fillOpacity: 0.65,
    color: feature.properties.color || getYearColor(feature.properties.year),
    weight: 1,
    opacity: 0.8,
  };
}

function PredictionStyle(feature) {
  const score = feature.properties.probability_score || 0.5;
  return {
    fillColor: '#2563EB',
    fillOpacity: score * 0.5,
    color: '#2563EB',
    weight: 2,
    dashArray: '4',
    opacity: 0.9,
  };
}

export default function UrbanGrowthMap({ showTimeSlider = true, className = '' }) {
  const { selectedYear, setSelectedYear, layers } = useDashboard();
  const mapRef = useRef(null);

  const builtUpGeoJSON = useMemo(() => generateBuiltUpGeoJSON(selectedYear), [selectedYear]);
  const predictionGeoJSON = useMemo(() => generatePredictionGeoJSON(), []);

  const builtUpEnabled = layers.find((l) => l.id === 'built_up')?.enabled;
  const predictionEnabled = layers.find((l) => l.id === 'prediction')?.enabled;
  const builtUpOpacity = layers.find((l) => l.id === 'built_up')?.opacity ?? 0.85;

  const handleZoomIn = () => window.__mogadishuMap?.zoomIn();
  const handleZoomOut = () => window.__mogadishuMap?.zoomOut();
  const handleHome = () => window.__mogadishuMap?.setView(MOGADISHU_CENTER, MOGADISHU_ZOOM);
  const handleFullscreen = () => {
    const el = mapRef.current;
    if (el?.requestFullscreen) el.requestFullscreen();
  };

  return (
    <div ref={mapRef} className={`relative rounded-xl border border-[#1e293b] bg-[#111827] overflow-hidden flex flex-col ${className}`}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e293b] shrink-0">
        <div>
          <h2 className="text-sm font-semibold text-white">Urban Growth Map (Built-up Area)</h2>
          <p className="text-[10px] text-[#64748b]">Mogadishu, 2014 – 2026</p>
        </div>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="appearance-none bg-[#1a2332] border border-[#1e293b] text-white text-xs font-medium rounded-lg pl-8 pr-8 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748b] pointer-events-none" />
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#64748b] pointer-events-none" />
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <MapContainer
          center={MOGADISHU_CENTER}
          zoom={MOGADISHU_ZOOM}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
          {builtUpEnabled && (
            <GeoJSON
              key={`built-up-${selectedYear}`}
              data={builtUpGeoJSON}
              style={(f) => ({ ...BuiltUpStyle(f), fillOpacity: builtUpOpacity * 0.65 })}
            />
          )}
          {predictionEnabled && (
            <GeoJSON data={predictionGeoJSON} style={PredictionStyle} />
          )}
          <MapController />
        </MapContainer>

        <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-1">
          {[
            { icon: ZoomIn, action: handleZoomIn, label: 'Zoom in' },
            { icon: ZoomOut, action: handleZoomOut, label: 'Zoom out' },
            { icon: Home, action: handleHome, label: 'Home' },
            { icon: Layers, action: () => {}, label: 'Layers' },
            { icon: Maximize2, action: handleFullscreen, label: 'Fullscreen' },
          ].map(({ icon: Icon, action, label }) => (
            <button
              key={label}
              type="button"
              onClick={action}
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#111827]/95 border border-[#1e293b] text-[#94a3b8] hover:text-white hover:bg-[#1a2332] transition-colors shadow-lg"
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        <div className="absolute bottom-12 right-3 z-[1000] bg-[#111827]/95 border border-[#1e293b] rounded-lg p-2.5 shadow-lg">
          <div className="text-[9px] font-semibold text-[#94a3b8] mb-1.5">Built-up Area (Year)</div>
          <div className="flex flex-col gap-0.5">
            {YEARS.map((y) => (
              <div key={y} className="flex items-center gap-1.5">
                <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: getYearColor(y) }} />
                <span className="text-[8px] text-[#64748b]">{y}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 left-3 z-[1000] bg-[#111827]/80 px-2 py-1 rounded text-[9px] text-[#64748b]">
          <div className="flex items-center gap-1">
            <div className="w-12 h-0.5 bg-[#64748b]" />
            <span>0 — 10 km</span>
          </div>
        </div>
      </div>

      {showTimeSlider && <TimeSlider />}
    </div>
  );
}
