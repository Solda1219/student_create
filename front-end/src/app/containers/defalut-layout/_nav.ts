import { INavData } from '@coreui/angular';

export const navItems = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   role: -1,
  // },
  {
    name: 'Account',
    icon: 'cil-user-follow',
    url: '/account',
    role:-1,
    children: [
      {
        name: 'admin',
        url:'/account/admin',
        icon:'cil-triangle',
        role:1,
      },
      // {
      //   name: 'user',
      //   url:'/account/user',
      //   icon:'cil-triangle',
      //   role:2,
      // },
      
    ]
  },
  {
    name: 'State',
    icon: 'fa fa-group',
    url: '/state',
    role:2,

  },
  {
    name: 'Report',
    icon: 'cil-triangle',
    url: '/report',
    role:2,

  },
];
