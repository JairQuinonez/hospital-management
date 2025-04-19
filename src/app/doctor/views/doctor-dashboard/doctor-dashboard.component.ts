import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

export  interface IUserInfo {
  name: string;
  email: string;
  picture: string;
  given_name: string;
}

@Component({
  selector: 'app-doctor-dashboard',
  imports: [],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent {
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
