import { Component, OnInit, OnDestroy } from '@angular/core';

import { SpinnerService } from './spinner.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [ './spinner.component.sass' ]
})
export class SpinnerComponent implements OnInit, OnDestroy {
  private spinnerSubscription: Subscription;
  visible: boolean;

  constructor(private spinnerService: SpinnerService) {
    this.visible = false;
  }

  ngOnInit() {
    this.spinnerSubscription = this.spinnerService.spinnerState
      .subscribe((state) => {
        this.visible = state;
      });
  }

  ngOnDestroy() {
    this.spinnerSubscription.unsubscribe();
  }


}
