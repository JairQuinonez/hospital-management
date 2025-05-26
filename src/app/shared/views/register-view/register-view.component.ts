import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormField } from '../../interfaces/form-field';
import { BackgroundShapeComponent } from "../../components/background-shape/background-shape.component";
import { MedicalHistorialFormComponent } from "../../components/medical-historial-form/medical-historial-form.component";
import { LoaderService } from '../../services/loader.service';
import { RegisterService } from '../../services/register.service';
import { ToastService } from '../../services/toast.service';
import { UserDTO } from '../../interfaces/user.interface';
import { catchError, delay, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-register-view',
  imports: [BackgroundShapeComponent, MedicalHistorialFormComponent],
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.scss'
})
export class RegisterViewComponent {

  pageTitle: string = 'REGISTRATE';
  initialRegisterData: Record<string, any> | null = null; 


  registerFields: FormField[] = [
    { key: 'nombres', label: 'Nombres', type: 'text', validators: [Validators.required], colSpan: 1 },
    { key: 'apellidos', label: 'Apellidos', type: 'text', validators: [Validators.required], colSpan: 1 },
    { key: 'tipoDocumento', label: 'Tipo de Documento', type: 'select', validators: [Validators.required],
      options: [
        { value: 'cc', label: 'Cédula de Ciudadanía' },
        { value: 'ce', label: 'Cédula de Extranjería' },
        { value: 'pa', label: 'Pasaporte' }
      ],
      colSpan: 1
    },
    { key: 'numeroDocumento', label: 'Numero de Documento', type: 'text', validators: [Validators.required], colSpan: 1 },
    { key: 'correo', label: 'Correo electronico', type: 'email', validators: [Validators.required, Validators.email], colSpan: 1 },
    { key: 'numeroCelular', label: 'Numero celular', type: 'text', validators: [Validators.required], colSpan: 1 },
    { key: 'password', label: 'Crear Contraseña', type: 'password', validators: [Validators.required, Validators.minLength(6)], colSpan: 1 },
    { key: 'confirmPassword', label: 'Confirmar Contraseña', type: 'password', validators: [Validators.required], colSpan: 1 }
  ];


  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private registerService: RegisterService,
    private toast:  ToastService
  ) {}

  onRegisterSubmit(formData: Record<string, any>): void {
    console.log('Datos de registro:', formData);
    this.loaderService.show('Registrando...');
    const body: UserDTO = {
      nombre: `${formData['nombres']} ${formData['apellidos']}`,
      email: formData['correo'],
      password: formData['password'],
      rol: 'paciente'
    }
    this.registerService.creatUser(body)
    .pipe(
      tap(()  => this.loaderService.hide()),
      tap(()  => this.toast.emitToast('Exitoso', 'El usuario ha sido registrado', 'success', true)),
      delay(2000),
      tap(()  => this.router.navigate(['/login'])),
      catchError((err: any) => {
        console.log('Error al registrar usuario:', err);
        this.loaderService.hide();
        this.toast.emitToast('Error', 'El usuario no ha podido ser registrado', 'error', true);
        return throwError(() => err);
      })
    )
    .subscribe();
  }

  onRegisterCancel(): void {
    console.log('Registro cancelado');
    this.toast.emitToast('Cancelado', 'El registro ha sido cancelado', 'success', true);
    this.router.navigate(['/login']);
  }
}
