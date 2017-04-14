import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import {
  MessageService,
  SpinnerService,
  DocumentService,
  AuthService,
  UserService,
  ValidationService,
  authHttpServiceFactory,
  CategoryService
} from 'app/services';
import { AuthHttp } from 'angular2-jwt';
import { config, apiUrl } from 'app/config';
import {
  ConfirmationService,
  GrowlModule,
  ConfirmDialogModule,
} from 'primeng/primeng';

@NgModule({
  imports: [
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    SpinnerService,
    ConfirmationService,
    AuthService,
    UserService,
    CategoryService,
    DocumentService,
    ValidationService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    {
      provide: apiUrl,
      useValue: config.apiUrl
    }
  ],
  exports: [
    GrowlModule,
    ConfirmDialogModule
  ]
})
export class CommonModule {
}
