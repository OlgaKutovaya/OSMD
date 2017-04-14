import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent, SidebarComponent, CategoryPageComponent } from './components';

import { AccordionModule, SharedModule } from 'primeng/primeng';
import { PublicRoutingModule } from './public-routing.module';
import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccordionModule,
    PublicRoutingModule,
    AuthModule,
    ProfileModule
  ],
  declarations: [
    PublicComponent,
    SidebarComponent,
    CategoryPageComponent
  ],
  providers: []
})
export class PublicModule {
}
