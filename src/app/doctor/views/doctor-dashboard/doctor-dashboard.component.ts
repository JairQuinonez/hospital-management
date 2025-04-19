import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { LocalStorageService } from '../../../auth/services/local-storage.service';

export  interface IUserInfo {
  name: string;
  email: string;
  picture: string;
  given_name: string;
}

export  interface IUserInfoLocal {
  name: string;
  email: string;
  picture: string;
  given_name: string;
  password: string;
}

@Component({
  selector: 'app-doctor-dashboard',
  imports: [],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent {
  role: string  | null;  
  userInfo: IUserInfo={
    name: '',
    email: '',
    picture: '',  
    given_name: '',
  };



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
