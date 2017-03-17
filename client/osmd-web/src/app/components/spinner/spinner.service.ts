import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/delay';


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

  show() {
    this.spinnerSubject.next(true);
  }

  hide() {
    this.spinnerSubject.next();
  }
}
