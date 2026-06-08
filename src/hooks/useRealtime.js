import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function useRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'urban_growth' }, () => {
        queryClient.invalidateQueries({ queryKey: ['urbanGrowth'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'building_density' }, () => {
        queryClient.invalidateQueries({ queryKey: ['buildingDensity'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'land_use' }, () => {
        queryClient.invalidateQueries({ queryKey: ['landUse'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'prediction_zones' }, () => {
        queryClient.invalidateQueries({ queryKey: ['predictionZones'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, () => {
        queryClient.invalidateQueries({ queryKey: ['reports'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
