import { Outlet } from 'react-router-dom';
import { SidebarNav } from '../components/SidebarNav';
import { TopBar } from '../components/TopBar';

export function AppLayout() {
  return (
    <div className="app-shell">
      <SidebarNav />
      <div className="app-shell__workspace">
        <TopBar />
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
