/** @typedef {'super_admin' | 'analyst' | 'viewer'} UserRole */

/** @typedef {Object} UrbanGrowthRecord
 * @property {string} id
 * @property {number} year
 * @property {number} built_up_area
 * @property {number} growth_rate
 * @property {string} created_at
 */

/** @typedef {Object} BuildingDensityRecord
 * @property {string} id
 * @property {number} year
 * @property {number} density
 * @property {number} building_count
 * @property {string} created_at
 */

/** @typedef {Object} LandUseRecord
 * @property {string} id
 * @property {number} year
 * @property {number} built_up
 * @property {number} vegetation
 * @property {number} bare_land
 * @property {number} water
 * @property {number} others
 * @property {string} created_at
 */

/** @typedef {Object} PredictionZone
 * @property {string} id
 * @property {string} zone_name
 * @property {number} probability_score
 * @property {Object} geometry
 * @property {string} created_at
 */

/** @typedef {Object} GisLayer
 * @property {string} id
 * @property {string} layer_name
 * @property {string} layer_type
 * @property {string} geojson_url
 */

/** @typedef {Object} MapLayerState
 * @property {string} id
 * @property {string} label
 * @property {boolean} enabled
 * @property {number} opacity
 */

export const YEARS = [2014, 2016, 2018, 2020, 2022, 2024, 2026];

export const LAYER_CONFIG = [
  { id: 'built_up', label: 'Built-up Area (Year)', enabled: true, opacity: 0.85 },
  { id: 'density', label: 'Building Density', enabled: true, opacity: 0.7 },
  { id: 'roads', label: 'Roads (OSM)', enabled: true, opacity: 0.8 },
  { id: 'landmarks', label: 'Landmarks (OSM)', enabled: true, opacity: 0.9 },
  { id: 'admin', label: 'Administrative Boundary', enabled: false, opacity: 0.6 },
  { id: 'heatmap', label: 'Heatmap', enabled: false, opacity: 0.75 },
  { id: 'prediction', label: 'Growth Prediction', enabled: false, opacity: 0.7 },
];
