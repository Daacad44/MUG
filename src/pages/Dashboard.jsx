import UrbanGrowthMap from '../components/map/UrbanGrowthMap';
import RightPanel from '../components/dashboard/RightPanel';
import ChartsSection from '../components/dashboard/ChartsSection';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0 p-2 gap-0">
          <UrbanGrowthMap className="flex-1 min-h-[300px]" />
        </div>
        <RightPanel />
      </div>
      <ChartsSection />
    </div>
  );
}
