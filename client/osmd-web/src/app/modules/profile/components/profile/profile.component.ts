import { Component, OnInit } from '@angular/core';

import { MessageService, SpinnerService, UserService } from 'app/services';


export interface IProfile {
  _id: string;
  local: {
    username: string,
    email: string,
    confirmed: boolean
  };
  google: {
    name: string,
    email: string
  };
  role: string[];
}

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: [ 'profile.component.sass' ]

})
export class ProfileComponent implements OnInit {
  profile: IProfile;
  loading: boolean;
  sendingEmail: boolean;

  constructor(private userService: UserService,
              private spinnerService: SpinnerService,
              private messageService: MessageService) {
    this.sendingEmail = false;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.userService.getProfile()
      .subscribe(
        (profile) => {
          this.spinnerService.hide();
          this.profile = profile;
        },
        (err) => {
          this.spinnerService.hide();
          if (err.error && err.error.message) {
            this.messageService.error(err.error.message);
          } else {
            this.messageService.error('Ошибка');
          }
        }
      );
  }

  confirm(): void {
    this.sendingEmail = true;
    this.spinnerService.show();
    this.userService.sendConfirm(this.profile._id)
      .subscribe(
        (res) => {
          this.spinnerService.hide();
          this.messageService.info(`Письмо отправлено на ${this.profile.local.email}. Пройдите по ссылке из письма.`);
        },
        (err) => {
          this.spinnerService.hide();
          this.sendingEmail = false;
          if (err.error && err.error.message) {
            return this.messageService.error(err.error.message);
          }
          this.messageService.error('Ошибка');
        }
      );
  }

  isAdmin(): boolean {
    return this.profile.role.indexOf('admin') > -1;
  }

}
