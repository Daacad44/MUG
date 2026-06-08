import { useQuery } from '@tanstack/react-query';
import { urbanGrowthService } from '../services/urbanGrowthService';

export function useUrbanGrowth() {
  return useQuery({ queryKey: ['urbanGrowth'], queryFn: urbanGrowthService.getUrbanGrowth });
}

export function useBuildingDensity() {
  return useQuery({ queryKey: ['buildingDensity'], queryFn: urbanGrowthService.getBuildingDensity });
}

export function useLandUse() {
  return useQuery({ queryKey: ['landUse'], queryFn: urbanGrowthService.getLandUse });
}

export function usePredictionZones() {
  return useQuery({ queryKey: ['predictionZones'], queryFn: urbanGrowthService.getPredictionZones });
}

export function useGisLayers() {
  return useQuery({ queryKey: ['gisLayers'], queryFn: urbanGrowthService.getGisLayers });
}
