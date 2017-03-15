import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.sass' ],
  animations: [ routerTransition() ],
  host: { '[@routerTransition]': '' }
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
