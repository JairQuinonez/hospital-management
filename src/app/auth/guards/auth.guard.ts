import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,  private localStorageService: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    console.log('AuthGuard is being called?');
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map((isLoggedIn) => {
        if (isLoggedIn) {
          if (this.authService.hasRole()) {
            return true; 
          } else {
            this.router.navigate(['/role-selection'] );
            return false; 
          }
        } else {
          console.log('User is not logged in' );
          if (this.localStorageService.getAuthValidation()) {
            return true; 
          } else {
            this.router.navigate(['/login']);
            return false; 
          }
        }
      })
    );
  }
} 
