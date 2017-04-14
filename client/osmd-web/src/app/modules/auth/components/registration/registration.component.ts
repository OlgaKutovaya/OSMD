import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  MessageService,
  AuthService,
  ValidationService,
  emailValidator,
  matchingPassword
} from 'app/services';
import { RegUser } from 'app/shared';


@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: [ 'registration.component.sass' ]
})
export class RegistrationComponent {
  regForm: FormGroup;
  formErrors: any = {
    'username': '',
    'email': '',
    'password': '',
    'passwordConf': ''
  };
  validationMessages: any = {
    'username': {
      'required': 'Введите имя.',
      'minlength': 'Имя должно быть более 2 символов.',
      'maxlength': 'Имя должно быть менее 30 симоволов.',
    },
    'email': {
      'required': 'Введите Email.',
      'invalidEmail': 'Неверный формат Email.'
    },
    'password': {
      'required': 'Введите пароль.',
      'minlength': 'Пароль должен быть более 6 символов.',
    },
    'passwordConf': {
      'required': 'Подтвердите пароль.',
      'isNotMatch': 'Пароли не совпадают.'
    }
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private messageService: MessageService,
              private validationService: ValidationService) {
    this.createForm();

  }

  createForm(): void {
    this.regForm = this.formBuilder.group({
      'username': [ '', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]) ],
      'email': [ '', Validators.compose([
        Validators.required,
        emailValidator
      ]) ],
      'password': [ '', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]) ],
      'passwordConf': [ '', Validators.compose([
        Validators.required
      ]) ]
    }, { validator: matchingPassword('password', 'passwordConf') });

    this.regForm.valueChanges
      .subscribe(() => this.formErrors = this.validationService.validate(this.regForm, this.validationMessages, this.formErrors));

  }

  onRegistration(values): void {
    const user = new RegUser();
    user.username = values.username.trim();
    user.email = values.email.trim();
    user.password = values.password.trim();
    user.passwordConf = values.passwordConf.trim();

    this.authService.registration(user)
      .subscribe(
        (res) => {
          this.messageService.success('Регистрация выполнена.');
          this.messageService.success('Можете войти.', true);
          this.router.navigate([ '/login' ]);
        },
        (err) => {
          if (err.error) {
            if (err.error.message) {
              this.messageService.error(err.error.message);
            }
            if (err.error.errors) {
              err.error.errors.forEach((errItem) => {
                this.messageService.error(errItem);
              });
            }
          } else {
            this.messageService.error('Ошибка');
          }
        }
      );
  }

  onReset(): void {
    this.regForm.reset();
  }

}


