import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  HeaderComponent,
  MessageComponent,
  SpinnerComponent,
  PageNotFoundComponent
} from './components';
import { ServiceModule, PublicModule, AdminModule } from './modules';
import { ConfirmDialogModule, GrowlModule } from 'primeng/primeng';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessageComponent,
    SpinnerComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceModule,
    ConfirmDialogModule,
    GrowlModule,
    PublicModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [], // look "modules/service-module/service.module.ts"
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
