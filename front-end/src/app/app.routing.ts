import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { HorizonLayoutComponent } from './containers/horizon-layout/horizon-layout.component';

import { P404Component } from './view/error/404.component';
import { P500Component } from './view/error/500.component';
import { LoginComponent } from './view/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { DefaultLayoutComponent } from './containers/defalut-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'state',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./view/dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
      // {
      //   path: 'account',
      //   loadChildren: () => import('./view/account/account.module').then(m => m.AccountModule)
      // },
      // {
      //   path: 'group',
      //   loadChildren: () => import('./view/group/group.module').then(m => m.GroupModule)
      // },
      {
        path: 'state',
        loadChildren: () => import('./view/state/state.module').then(m => m.StateModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
