import { Component, OnInit, HostBinding } from '@angular/core';

import { routerTransition } from 'app/shared';
import { MenuItem } from 'primeng/primeng';


@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: [ 'admin.component.sass' ],
  animations: [ routerTransition() ]
})
export class AdminComponent implements OnInit {
  @HostBinding('@routerTransition') routerTransition;
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Пользователи', icon: 'fa-users', routerLink: [ 'admin', 'users' ] },
      { label: 'Документы', icon: 'fa-book', routerLink: [ 'admin', 'documents' ] }
    ];
  }

}
