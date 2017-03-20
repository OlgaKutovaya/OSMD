import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components';
import { AuthGuard } from 'app/guards';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ AuthGuard ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AdminRoutingModule {

}
