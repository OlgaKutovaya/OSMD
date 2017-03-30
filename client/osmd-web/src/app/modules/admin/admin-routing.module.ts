import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AdminComponent,
  AdminUsersTableComponent,
  AdminUserDetailsComponent,
  AdminDocumentsTableComponent
} from './components';
import { AuthGuard, AdminGuard } from 'app/guards';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ AuthGuard, AdminGuard ],
    children: [
      {
        path: 'users', component: AdminUsersTableComponent
      },
      {
        path: 'users/:id', component: AdminUserDetailsComponent
      },
      {
        path: 'documents', component: AdminDocumentsTableComponent
      },
      {
        path: '', pathMatch: 'full', redirectTo: 'users'
      }
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AdminRoutingModule {

}
