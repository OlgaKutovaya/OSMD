import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent, MessageComponent, PageNotFoundComponent, SpinnerComponent } from './components';
import { AdminModule, AuthModule, CommonModule, HomeModule, ProfileModule } from './modules';
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
