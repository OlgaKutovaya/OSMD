import { Component } from '@angular/core';
import { User } from 'app/shared/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.sass' ]
})
export class AppComponent {
  navLinks = [
    { url: '/', name: 'Домой' },
    { url: '/donate', name: 'Помощь проекту' },
    { url: '/login', name: 'Войти' }
  ];
  currentUser: User;

  constructor() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      try {
        this.currentUser = JSON.parse(localStorageUser);
      } catch (err) {
        console.log(err);
      }
    }
  }

}
