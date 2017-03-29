import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ButtonModule,
  TabMenuModule,
  DataTableModule,
  SharedModule,
  DialogModule,
} from 'primeng/primeng';
import { AdminComponent, AdminUsersTableComponent, AdminDocumentsTableComponent } from './components';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminGuard } from 'app/guards';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TabMenuModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    AdminRoutingModule
  ],
  declarations: [ AdminComponent, AdminUsersTableComponent, AdminDocumentsTableComponent ],
  providers: [ AdminGuard ]
})
export class AdminModule {
}
