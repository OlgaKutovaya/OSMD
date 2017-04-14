import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../models/user.model';
import { UserService } from 'app/services';
import { SpinnerService } from '../../../../services/spinner.service';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: [ 'user-details.component.sass' ]
})
export class UserDetailsComponent implements OnInit {
  userId: string;
  user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private spinnerService: SpinnerService,
              private messageService: MessageService,
              private location: Location) {
    this.route.params.subscribe(params => this.userId = params[ 'id' ]);
  }

  ngOnInit() {
    this.spinnerService.show();
    this.userService.getUser(this.userId)
      .subscribe(
        (user) => {
          this.spinnerService.hide();
          this.user = user;
        },
        (err) => {
          this.spinnerService.hide();
          this.messageService.error(err);
          console.log(err);
        }
      );
  }

  back() {
    this.location.back();
  }

}
