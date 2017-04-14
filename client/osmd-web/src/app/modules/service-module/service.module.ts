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
import { AuthGuard } from 'app/guards';
import { AuthHttp } from 'angular2-jwt';
import { config, apiUrl } from 'app/config';
import { ConfirmationService } from 'primeng/primeng';

@NgModule({
  imports: [],
  providers: [
    MessageService,
    SpinnerService,
    AuthGuard,
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
  exports: []
})
export class ServiceModule {
}
