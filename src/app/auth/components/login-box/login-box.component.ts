import { Component, input, OnInit } from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MedicalHistorialFormComponent } from "../../../shared/components/medical-historial-form/medical-historial-form.component";
import { FormField } from '../../../shared/interfaces/form-field';
import { AuthBackendService } from '../../services/auth-backend.service';
import { tap, catchError, throwError, delay, timer, switchMap } from 'rxjs';
import { ValdiateUserDTO, ValdiateUserDTOResponse } from '../../../shared/interfaces/user.interface';
import { LoaderService } from '../../../shared/services/loader.service';
import { ToastService } from '../../../shared/services/toast.service';



@Component({
  selector: 'app-login-box',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MedicalHistorialFormComponent
  ],
  templateUrl: './login-box.component.html',
  styleUrl: './login-box.component.scss',
})
export class LoginBoxComponent implements OnInit {

  loginForm: FormGroup;
  trySend: boolean = false;
  title = input<string>('Iniciar Sesión');
  isDoctorLogin = input<boolean>(false);
  isGeneralLogin = input<boolean>(false);

  userProfileFields: FormField[] = [
    { key: 'email', label: 'Email', type: 'email', validators: [Validators.required, Validators.email], colSpan: 1 },
    { key: 'password', label: 'Contrasena', type: 'password', validators: [Validators.required], colSpan: 1 },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authBackendService: AuthBackendService,
    private toast: ToastService,
    private loaderService: LoaderService,
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
    console.log('onSubmit google');
    this.authService.login();
  }

  getAndSetData(redirectUrl: string, userType: string, formData: Record<string, any>) {
    localStorage.setItem('userType', userType);
    this.localStorageService.setItem('role', userType);
    const params: ValdiateUserDTO = {
      email: formData['email'],
      password: formData['password']
    }
    timer(2000)
      .pipe(
        switchMap(() => this.authBackendService.validateUser(params)),
        tap((response: ValdiateUserDTOResponse) => {
          console.log('Datos de respuesta:', response);
          if (response.status) {
            this.localStorageService.setAuthValidation(true);
            this.localStorageService.setItem('userInfo', {
              name: response.NOMBRE,
              email: response.EMAIL,
              picture: '',
              given_name: response.NOMBRE.split(' ')[0],
              password: ''
            });
            this.loaderService.hide();
            this.toast.emitToast('Exitoso', 'El usuario ha sido validado', 'success', true);
          } else {
            this.loaderService.hide();
            this.toast.emitToast('Error', 'El usuario no ha podido ser validado', 'error', true);
            throw new Error('El usuario no ha podido ser validado');
          }
        }),
        delay(2000),
        tap(() => this.router.navigate([redirectUrl])),
        catchError((err: any) => {
          console.log('Error al validar usuario:', err);
          this.localStorageService.setAuthValidation(false);
          this.loaderService.hide();
          this.toast.emitToast('Error', err?.error?.message ?? err, 'error', true);
          return throwError(() => err);
        }))
      .subscribe();

  }

  onSubmitForm(formData: Record<string, any>) {
    this.loaderService.show('Validando...');
    if (this.isDoctorLogin()) {
      this.getAndSetData('/layout-dr/appointments-dr', 'dr', formData);

    } else if (this.isGeneralLogin()) {
      this.getAndSetData('/layout/appointments', 'pa', formData);
    }
  }


  markAsTouched(): void {
    if (this.loginForm) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  validateUserInfo(): boolean {
    const userInfoFound = this.localStorageService.getItem<IUserInfoLocal>('userInfo');
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    console.log({ userInfoFound, email, password })
    console.log(userInfoFound?.email === email && userInfoFound?.password === password)
    if (userInfoFound?.email === email && userInfoFound?.password === password) {
      this.localStorageService.setAuthValidation(true);
      return true;
    } else {
      this.localStorageService.setAuthValidation(false);
      return false;
    }
  }

}
