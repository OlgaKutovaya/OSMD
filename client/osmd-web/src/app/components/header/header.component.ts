import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/primeng';
import { AuthService } from 'app/services';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.sass' ]
})
export class HeaderComponent {

  constructor(public authService: AuthService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router) {
  }

  onLogout(): void {
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите выйти?',
      icon: 'fa fa-question-circle',
      header: 'Выход',
      key: 'confirm',
      accept: () => {
        this.messageService.info('Вы разлогинились.', true);
        this.authService.logout();
        this.router.navigate([ '/' ]);
      }
    });
  }

}
