import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

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
import { filter, takeUntil } from 'rxjs/operators';
import { DashBoardComponent } from './components/dash-board/dash-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
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
    
    // Wait a bit to ensure MSAL is fully initialized before using it
    // The APP_INITIALIZER should have initialized it, but we add a small delay
    // to be safe, especially on first load
    setTimeout(() => {
      try {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
        
        // Only enable account storage events if MSAL is initialized
        try {
          this.authService.instance.enableAccountStorageEvents();
        } catch (error: any) {
          if (error.message && error.message.includes('uninitialized')) {
            console.warn('MSAL not yet initialized, will retry');
            // Retry after a short delay
            setTimeout(() => {
              try {
                this.authService.instance.enableAccountStorageEvents();
              } catch (retryError) {
                console.warn('Failed to enable account storage events:', retryError);
              }
            }, 500);
          }
        }
      } catch (error: any) {
        console.warn('Error in ngOnInit MSAL operations:', error);
      }
    }, 100);

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.LOGOUT_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });


    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });
  }

  setLoginDisplay() {
    try {
      this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
      const activeAccount = this.authService.instance.getActiveAccount();
      if (activeAccount) {
        this.userName = activeAccount.name || activeAccount.username || null;
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
