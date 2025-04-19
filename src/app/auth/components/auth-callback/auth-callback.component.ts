import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
    this.authService.loadUserProfile();
  }

}
