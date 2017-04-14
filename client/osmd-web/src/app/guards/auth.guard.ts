import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from 'app/services';
import { MessageService } from '../services/message.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {
  }

  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.messageService.error('Вы не авторизованы.', true);
      this.router.navigate([ '/login' ]);
      return false;
    }
  }
}
