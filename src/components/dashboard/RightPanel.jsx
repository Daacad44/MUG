import StatsCards from './StatsCards';
import LayerControls from './LayerControls';
import MapLegend from './MapLegend';
import LandUseChart from './LandUseChart';

export default function RightPanel() {
  return (
    <div className="w-[240px] shrink-0 flex flex-col gap-2 p-2 overflow-y-auto">
      <StatsCards />
      <LayerControls />
      <MapLegend />
      <LandUseChart />
    </div>
  );
}
