import { Component, OnInit, HostBinding } from '@angular/core';

import { routerTransition } from 'app/shared';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.sass' ],
  animations: [ routerTransition() ]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routerTransition') '';

  constructor() {
  }

  ngOnInit() {
  }

}
