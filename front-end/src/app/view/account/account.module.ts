import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageTranslationModule } from '../../module/language-translation.module';
import { NgxLoadingModule } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AccountRoutingModule } from './account-routing.module';
import { NgMultiSelectDropDownModule } from '../../module/ng-multiselect-dropdown/src';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DemoMaterialModule } from '../../material.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [AdminComponent, UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    LanguageTranslationModule,
    NgxLoadingModule.forRoot({}),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    DemoMaterialModule,
    TabsModule,
    ProgressbarModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
