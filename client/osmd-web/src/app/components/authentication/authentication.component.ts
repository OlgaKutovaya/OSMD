import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ValidationService, emailValidator } from 'app/services/validation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../message/message.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: [ './authentication.component.sass' ],
  animations: [ routerTransition() ],
  providers: [ ValidationService ],
  host: { '[@routerTransition]': '' }
})
export class AuthenticationComponent {
  authForm: FormGroup;
  formErrors: any = {
    'email': '',
    'password': ''
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private messageService: MessageService,
              private validationService: ValidationService) {
    this.createForm();
  }

  createForm() {
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


  validationMessages: any = {
    'email': {
      'required': 'Введите Email.',
      'invalidEmail': 'Неверный формат Email.'
    },
    'password': {
      'required': 'Введите пароль.',
    }
  };
}
