import { Component } from '@angular/core';

import { routerTransition } from 'app/shared';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: [ './page-not-found.component.sass' ],
  animations: [ routerTransition() ],
  host: { '[@routerTransition]': '' }
})
export class PageNotFoundComponent {
}
