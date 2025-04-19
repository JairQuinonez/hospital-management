import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { IUserInfo } from '../../../doctor/views/doctor-dashboard/doctor-dashboard.component';
import { LocalStorageService } from '../../../auth/services/local-storage.service';

@Component({
  selector: 'app-patient-dashboard',
  imports: [],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {
  userInfo: IUserInfo = {
    name: '',
    email: '',
    picture: '',
    given_name: '',
  };
  role: string | null;
  constructor(private authService: AuthService, private localStorage: LocalStorageService) {
    this.role = this.authService.getRole();
    this.validateByUser();  

  }

  validateByUser(){
    if(this.localStorage.getAuthValidation()){
      this.userInfo = this.localStorage.getDefaultUserInfo() as IUserInfo
      console.log("VALIIDATE NORMAL",this.userInfo)
    } else {
      this.userInfo = this.authService.getUserInfo() as IUserInfo;
    }

  }


  logout(): void {
    this.authService.logout();
  }

}
