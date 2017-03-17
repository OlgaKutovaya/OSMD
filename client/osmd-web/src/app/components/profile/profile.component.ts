import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { MessageService } from '../message/message.service';
import { SpinnerService } from 'app/components/spinner/spinner.service';
import { apiUrl } from 'app/config';


export interface IProfile {
  _id: string;
  local: {
    username: string,
    email: string,
    confirmed: boolean
  },
  google: {
    name: string,
    email: string
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.sass' ]
})
export class ProfileComponent implements OnInit {
  profile: IProfile;
  loading: boolean;

  constructor(private userService: UserService,
              private spinnerService: SpinnerService,
              private messageService: MessageService,
              @Inject(apiUrl) private apiUrl: string) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.userService.getProfile()
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.profile = data.profile;
        },
        (err) => {
          this.spinnerService.hide();
          if (err.error && err.error.message) {
            this.messageService.error(err.error.message);
          }
        }
      );
  }

  confirm() {
    this.userService.sendConfirm(this.profile._id)
      .subscribe(
        (res) => {
          this.messageService.info(`Письмо отправлено на ${this.profile.local.email}. Пройдите по ссылке из письма.`)
        },
        (err) => {
          if (err.error && err.error.message) {
            return this.messageService.error(err.error.message);
          }
          this.messageService.error('Ошибка');
        }
      )
  }

}
