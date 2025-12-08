import ActivityLogPage from './pages/ActivityLogPage';
import DashboardPage from './pages/DashboardPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Activity Log',
    path: '/',
    element: <ActivityLogPage />
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <DashboardPage />
  }
];

export default routes;
