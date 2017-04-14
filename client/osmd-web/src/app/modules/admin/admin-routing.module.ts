import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AdminComponent,
  UsersTableComponent,
  UserDetailsComponent,
  CategoriesTableComponent,
  CategoryCreateUpdateComponent,
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
        path: 'categories', component: CategoriesTableComponent
      },
      {
        path: 'categories/edit/:id', component: CategoryCreateUpdateComponent
      },
      {
        path: 'categories/add', component: CategoryCreateUpdateComponent
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
