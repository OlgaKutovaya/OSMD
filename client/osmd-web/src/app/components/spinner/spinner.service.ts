import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subject, Observable } from 'rxjs';

@Injectable()
export class SpinnerService {
  private spinnerSubject = new Subject();
  spinnerState = <Observable<boolean>>this.spinnerSubject;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinnerSubject.next();
      }
    })
  }

  show(): void {
    this.spinnerSubject.next(true);
  }

  hide(): void {
    this.spinnerSubject.next();
  }
}
