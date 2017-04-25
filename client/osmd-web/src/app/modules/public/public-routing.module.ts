import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PublicComponent, CategoryPageComponent } from './components';
import { RegistrationComponent, AuthenticationComponent } from '../auth/components';

const publicChildrenRoutes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'categories/:categoryLabel/:subcategoryLabel',
    component: CategoryPageComponent
  }
];

const routes: Routes = [
  {
    path: '', component: PublicComponent, children: publicChildrenRoutes
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class PublicRoutingModule {
}

