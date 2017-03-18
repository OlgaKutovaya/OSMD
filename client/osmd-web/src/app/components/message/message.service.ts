import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Message } from 'primeng/primeng';
import { Subject, Observable } from 'rxjs';


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
    })
  }

  success(message: string, keepAfterNavigationChange = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({
      severity: 'success',
      detail: message
    });
  }

  error(message: string, keepAfterNavigationChange = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({
      severity: 'error',
      detail: message
    });
  }

  info(message: string, keepAfterNavigationChange = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({
      severity: 'info',
      detail: message
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
