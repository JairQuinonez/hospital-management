import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent {
  role: string  | null;  
  constructor(private authService: AuthService) {
    this.role = this.authService.getRole();
  }

  logout(): void {
    this.authService.logout();
  }

}
