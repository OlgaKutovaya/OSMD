import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from 'app/services';
import { MessageService } from '../services/message.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router,
              private messageService: MessageService) {
  }

  canActivate(): Observable<boolean> {
    return this.userService.isAdmin()
      .switchMap(isAdmin => {
        if (!isAdmin) {
          this.messageService.error('Доступ запрещен', true);
          this.router.navigate([ '/profile' ]);
        }
        return Observable.of(isAdmin);
      })
      .catch(() => {
        this.messageService.error('Ошибка', true);
        return Observable.of(false);
      });
  }
}
