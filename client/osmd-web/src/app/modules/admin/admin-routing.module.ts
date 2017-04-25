import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AdminComponent,
  UsersTableComponent,
  UserDetailsComponent,
  CategoriesListComponent,
  DocumentsTableComponent
} from './components';
import { AuthGuard, AdminGuard } from 'app/guards';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ AuthGuard, AdminGuard ],
    children: [
      {
        path: 'users', component: UsersTableComponent
      },
      {
        path: 'users/:id', component: UserDetailsComponent
      },
      {
        path: 'categories', component: CategoriesListComponent
      },
      {
        path: 'documents', component: DocumentsTableComponent
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
