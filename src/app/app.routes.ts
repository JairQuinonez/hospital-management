import { Routes } from '@angular/router';
import { LoginComponent } from './auth/views/login/login.component';
import { RoleChooserComponent } from './auth/components/role-chooser/role-chooser.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RegisterViewComponent } from './shared/views/register-view/register-view.component';
import { AppointmentsComponent } from './shared/views/appointments/appointments.component';
import { MedicalHistoryComponent } from './shared/views/medical-history/medical-history.component';
import { MedicalHistoryDoctorComponent } from './shared/views/medical-history-doctor/medical-history-doctor.component';
import { AppointmentsDoctorComponent } from './shared/views/appointments-doctor/appointments-doctor.component';
import { GeneralLoginComponent } from './auth/views/general-login/general-login.component';
import { UserWrapperComponent } from './shared/views/user-wrapper/user-wrapper.component';
import { roleGuard } from './auth/guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: GeneralLoginComponent },
  { path: 'login-dr', component: LoginComponent },
  {
    path: 'role-selection',
    component: RoleChooserComponent,
    pathMatch: 'full',
  },
  {
    path: 'layout', 
    component: UserWrapperComponent,
    canActivate: [AuthGuard, roleGuard],
    children: [
      { path: 'historial-pa', component: MedicalHistoryComponent },
      { path: 'appointments', component: AppointmentsComponent },
    ],
    data:{
      expectedRoles: ['pa']
    }
  },
  {
    path: 'layout-dr', component: UserWrapperComponent,
    canActivate: [roleGuard],
    children:[
      { path: 'historial-dr', component: MedicalHistoryDoctorComponent },
      { path: 'appointments-dr', component: AppointmentsDoctorComponent },

    ],
    data:{
      expectedRoles: ['dr']
    }
  },

  {
    path: 'register',
    component: RegisterViewComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];
