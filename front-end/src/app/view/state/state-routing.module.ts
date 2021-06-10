import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StateComponent } from './state.component';
import { StateContentComponent } from './state-content/state-content.component'
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentUpdateComponent } from './student-update/student-update.component';

const routes: Routes = [
  {
    path: '',
    component: StateComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'content/:stateId', component: StateContentComponent
  },
  {
    path: 'student/create/:stateId', component: StudentCreateComponent
  },
  {
    path: 'student/edit/:studentId', component: StudentUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule {}
