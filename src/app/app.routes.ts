import { Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor/views/doctor-dashboard/doctor-dashboard.component';
import { LoginComponent } from './auth/views/login/login.component';
import { RoleChooserComponent } from './auth/components/role-chooser/role-chooser.component';
import { PatientDashboardComponent } from './patient/views/patient-dashboard/patient-dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './shared/views/home/home.component';
import { AuthCallbackComponent } from './auth/components/auth-callback/auth-callback.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'dr',
    component: DoctorDashboardComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'patient',
    component: PatientDashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'role-selection', 
    component: RoleChooserComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/login' },
  //{ path: 'auth-callback', component: AuthCallbackComponent },

];
