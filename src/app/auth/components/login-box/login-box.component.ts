import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-box',
  imports: [ReactiveFormsModule],
  templateUrl: './login-box.component.html',
  styleUrl: './login-box.component.scss',
})
export class LoginBoxComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Loaded login box component');
  }


  onSubmit() {
    this.authService.login();
  }
  
}
