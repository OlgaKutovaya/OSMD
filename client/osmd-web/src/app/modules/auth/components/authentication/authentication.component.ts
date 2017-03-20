import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidationService, emailValidator, AuthService } from 'app/services';
import { routerTransition } from 'app/shared';
import { MessageService } from 'app/components/message/message.service';

@Component({
  selector: 'app-authentication',
  templateUrl: 'authentication.component.html',
  styleUrls: [ 'authentication.component.sass' ],
  animations: [ routerTransition() ],
  providers: [ ValidationService ]
})
export class AuthenticationComponent {
  @HostBinding('@routerTransition') routerTransition;
  authForm: FormGroup;
  formErrors: any = {
    'email': '',
    'password': ''
  };
  validationMessages: any = {
    'email': {
      'required': 'Введите Email.',
      'invalidEmail': 'Неверный формат Email.'
    },
    'password': {
      'required': 'Введите пароль.',
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
    this.authForm = this.formBuilder.group({
      'email': [ '', Validators.compose([
        Validators.required,
        emailValidator
      ]) ],
      'password': [ '', Validators.required ]
    });

    this.authForm.valueChanges
      .subscribe(() => this.formErrors = this.validationService.validate(this.authForm, this.validationMessages, this.formErrors));

  }

  onLogin(values): void {
    this.authService.login(values.email, values.password)
      .subscribe(
        (res) => {
          if (res.jwt && res.user) {
            this.authService.storeUserData(res.jwt, res.user);
            this.messageService.success('Вы успешно авторизовались', true);
            this.router.navigate([ '/' ]);
          } else {
            console.log(res);
          }
        },
        (err) => {
          if (err.error && err.error.message) {
            this.messageService.error(err.error.message);
          } else {
            this.messageService.error('Ошибка');
          }
        }
      );
  }

  onReset(): void {
    this.authForm.reset();
  }
}
