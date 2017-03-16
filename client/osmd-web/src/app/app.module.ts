import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule, navigatableComponents } from './app-routing.module';
import {
  AccordionModule,
  DialogModule,
  InputTextModule,
  ButtonModule,
  MessagesModule
} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { apiUrl } from './config';
import { UserService } from './services/user.service';
import { MessageComponent } from './components/message/message.component';
import { MessageService } from 'app/services/message.service';
import { GrowlModule } from 'primeng/components/growl/growl';

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents,
    HeaderComponent,
    SidebarComponent,
    MessageComponent,
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
    GrowlModule
  ],
  providers: [
    UserService,
    MessageService,
    { provide: apiUrl, useValue: 'http://127.0.0.1:3000/api/v1' }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
