import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent, SidebarComponent } from './components';
import { AccordionModule, SharedModule } from 'primeng/primeng';
import { CategoryService } from 'app/services';
import { HomeRoutingModule } from './home-routing.module';
import { CategoryPageComponent } from './components/category-page/category-page.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccordionModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    CategoryPageComponent
  ],
  providers: [ CategoryService ]
})
export class HomeModule {
}
