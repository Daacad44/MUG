import { useEffect } from 'react';
import { YEARS } from '../types';

export function useTimeAnimation(isPlaying, selectedYear, setSelectedYear) {
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSelectedYear((prev) => {
        const idx = YEARS.indexOf(prev);
        const next = idx >= YEARS.length - 1 ? 0 : idx + 1;
        return YEARS[next];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, setSelectedYear]);
}
