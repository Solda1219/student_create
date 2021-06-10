import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Report',
    url: '/report',
    icon: 'cil-chart-line'
  },
  {
    name: 'Device',
    url: '/device',
    icon: 'cil-car-alt'
  },
  {
    name: 'Account',
    url: '/account',
    icon: 'cil-people'
  },
  {
    name: 'Monitor',
    url: '/monitor',
    icon: 'cil-monitor'
  },
  {
    name: 'Video',
    icon: 'cil-video',
    url: '/video',
    children:[
      {
        name: 'live',
        url:'/video/live',
        icon:'cil-video'
      },
      {
        name: 'vod',
        url:'/video/vod',
        icon:'cil-video'
      },
      {
        name: 'transfer',
        url:'/video/transfer',
        icon:'cil-video'
      }
    ]
  },
  {
    name: 'Detect',
    url: '/detect',
    icon: 'cil-check-circle'
  },
  {
    name: 'Equipment',
    url: '/equipment',
    icon: 'cil-camera'
  }
];
