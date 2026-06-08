import { YEARS } from '../types';

export const MOCK_URBAN_GROWTH = YEARS.map((year, i) => ({
  id: `ug-${year}`,
  year,
  built_up_area: parseFloat((142.3 + i * 17.88).toFixed(1)),
  growth_rate: parseFloat((3.2 + Math.sin(i) * 0.8 + i * 0.15).toFixed(2)),
  created_at: new Date().toISOString(),
}));

export const MOCK_BUILDING_DENSITY = YEARS.map((year, i) => ({
  id: `bd-${year}`,
  year,
  density: Math.round(420 + i * 55.3),
  building_count: Math.round(95000 + i * 15423),
  created_at: new Date().toISOString(),
}));

export const MOCK_LAND_USE = YEARS.map((year, i) => ({
  id: `lu-${year}`,
  year,
  built_up: parseFloat((28.5 + i * 1.7).toFixed(1)),
  vegetation: parseFloat((32.1 - i * 0.8).toFixed(1)),
  bare_land: parseFloat((24.5 - i * 0.6).toFixed(1)),
  water: 6.3,
  others: parseFloat((8.6 - i * 0.1).toFixed(1)),
  created_at: new Date().toISOString(),
}));

export const MOCK_PREDICTION_ZONES = [
  { id: 'pz-1', zone_name: 'Hodan Expansion', probability_score: 0.87, geometry: null, created_at: new Date().toISOString() },
  { id: 'pz-2', zone_name: 'Wadajir Growth Corridor', probability_score: 0.74, geometry: null, created_at: new Date().toISOString() },
  { id: 'pz-3', zone_name: 'Kahda Periphery', probability_score: 0.68, geometry: null, created_at: new Date().toISOString() },
  { id: 'pz-4', zone_name: 'Daynile Fringe', probability_score: 0.61, geometry: null, created_at: new Date().toISOString() },
];

export const MOCK_GIS_LAYERS = [
  { id: 'gl-1', layer_name: 'Built-up Area', layer_type: 'polygon', geojson_url: '/data/built-up.geojson' },
  { id: 'gl-2', layer_name: 'Building Density', layer_type: 'heatmap', geojson_url: '/data/density.geojson' },
  { id: 'gl-3', layer_name: 'Roads', layer_type: 'line', geojson_url: '/data/roads.geojson' },
  { id: 'gl-4', layer_name: 'Landmarks', layer_type: 'point', geojson_url: '/data/landmarks.geojson' },
  { id: 'gl-5', layer_name: 'District Boundaries', layer_type: 'polygon', geojson_url: '/data/districts.geojson' },
  { id: 'gl-6', layer_name: 'Prediction Zones', layer_type: 'polygon', geojson_url: '/data/prediction.geojson' },
];

export const STATS_2026 = {
  builtUpArea: 249.6,
  builtUpChange: 8.7,
  growthRate: 4.21,
  buildings: 187540,
  buildingsChange: 9.3,
  density: 752,
  densityChange: 7.6,
};

export const ANNUAL_GROWTH_RATES = [
  { period: '2014-16', rate: 3.8 },
  { period: '2016-18', rate: 4.1 },
  { period: '2018-20', rate: 3.5 },
  { period: '2020-22', rate: 4.6 },
  { period: '2022-24', rate: 4.0 },
  { period: '2024-26', rate: 4.21 },
];

export const LAST_UPDATED = 'May 18, 2024 • 10:30 AM';
