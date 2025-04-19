import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-role-chooser',
  imports: [],
  templateUrl: './role-chooser.component.html',
  styleUrl: './role-chooser.component.scss'
})
export class RoleChooserComponent {
  selectedRole: 'doctor' | 'patient' | null = null;
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) { }


  logout(): void {
    this.authService.logout();
  }


  selectRole(role: 'doctor' | 'patient'): void {
    this.selectedRole = role;
    this.localStorageService.setItem('role', role);
    if (this.localStorageService.getAuthValidation()) {
      setTimeout(() => {
        this.authService.navigateByRole(role);
      }, 3000);
    } else {
      setTimeout(() => {
        this.authService.loadUserProfile();
      }, 3000);
    }
    
  }

}
