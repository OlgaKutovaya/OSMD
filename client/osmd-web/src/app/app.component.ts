import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.sass' ]
})
export class AppComponent {
  title = 'app works!';
  navLinks = [
    { url: '/', name: 'Домой' },
    { url: '/donate', name: 'Помощь проекту' },
    { url: '/login', name: 'Войти' },
    { url: '/registration', name: 'Регистрация' },
  ]
}
