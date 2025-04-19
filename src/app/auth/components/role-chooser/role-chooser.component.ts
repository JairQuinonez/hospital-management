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
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) { }

  selectRole(role: string): void {
    console.log('Selected role: ' + role);
    this.localStorageService.setItem('role', role);
    this.authService.loadUserProfile(); 
  }

  logout(): void {
    this.authService.logout();
  }

}
