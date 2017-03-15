import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.sass' ],
  animations: [ routerTransition() ],
  host: { '[@routerTransition]': '' }
})
export class RegistrationComponent implements OnInit {
  regForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  passwordConf: AbstractControl;

  constructor(private formBuilder: FormBuilder) {
    this.regForm = this.formBuilder.group({
      'name': [ '', Validators.compose([
        Validators.required
      ]) ],
      'email': [ '', Validators.compose([
        Validators.required
      ]) ],
      'password': [ '', Validators.compose([
        Validators.required
      ]) ],
      'passwordConf': [ '', Validators.compose([
        Validators.required
      ]) ]
    });
    this.name = this.regForm.controls[ 'name' ];
    this.email = this.regForm.controls[ 'email' ];
    this.password = this.regForm.controls[ 'password' ];
    this.passwordConf = this.regForm.controls[ 'passwordConf' ];
  }

  ngOnInit() {
  }

  onRegistration(): void {
    console.log(this.regForm.value);
  }

}

function sku123Validator(control: FormControl): { [s: string]: boolean } {
  try {
    if (!control.value.match(/^123/)) {
      return { 'sku123error': true };
    }
  } catch (err) {
    return { 'sku123error': true };
  }
  if (control.value.length < 8) {
    return { 'sku length error': true };
  }
}

