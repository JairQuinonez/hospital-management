import { Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor/views/doctor-dashboard/doctor-dashboard.component';
import { LoginComponent } from './auth/views/login/login.component';
import { RoleChooserComponent } from './auth/components/role-chooser/role-chooser.component';
import { PatientDashboardComponent } from './patient/views/patient-dashboard/patient-dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './shared/views/home/home.component';
import { AuthCallbackComponent } from './auth/components/auth-callback/auth-callback.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { LayoutComponent } from './shared/views/layout/layout.component';
import { TableViewComponent } from './shared/components/table-view/table-view.component';
import { MedicalAppointmentsComponent } from './shared/components/medical-appointments/medical-appointments.component';
import { RegisterViewComponent } from './shared/views/register-view/register-view.component';
import { AppointmentsComponent } from './shared/views/appointments/appointments.component';
import { MedicalHistoryComponent } from './shared/views/medical-history/medical-history.component';
import { MedicalHistoryDoctorComponent } from './shared/views/medical-history-doctor/medical-history-doctor.component';
import { AppointmentsDoctorComponent } from './shared/views/appointments-doctor/appointments-doctor.component';
import { GeneralLoginComponent } from './auth/views/general-login/general-login.component';
import { UserWrapperComponent } from './shared/views/user-wrapper/user-wrapper.component';

export const routes: Routes = [
  { path: 'login', component: GeneralLoginComponent },
  { path: 'login-dr', component: LoginComponent },
  {
    path: 'role-selection',
    component: RoleChooserComponent,
    pathMatch: 'full',
  },
  {
    path: 'layout', component: UserWrapperComponent,
    children: [
      { path: 'historial-pa', component: MedicalHistoryComponent },
      { path: 'appointments', component: AppointmentsComponent },
    ]
  },
  {
    path: 'layout-dr', component: UserWrapperComponent,
    children:[
      { path: 'historial-dr', component: MedicalHistoryDoctorComponent },
      { path: 'appointments-dr', component: AppointmentsDoctorComponent },

    ]
  },

  {
    path: 'register',
    component: RegisterViewComponent,
  },
  {
    path: 'dr',
    component: DoctorDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'patient',
    component: PatientDashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];
