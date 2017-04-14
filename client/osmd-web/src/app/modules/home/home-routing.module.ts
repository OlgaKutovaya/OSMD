import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent, CategoryPageComponent } from './components';


const homeChildrenRoutes: Routes = [
  { path: 'category/:id', component: CategoryPageComponent }
];

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: homeChildrenRoutes

  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule {
}

