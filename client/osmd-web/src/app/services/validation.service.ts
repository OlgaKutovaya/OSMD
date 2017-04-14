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
      if (formErrors.hasOwnProperty(field)) {
        formErrors[ field ] = '';
        const control = formGroup.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = validationMessages[ field ];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              formErrors[ field ] += messages[ key ] + ' ';
            }
          }
        }
      }
    }
    return formErrors;
  }

  priceValidator(control: FormControl): { [s: string]: boolean } {
    const price = control.value;
    if (isNaN(price) || price < 0) {
      return { 'invalidPrice': true };
    }
  }
}

export function emailValidator(control: FormControl): { [s: string]: boolean } {
  const value = control.value || '';
  if (!validator.isEmail(value)) {
    return { 'invalidEmail': true };
  }
  return null;
}

export function matchingPassword(passwordKey: string, passwordConfKey: string) {
  return (group: FormGroup) => {
    const passwordInput = group.controls[ passwordKey ];
    const passwordConfInput = group.controls[ passwordConfKey ];
    if (passwordInput.value !== passwordConfInput.value) {
      return passwordConfInput.setErrors({ 'isNotMatch': true });
    }
    return null;
  };
}
