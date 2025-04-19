import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { IUserInfo, IUserInfoLocal } from '../../../doctor/views/doctor-dashboard/doctor-dashboard.component';



@Component({
  selector: 'app-login-box',
  imports: [ReactiveFormsModule],
  templateUrl: './login-box.component.html',
  styleUrl: './login-box.component.scss',
})
export class LoginBoxComponent implements OnInit {

  loginForm: FormGroup;
  trySend: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Loaded login box component');
  }


  onLoginGoogle() {
    console.log('onSubmit');
    this.authService.login();
  }

  onSubmitForm() {
    this.trySend = true;
    this.markAsTouched();
    if (this.loginForm.valid) {
      console.log('Login form is valid');
      if (this.validateUserInfo()) {
        this.router.navigate(['/role-selection']);  
      }

    }
  }

  markAsTouched(): void {
    if (this.loginForm) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  validateUserInfo(): boolean  {
    const userInfoFound = this.localStorageService.getItem<IUserInfoLocal>('userInfo');
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    console.log({userInfoFound, email, password} )
    console.log(userInfoFound?.email === email && userInfoFound?.password === password)
    if (userInfoFound?.email === email && userInfoFound?.password === password) {
      this.localStorageService.setAuthValidation(true);
      return  true;
    } else {
      this.localStorageService.setAuthValidation(false);
      return false;
    }
  }

}
