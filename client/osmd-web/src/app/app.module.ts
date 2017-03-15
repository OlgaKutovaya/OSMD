import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {
  AccordionModule,
  DialogModule,
  InputTextModule,
  ButtonModule,
  PasswordModule
} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SidebarComponent,
    RegistrationComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AccordionModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    PasswordModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
