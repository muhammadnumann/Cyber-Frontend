import React from 'react';

// const Home = React.lazy(() => import('./views/Home'))
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Logfaker = React.lazy(() => import('./views/Logfaker'));
const Perpetual = React.lazy(() => import('./views/Perpetual'));
const Playbook = React.lazy(() => import('./views/Playbook'));
const PlaybookNew = React.lazy(() => import('./views/Playbook/PlaybookNew'));
const PlaybookEdit = React.lazy(() =>
  import('./views/Playbook/PlaybookDetail')
);
const Soctools = React.lazy(() => import('./views/Soctools'));
const ApiTest = React.lazy(() => import('./views/ApiTest'));
const Profile = React.lazy(() => import('./views/Profile'));
const Reporting = React.lazy(() => import('./views/Reporting'));
const AdminDashboard = React.lazy(() => import('./views/Admin Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/logfaker', name: 'Logfaker', element: Logfaker },
  { path: '/perpetual', name: 'Perpetual', element: Perpetual },
  { path: '/playbook', name: 'Playbook', element: Playbook },
  { path: '/playbook/new', name: 'PlaybookNew', element: PlaybookNew },
  {
    path: '/playbook/edit/:playbookId',
    name: 'PlaybookEdit',
    element: PlaybookEdit,
  },
  { path: '/soctools', name: 'Soctools', element: Soctools },
  { path: '/apitest', name: 'ApiTest', element: ApiTest },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/Reporting', name: 'Reporting', element: Reporting },
  { path: '/AdminDashboard', name: 'Dashboard', element: AdminDashboard },
];

export default routes;
