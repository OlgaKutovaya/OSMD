import { Component, OnInit } from '@angular/core';

import { User } from '../../models';
import { UserService } from 'app/services';
import { SpinnerService } from 'app/components/spinner/spinner.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/primeng';
import { MessageService } from 'app/components/message/message.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: 'admin-users-table.component.html',
  styleUrls: [ 'admin-users-table.component.sass' ]
})
export class AdminUsersTableComponent implements OnInit {
  users: User[];
  totalRecords: number;
  displayDialog = false;
  user: User;
  paginationSkip: number;
  paginationLimit: number;
  columns: any[] = [
    { field: '_id', header: 'ID' },
    { field: 'local.username', header: 'Имя' },
    { field: 'local.email', header: 'Email' },
    { field: 'role', header: 'Права' }
  ];

  constructor(private userService: UserService,
              private spinnerService: SpinnerService,
              private confirmationService: ConfirmationService,
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
    this.userService.getUsers(skip, limit)
      .subscribe((res) => {
        this.spinnerService.hide();
        this.totalRecords = res.count;
        this.users = res.users;
      });
  }

  showAddDialog() {
    // this.newUser = true;
    this.user = new User();
    // this.user.
    this.displayDialog = true;
  }

  onRowSelect(user: User) {
    // this.user = this.cloneUser(user);
    this.displayDialog = true;
  }

  cloneUser(userRef: User) {
    const user = new User();
    for (const prop in userRef) {
      if (userRef.hasOwnProperty(prop)) {
        user[ prop ] = userRef[ prop ];
      }
    }
    return user;
  }

  editUser(user) {
    console.log(user);
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
              this.messageService.info(`Пользователь c id ${userId} удален.`);
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
