import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { IUserInfo } from '../../../doctor/views/doctor-dashboard/doctor-dashboard.component';

@Component({
  selector: 'app-patient-dashboard',
  imports: [],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {


  role: string  | null; 
  userInfo: IUserInfo | null; 
  constructor(private authService: AuthService) {
    this.role = this.authService.getRole();
    this.userInfo = this.authService.getUserInfo() as IUserInfo;
    
  }

  logout(): void {
    this.authService.logout();
  }

}
