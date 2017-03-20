import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from 'app/services';
import { MessageService } from '../components/message/message.service';

@Injectable()
export class AdminGuard implements CanActivate {

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
