import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { StateComponent } from './state.component';
import { StateRoutingModule } from './state-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { StateContentComponent } from './state-content/state-content.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxLoadingModule } from 'ngx-loading';
import { DemoMaterialModule } from '../../material.module';
import { StudentUpdateComponent } from './student-update/student-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StateRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    TabsModule,
    ModalModule.forRoot(),
    DemoMaterialModule
  ],
  declarations: [ StateComponent, StateContentComponent, StudentCreateComponent, StudentUpdateComponent]
})
export class StateModule { }
