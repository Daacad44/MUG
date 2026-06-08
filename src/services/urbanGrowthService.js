import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  MOCK_URBAN_GROWTH,
  MOCK_BUILDING_DENSITY,
  MOCK_LAND_USE,
  MOCK_PREDICTION_ZONES,
  MOCK_GIS_LAYERS,
} from '../utils/mockData';

async function fetchTable(table, mockData) {
  if (!isSupabaseConfigured) return mockData;
  const { data, error } = await supabase.from(table).select('*').order('year', { ascending: true });
  if (error || !data?.length) return mockData;
  return data;
}

export const urbanGrowthService = {
  getUrbanGrowth: () => fetchTable('urban_growth', MOCK_URBAN_GROWTH),
  getBuildingDensity: () => fetchTable('building_density', MOCK_BUILDING_DENSITY),
  getLandUse: () => fetchTable('land_use', MOCK_LAND_USE),
  getPredictionZones: async () => {
    if (!isSupabaseConfigured) return MOCK_PREDICTION_ZONES;
    const { data, error } = await supabase.from('prediction_zones').select('*');
    if (error || !data?.length) return MOCK_PREDICTION_ZONES;
    return data;
  },
  getGisLayers: async () => {
    if (!isSupabaseConfigured) return MOCK_GIS_LAYERS;
    const { data, error } = await supabase.from('gis_layers').select('*');
    if (error || !data?.length) return MOCK_GIS_LAYERS;
    return data;
  },
};
