import { Component, OnInit, HostBinding } from '@angular/core';

import { routerTransition } from 'app/shared';


@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: [ 'admin.component.sass' ],
  animations: [ routerTransition() ]
})
export class AdminComponent implements OnInit {
  @HostBinding('@routerTransition') routerTransition;

  ngOnInit() {
  }

}
