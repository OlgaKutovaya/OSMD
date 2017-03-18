import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'primeng/primeng';
import { HomeComponent, SidebarComponent } from './components';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    SidebarComponent
  ]
})
export class HomeModule {
}
