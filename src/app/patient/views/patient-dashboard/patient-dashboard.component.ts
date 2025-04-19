import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-patient-dashboard',
  imports: [],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {


  role: string  | null;  
  constructor(private authService: AuthService) {
    this.role = this.authService.getRole();
    
  }

  logout(): void {
    this.authService.logout();
  }

}
