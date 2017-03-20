import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent, MessageComponent, SpinnerComponent, PageNotFoundComponent } from './components';
import { HomeModule, AuthModule, CommonModule, ProfileModule, AdminModule } from './modules';

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
    CommonModule,
    HomeModule,
    ProfileModule,
    AuthModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [], // look "modules/common/common.module.ts"
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
