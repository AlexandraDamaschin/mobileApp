import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public user: User;
  public confirmPassword: string;
  public ngForm: FormGroup;

  constructor(private _fb: FormBuilder, private _auth: AuthProvider) {
    this.user = new User();
    this.createForm();
  }

  createForm() {
    this.ngForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    }, { validator: this.matchingPassword('password', 'confirmPassword') })
  }

  matchingPassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirm_password = group.controls[confirmPasswordKey];

      if (password.value !== confirm_password.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this._auth.register(this.user)
  }


}
