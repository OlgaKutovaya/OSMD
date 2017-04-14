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
  NavigationComponent
} from './components';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminGuard } from 'app/guards';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryCreateUpdateComponent } from './components/category-create-update/category-create-update.component';

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
    CategoriesTableComponent,
    CategoryCreateUpdateComponent
  ],
  providers: [ AdminGuard ]
})
export class AdminModule {
}
