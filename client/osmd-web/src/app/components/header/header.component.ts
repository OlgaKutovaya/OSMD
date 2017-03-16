import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/shared/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.sass' ]
})
export class HeaderComponent implements OnInit {
  @Input() navLinks: Array<any>;
  @Input() currentUser: User;

  constructor() {
  }

  ngOnInit() {
  }

  onLogout() {
    console.log('logout');
  }

}
