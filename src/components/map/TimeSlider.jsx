import { Play, Pause } from 'lucide-react';
import { useDashboard } from '../../store/DashboardContext';
import { useTimeAnimation } from '../../hooks/useTimeAnimation';
import { YEARS } from '../../types';

export default function TimeSlider() {
  const { selectedYear, setSelectedYear, isPlaying, setIsPlaying } = useDashboard();
  useTimeAnimation(isPlaying, selectedYear, setSelectedYear);

  const yearIndex = YEARS.indexOf(selectedYear);
  const progress = (yearIndex / (YEARS.length - 1)) * 100;

  return (
    <div className="px-4 py-2.5 border-t border-[#1e293b] bg-[#111827] shrink-0">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-colors shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
        </button>

        <div className="flex-1 relative">
          <input
            type="range"
            min={0}
            max={YEARS.length - 1}
            value={yearIndex}
            onChange={(e) => setSelectedYear(YEARS[Number(e.target.value)])}
            className="w-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, #2563EB ${progress}%, #1e293b ${progress}%)`,
            }}
          />
          <div className="flex justify-between mt-1">
            {YEARS.map((y) => (
              <span
                key={y}
                className={`text-[9px] ${y === selectedYear ? 'text-[#2563EB] font-semibold' : 'text-[#64748b]'}`}
              >
                {y}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
