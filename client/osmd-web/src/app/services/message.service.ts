import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Message } from '../components/message/message.interface';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class MessageService {
  private subject = new Subject<Message>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false, timeout?: number): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({
      severity: 'success',
      detail: message,
      timeout
    });
  }

  error(message: string, keepAfterNavigationChange = false, timeout?: number): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({
      severity: 'error',
      detail: message,
      timeout
    });
  }

  info(message: string, keepAfterNavigationChange = false, timeout?: number): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({
      severity: 'info',
      detail: message,
      timeout
    });
  }
  getMessage(): Observable<Message> {
    return this.subject.asObservable();
  }
}
