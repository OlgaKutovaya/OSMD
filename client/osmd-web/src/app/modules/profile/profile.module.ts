import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/primeng';
import { ProfileComponent } from './components';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    ProfileRoutingModule
  ],
  declarations: [ ProfileComponent ]
})
export class ProfileModule {
}
