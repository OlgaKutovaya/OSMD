import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/primeng';
import { AdminComponent } from './components';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    AdminRoutingModule
  ],
  declarations: [ AdminComponent ]
})
export class AdminModule {
}
