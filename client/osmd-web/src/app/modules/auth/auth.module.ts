import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule, InputTextModule } from 'primeng/primeng';
import { AuthenticationComponent, RegistrationComponent } from './components';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthenticationComponent,
    RegistrationComponent
  ]
})
export class AuthModule {
}
