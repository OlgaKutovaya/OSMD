import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonModule,
  TabMenuModule,
  DataTableModule,
  SharedModule,
  DialogModule,
  DropdownModule,
  InputTextModule,
  InputTextareaModule,
  FileUploadModule,
  CheckboxModule,
  ChipsModule
} from 'primeng/primeng';
import {
  AdminComponent,
  UsersTableComponent,
  UserDetailsComponent,
  DocumentsTableComponent,
  DocumentFormComponent,
  NavigationComponent,
  CategoriesListComponent,
  CategoryCreateUpdateComponent,
  SubcategoryCreateUpdateComponent
} from './components';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminGuard } from 'app/guards';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    TabMenuModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    ChipsModule,
    CheckboxModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    UsersTableComponent,
    UserDetailsComponent,
    DocumentsTableComponent,
    DocumentFormComponent,
    NavigationComponent,
    CategoriesListComponent,
    CategoryCreateUpdateComponent,
    SubcategoryCreateUpdateComponent
  ],
  providers: [ AdminGuard ]
})
export class AdminModule {
}
