import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { MessageService } from '../message/message.service';
import { SpinnerService } from 'app/components/spinner/spinner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.sass' ]
})
export class ProfileComponent implements OnInit {
  profile: Object;
  loading: boolean;

  constructor(private userService: UserService,
              private spinnerService: SpinnerService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.loading = true;
    this.spinnerService.show();
    this.userService.getProfile()
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.loading = false;
          this.profile = data.profile;
        },
        (err) => {
          this.spinnerService.hide();
          this.loading = false;
          if (err.error && err.error.message) {
            this.messageService.error(err.error.message);
          }
        }
      );
  }

}
