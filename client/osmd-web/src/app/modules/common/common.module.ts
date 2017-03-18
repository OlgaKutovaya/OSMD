import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { AuthService, UserService, authHttpServiceFactory } from 'app/services';
import { MessageService } from 'app/components/message/message.service';
import { SpinnerService } from 'app/components/spinner/spinner.service';
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
    AuthService,
    UserService,
    MessageService,
    ConfirmationService,
    SpinnerService,
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
