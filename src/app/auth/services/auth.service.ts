import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { Router } from '@angular/router';//
import { LocalStorageService } from './local-storage.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userProfileSubject = new BehaviorSubject<any>(null); // Use BehaviorSubject for initial value
  userProfile$ = this.userProfileSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
       this.isLoggedInSubject.next(this.oauthService.hasValidAccessToken());
      if (this.isLoggedInSubject.value) {
         this.loadUserProfile(); // Load profile if already logged in
      }
    });
    this.oauthService.setupAutomaticSilentRefresh(); // For refresh tokens
  }

  login(): void {
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    this.oauthService.revokeTokenAndLogout();
    this.oauthService.logOut();
    this.localStorageService.clear();
    this.userProfileSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  loadUserProfile(): void {
    console.log('loadUserProfile  is  being  called?'); 
    this.oauthService.loadUserProfile().then(profile => {
      this.userProfileSubject.next(profile); // Update the subject
      const role = this.localStorageService.getItem<string>('role'); // Check if role already exists
      if (!role) {
        this.router.navigate(['/role-selection']); // Redirect to role selection
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  getClaims(): any {
    return this.oauthService.getIdentityClaims();
  }

  hasRole(): boolean {
    return !!this.localStorageService.getItem<string>('role');
  }

   getRole(): string | null {
       return this.localStorageService.getItem<string>('role');
   }

}