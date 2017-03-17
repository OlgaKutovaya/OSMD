import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/shared/user/user';
import { MessageService } from '../message/message.service';
import { ValidationService, emailValidator, matchingPassword } from 'app/services/validation.service';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.sass' ],
  animations: [ routerTransition() ],
  providers: [ ValidationService ],
  host: { '[@routerTransition]': '' }
})
export class RegistrationComponent {
  regForm: FormGroup;
  formErrors: any = {
    'username': '',
    'email': '',
    'password': '',
    'passwordConf': ''
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private messageService: MessageService,
              private validationService: ValidationService) {
    this.createForm();

  }

  createForm() {
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
    let user = new User();
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
              err.error.errors.forEach((err) => {
                this.messageService.error(err);
              })
            }
          } else {
            this.messageService.error('Ошибка');
          }
        }
      );
  }

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

}


