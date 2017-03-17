import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from '../message/message.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.sass' ]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите выйти?',
      icon: 'fa fa-question-circle',
      header: 'Выход',
      key: 'logout',
      accept: () => {
        this.messageService.info('Вы разлогинились.', true);
        this.authService.logout();
        this.router.navigate([ '/' ]);
        console.log('logout');
      }
    });
  }

}
