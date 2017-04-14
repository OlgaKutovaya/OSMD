import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'app/shared';
import { ConfirmationService, LazyLoadEvent } from 'primeng/primeng';
import { MessageService, SpinnerService, UserService } from 'app/services';

export interface IUserTableColumn {
  field: string;
  header: string;
}

@Component({
  selector: 'app-admin-users',
  templateUrl: 'users-table.component.html',
  styleUrls: [ 'users-table.component.sass' ]
})
export class UsersTableComponent implements OnInit {
  users: User[];
  totalRecords: number;
  paginationSkip: number;
  paginationLimit: number;
  columns: IUserTableColumn[] = [
    { field: 'local.email', header: 'Email' },
    { field: 'local.username', header: 'Имя' }
  ];

  constructor(private userService: UserService,
              private spinnerService: SpinnerService,
              private confirmationService: ConfirmationService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

  loadUsersLazy(event: LazyLoadEvent) {
    this.paginationSkip = event.first;
    this.paginationLimit = event.rows;
    this.spinnerService.show();
    this.getUsersPagination(this.paginationSkip, this.paginationLimit);
  }

  getUsersPagination(skip, limit) {
    this.userService.getAllUsersForAdmin(skip, limit)
      .subscribe(
        (res) => {
          this.spinnerService.hide();
          this.totalRecords = res.count;
          this.users = res.users;
        },
        (err) => {
          this.spinnerService.hide();
          this.messageService.error(err);
        }
      );
  }

  showUserDetails(user) {
    console.log(user);
    this.router.navigate([ 'admin/users', user._id ]);
  }

  isAdmin(user): boolean {
    return user.role.indexOf('admin') > -1;
  }

  deleteUser(user: User) {
    const userId = user._id;
    this.confirmationService.confirm({
      message: 'Удалить пользователя?',
      icon: 'fa fa-question-circle',
      header: 'Удаление пользователя',
      key: 'confirm',
      accept: () => {
        this.spinnerService.show();
        this.userService.deleteUser(userId)
          .subscribe(
            (res) => {
              this.spinnerService.hide();
              console.log(res);
              this.messageService.info(`Пользователь удален.`);
              this.getUsersPagination(this.paginationSkip, this.paginationLimit);
            },
            (err) => {
              this.spinnerService.hide();
              console.log(err);
              this.messageService.error(err);
            }
          );
      }
    });
  }

}
