import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: [ './authentication.component.sass' ],
  animations: [ routerTransition() ],
  host: { '[@routerTransition]': '' }
})
export class AuthenticationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
