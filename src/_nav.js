import DashboardIcon from './components/icons/DashboardIcon';
import LogfakerIcon from './components/icons/LogfakerIcon';
import PerpetualIcon from './components/icons/PerpetualIcon';
import SoctoolsIcon from './components/icons/SoctoolsIcon';
import PlaybookIcon from './components/icons/PlaybookIcon';
import ReportIcon from './components/icons/ReportIcon';
export const header_links = [
  { title: 'About Us', href: '/about' },
  { title: 'Contact Us', href: '/contact' },
  { title: 'Platforms', href: '/platforms' },
  { title: 'Solutions', href: '/solutions' },
  { title: 'Pricing', href: '/pricing' },
];

export const sidebar_links = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: DashboardIcon,
  },
  {
    name: 'Soc Tools Platform',
    to: '/soctools',
    icon: SoctoolsIcon,
  },
  {
    name: 'Log Faker',
    to: '/logfaker',
    icon: LogfakerIcon,
  },
  {
    name: 'Perpetual Logs',
    to: '/perpetual',
    icon: PerpetualIcon,
  },
  {
    name: 'Playbook',
    to: '/playbook',
    icon: PlaybookIcon,
    items: [
      // {
      //   name: 'Playbook Details',
      //   to: '/playbook',
      // },
      {
        name: 'Playbook Creation',
        to: '/playbook/new',
      },
    ],
  },
  {
    name: 'Reporting',
    to: '/reporting',
    icon: ReportIcon,
  },
  {
    name: 'Admin Dashboard',
    to: '/AdminDashboard',
    icon: DashboardIcon,
  },
];
