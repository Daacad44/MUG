import { useState, useEffect, useMemo, useId } from 'react';
import { motion } from 'framer-motion';
import {
  getGeoBounds,
  createProjector,
  geometryToPath,
  MOGADISHU_COORDS,
} from '../../utils/geoProjection';

const VARIANTS = {
  compact: { width: 176, height: 80, markerR: 5, glowR: 14, showTooltip: false },
  large: { width: 480, height: 520, markerR: 8, glowR: 24, showTooltip: true },
};

export default function SomaliaMap({ variant = 'compact', className = '' }) {
  const [geojson, setGeojson] = useState(null);
  const [hovered, setHovered] = useState(false);
  const uid = useId().replace(/:/g, '');
  const config = VARIANTS[variant] || VARIANTS.compact;

  useEffect(() => {
    fetch('/data/somalia-boundary.geojson')
      .then((r) => r.json())
      .then(setGeojson)
      .catch(console.error);
  }, []);

  const { paths, markerPos } = useMemo(() => {
    if (!geojson?.features?.length) return { paths: [], markerPos: null };

    const bounds = getGeoBounds(geojson);
    const project = createProjector(bounds, config.width, config.height, variant === 'large' ? 16 : 6);
    const pathList = geojson.features.map((f) => geometryToPath(f.geometry, project));
    const [mx, my] = project(MOGADISHU_COORDS.lng, MOGADISHU_COORDS.lat);

    return { paths: pathList, markerPos: { x: mx, y: my } };
  }, [geojson, config.width, config.height, variant]);

  if (!geojson) {
    return (
      <div
        className={`flex items-center justify-center bg-[#111827] rounded-lg ${className}`}
        style={{ height: config.height }}
      >
        <div className="w-5 h-5 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="w-full h-auto"
        aria-label="Somalia map with Mogadishu highlighted"
        role="img"
      >
        <defs>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <filter id={`blur-${uid}`}>
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="#1E293B"
            stroke="#334155"
            strokeWidth={variant === 'large' ? 1.2 : 0.8}
            strokeLinejoin="round"
          />
        ))}

        {markerPos && (
          <g
            onMouseEnter={() => setHovered(true)}
            style={{ cursor: 'pointer' }}
          >
            <motion.circle
              cx={markerPos.x}
              cy={markerPos.y}
              r={config.glowR}
              fill={`url(#glow-${uid})`}
              animate={{ r: [config.glowR * 0.8, config.glowR, config.glowR * 0.8], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={markerPos.x}
              cy={markerPos.y}
              r={config.markerR + 4}
              fill="none"
              stroke="#2563EB"
              strokeWidth="1"
              opacity="0.4"
              animate={{ r: [config.markerR + 2, config.markerR + 8, config.markerR + 2], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <circle
              cx={markerPos.x}
              cy={markerPos.y}
              r={config.markerR}
              fill="#2563EB"
              stroke="#0B1120"
              strokeWidth={variant === 'large' ? 2 : 1.5}
              filter={`url(#blur-${uid})`}
            />
            <circle
              cx={markerPos.x}
              cy={markerPos.y}
              r={config.markerR * 0.4}
              fill="#FACC15"
            />
          </g>
        )}
      </svg>

      {config.showTooltip && hovered && markerPos && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-10 px-3 py-2 rounded-lg bg-[#111827]/95 border border-[#2563EB]/30 backdrop-blur-sm shadow-xl pointer-events-none"
          style={{
            left: `${(markerPos.x / config.width) * 100}%`,
            top: `${(markerPos.y / config.height) * 100}%`,
            transform: 'translate(-50%, -110%)',
            minWidth: '180px',
          }}
        >
          <div className="text-xs font-semibold text-white mb-1">📍 Mogadishu</div>
          <div className="text-[10px] text-[#94a3b8] space-y-0.5">
            <div>Latitude: {MOGADISHU_COORDS.lat}° N</div>
            <div>Longitude: {MOGADISHU_COORDS.lng}° E</div>
            <div className="text-[#2563EB] mt-1">Study Area</div>
            <div>Urban Growth Monitoring Zone</div>
          </div>
        </motion.div>
      )}

      {variant === 'compact' && hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-[#111827] border border-[#1e293b] text-[9px] text-[#94a3b8] whitespace-nowrap z-10 pointer-events-none">
          Mogadishu — Capital City of Somalia
        </div>
      )}
    </div>
  );
}
