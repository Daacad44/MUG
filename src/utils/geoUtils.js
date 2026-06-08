const YEAR_COLORS = {
  2014: '#FACC15',
  2016: '#F59E0B',
  2018: '#F97316',
  2020: '#EF4444',
  2022: '#EC4899',
  2024: '#A855F7',
  2026: '#9333EA',
};

export function getYearColor(year) {
  return YEAR_COLORS[year] || '#9333EA';
}

export function generateBuiltUpGeoJSON(year) {
  const center = [2.0469, 45.3182];
  const yearIndex = [2014, 2016, 2018, 2020, 2022, 2024, 2026].indexOf(year);
  const baseRadius = 0.02 + yearIndex * 0.008;

  const features = [];
  const rings = 3 + Math.floor(yearIndex / 2);

  for (let r = 0; r < rings; r++) {
    const radius = baseRadius * (1 - r * 0.25);
    const points = 12 + r * 4;
    const coords = [];

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * 2 * Math.PI;
      const jitter = 1 + Math.sin(angle * 3 + r) * 0.15;
      const lat = center[0] + Math.cos(angle) * radius * jitter;
      const lng = center[1] + Math.sin(angle) * radius * jitter * 1.2;
      coords.push([lng, lat]);
    }

    const featureYear = [2014, 2016, 2018, 2020, 2022, 2024, 2026][Math.min(r, yearIndex)];
    if (featureYear <= year) {
      features.push({
        type: 'Feature',
        properties: {
          year: featureYear,
          color: getYearColor(featureYear),
          density: 400 + featureYear * 0.15,
        },
        geometry: { type: 'Polygon', coordinates: [coords] },
      });
    }
  }

  for (let i = 0; i < 5 + yearIndex; i++) {
    const angle = (i / (5 + yearIndex)) * 2 * Math.PI + 0.5;
    const dist = baseRadius * (0.6 + (i % 3) * 0.2);
    const size = 0.003 + yearIndex * 0.001;
    const cx = center[0] + Math.cos(angle) * dist;
    const cy = center[1] + Math.sin(angle) * dist * 1.2;
    const patchYear = [2014, 2016, 2018, 2020, 2022, 2024, 2026][Math.min(i % 7, yearIndex)];

    if (patchYear <= year) {
      features.push({
        type: 'Feature',
        properties: {
          year: patchYear,
          color: getYearColor(patchYear),
          density: 500 + i * 30,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [cy - size, cx - size],
            [cy + size, cx - size],
            [cy + size, cx + size],
            [cy - size, cx + size],
            [cy - size, cx - size],
          ]],
        },
      });
    }
  }

  return { type: 'FeatureCollection', features };
}

export function generatePredictionGeoJSON() {
  const zones = [
    { name: 'Hodan Expansion', center: [2.04, 45.34], score: 0.87 },
    { name: 'Wadajir Corridor', center: [2.03, 45.31], score: 0.74 },
    { name: 'Kahda Periphery', center: [2.06, 45.29], score: 0.68 },
    { name: 'Daynile Fringe', center: [2.08, 45.33], score: 0.61 },
  ];

  return {
    type: 'FeatureCollection',
    features: zones.map((z) => {
      const size = 0.012 * z.score;
      const [lat, lng] = z.center;
      return {
        type: 'Feature',
        properties: { zone_name: z.name, probability_score: z.score },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [lng - size, lat - size * 0.8],
            [lng + size, lat - size * 0.8],
            [lng + size * 1.2, lat + size],
            [lng, lat + size * 1.2],
            [lng - size, lat + size * 0.8],
            [lng - size, lat - size * 0.8],
          ]],
        },
      };
    }),
  };
}

export const MOGADISHU_CENTER = [2.0469, 45.3182];
export const MOGADISHU_ZOOM = 12;
