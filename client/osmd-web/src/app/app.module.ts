import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { AppRoutingModule, navigatableComponents } from './app-routing.module';
import {
  AccordionModule,
  DialogModule,
  InputTextModule,
  ButtonModule,
  GrowlModule,
  ConfirmDialogModule,
  ConfirmationService
} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { apiUrl } from './config';
import { UserService } from './services/user.service';
import { MessageComponent } from './components/message/message.component';
import { AuthService, authHttpServiceFactory } from 'app/services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { AuthHttp } from 'angular2-jwt';
import { SpinnerComponent } from 'app/components/spinner/spinner.component';
import { SpinnerService } from 'app/components/spinner/spinner.service';
import { MessageService } from 'app/components/message/message.service';

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents,
    HeaderComponent,
    SidebarComponent,
    MessageComponent,
    ProfileComponent,
    SpinnerComponent
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
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    UserService,
    AuthService,
    MessageService,
    ConfirmationService,
    AuthGuard,
    SpinnerService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    { provide: apiUrl, useValue: 'http://127.0.0.1:3000/api/v1' }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
