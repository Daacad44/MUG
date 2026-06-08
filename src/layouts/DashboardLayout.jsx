import { Outlet } from 'react-router-dom';
import TopNav from '../components/layout/TopNav';
import LeftSidebar from '../components/layout/LeftSidebar';
import Footer from '../components/layout/Footer';
import { DashboardProvider } from '../store/DashboardContext';

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="h-full flex flex-col bg-[#0B1120] overflow-hidden">
        <TopNav />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <LeftSidebar />
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </DashboardProvider>
  );
}
