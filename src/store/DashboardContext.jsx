import { createContext, useContext, useState, useCallback } from 'react';
import { LAYER_CONFIG } from '../types';

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [isPlaying, setIsPlaying] = useState(false);
  const [layers, setLayers] = useState(LAYER_CONFIG);

  const toggleLayer = useCallback((id) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  }, []);

  const setLayerOpacity = useCallback((id, opacity) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, opacity } : l))
    );
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        selectedYear,
        setSelectedYear,
        isPlaying,
        setIsPlaying,
        layers,
        toggleLayer,
        setLayerOpacity,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
