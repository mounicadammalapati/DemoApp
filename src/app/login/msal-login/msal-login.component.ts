
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  InteractionType,
  PopupRequest,
  RedirectRequest,
  EventMessage,
  EventType
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-msal-login',
  imports: [NgIf,CommonModule,MatProgressSpinnerModule],
  templateUrl: './msal-login.component.html',
  styleUrl: './msal-login.component.css'
})
export class MsalLoginComponent {
 title = 'Microsoft identity platform';
  loginDisplay = false;
  isIframe = false;
  userName: string | null = null;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Only check iframe in browser (not during SSR)
    if (typeof window !== 'undefined') {
      this.isIframe = window !== window.parent && !window.opener;
    } else {
      this.isIframe = false;
    }
    
    // Only run MSAL operations in browser environment (not during SSR)
    if (typeof window === 'undefined') {
      return; // Skip MSAL operations during SSR
    }
    
    // Automatically trigger MSAL login when component loads
    // Wait a bit to ensure MSAL is fully initialized
    setTimeout(() => {
      try {
        // Check if user is already logged in
        const accounts = this.authService.instance.getAllAccounts();
        if (accounts.length === 0) {
          // No accounts found, automatically trigger login
          this.login();
        } else {
          // User is already logged in, set display
          this.setLoginDisplay();
          this.checkAndSetActiveAccount();

          this.router.navigate(['/dashboard']);
        }
      } catch (error) {
        // If MSAL not ready or error, still try to login (only in browser)
        if (typeof window !== 'undefined') {
          console.warn('Error checking accounts, attempting login:', error);
          this.login();
        }
      }
    }, 200); // Small delay to ensure MSAL is initialized
  }

  setLoginDisplay() {
    try {
      this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
      const activeAccount = this.authService.instance.getActiveAccount();
      if (activeAccount) {
        this.userName = activeAccount.name || activeAccount.username || null;
        console.log('User Name:', this.userName);
      } else {
        this.userName = null;
      }
    } catch (error: any) {
      // MSAL might not be initialized yet
      if (error.message && error.message.includes('uninitialized')) {
        console.log('MSAL not ready yet, will retry');
        // Retry after a short delay
        setTimeout(() => this.setLoginDisplay(), 200);
      } else {
        console.warn('Error setting login display:', error);
        this.loginDisplay = false;
        this.userName = null;
      }
    }
  }

  checkAndSetActiveAccount() {
    try {
      /**
       * If no active account set but there are accounts signed in, sets first account to active account
       * To use active account set here, subscribe to inProgress$ first in your component
       * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
       */
      let activeAccount = this.authService.instance.getActiveAccount();
      if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
        let accounts = this.authService.instance.getAllAccounts();
        // add your code for handling multiple accounts here
        this.authService.instance.setActiveAccount(accounts[0]);
      }
    } catch (error: any) {
      // MSAL might not be initialized yet
      if (error.message && error.message.includes('uninitialized')) {
        console.log('MSAL not ready yet, will retry');
        // Retry after a short delay
        setTimeout(() => this.checkAndSetActiveAccount(), 200);
      } else {
        console.warn('Error checking active account:', error);
      }
    }
  }

  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({
          ...this.msalGuardConfig.authRequest,
        } as PopupRequest)
          .subscribe({
            next: (response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
              this.setLoginDisplay();
            },
            error: (error) => {
              console.error('Login failed:', error);
            }
          });
      } else {
        this.authService.loginPopup()
          .subscribe({
            next: (response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
              this.setLoginDisplay();
            },
            error: (error) => {
              console.error('Login failed:', error);
            }
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
        } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }


  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }


  logout() {

    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        account: this.authService.instance.getActiveAccount(),
      });
    } else {
      this.authService.logoutRedirect({
        account: this.authService.instance.getActiveAccount(),
      });
    }
  }

  // unsubscribe to events when component is destroyed
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
