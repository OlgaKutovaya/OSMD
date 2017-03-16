import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
const validator = require('validator');

@Injectable()
export class ValidationService {

  validate(formGroup, validationMessages, formErrors): Object {
    if (!formGroup) {
      return formErrors;
    }
    for (const field in formErrors) {
      formErrors[ field ] = '';
      const control = formGroup.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[ field ];
        for (const key in control.errors) {
          formErrors[ field ] += messages[ key ] + ' ';
        }
      }
    }
    return formErrors;
  }
}

export function emailValidator(control: FormControl): { [s: string]: boolean } {
  if (!validator.isEmail(control.value)) {
    return { 'invalidEmail': true };
  }
}

export function matchingPassword(passwordKey: string, passwordConfKey: string) {
  return (group: FormGroup) => {
    let passwordInput = group.controls[ passwordKey ];
    let passwordConfInput = group.controls[ passwordConfKey ];
    if (passwordInput.value !== passwordConfInput.value) {
      return passwordConfInput.setErrors({ 'isNotMatch': true });
    }
    return null;
  }
}
