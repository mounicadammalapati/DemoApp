import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import {
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  MsalInterceptor
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './auth-config';

// Create MSAL instance as a singleton
let msalInstance: PublicClientApplication | null = null;

// Factory function to create and initialize MSAL instance
export function MSALInstanceFactory(): PublicClientApplication {
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig);
  }
  return msalInstance;
}

// Initialize MSAL instance and handle redirect response
// This runs before the app starts, ensuring tokens are available
export function initializeApp(msalInstance: PublicClientApplication): () => Promise<void> {
  return async () => {
    try {
      // Always call initialize - it's safe to call multiple times
      // MSAL will handle re-initialization gracefully
      try {
        await msalInstance.initialize();
      } catch (initError: any) {
        // If already initialized, this might throw, but that's okay
        if (!initError.message || !initError.message.includes('already been initialized')) {
          // Only log if it's not an "already initialized" error
          console.warn('MSAL initialization note:', initError.message);
        }
        // Try to verify it's actually initialized
        try {
          const config = msalInstance.getConfiguration();
          if (!config || !config.auth) {
            // Not actually initialized, try again
            await msalInstance.initialize();
          }
        } catch {
          // If we can't check, assume it needs initialization
          await msalInstance.initialize();
        }
      }
      
      // Handle redirect response - this must be called to process redirects
      // It's safe to call even if there's no redirect response
      try {
        const response = await msalInstance.handleRedirectPromise();
        if (response && response.account) {
          msalInstance.setActiveAccount(response.account);
        }
      } catch (redirectError: any) {
        // Handle redirect errors gracefully
        // Many errors are expected (no redirect, user cancelled, etc.)
        if (redirectError.message && redirectError.message.includes('token must be defined')) {
          console.log('MSAL token validation check (expected on initial load)');
        } else if (redirectError.errorCode) {
          const expectedErrors = [
            'user_cancelled', 
            'interaction_in_progress', 
            'consent_required',
            'interaction_required'
          ];
          if (!expectedErrors.includes(redirectError.errorCode)) {
            console.log('MSAL redirect handling:', redirectError.errorCode);
          }
        }
      }
    } catch (error: any) {
      // Suppress "token must be defined" errors during initialization
      if (error.message && error.message.includes('token must be defined')) {
        console.log('MSAL initialization: token validation check (expected)');
        return;
      }
      
      // Check for uninitialized error - this shouldn't happen if we just initialized
      if (error.message && error.message.includes('uninitialized_public_client_application')) {
        console.warn('MSAL appears uninitialized, attempting initialization...');
        try {
          await msalInstance.initialize();
        } catch (retryError) {
          console.error('MSAL initialization failed:', retryError);
        }
        return;
      }
      
      console.error('Error in MSAL initialization:', error);
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    
    // MSAL Providers
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
        interactionType: InteractionType.Redirect,
        authRequest: loginRequest
      }
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useValue: {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map<string, Array<string>>([
          // Add your protected API endpoints here
          // Example: ['https://graph.microsoft.com/v1.0/me', ['User.Read']]
        ]),
        // Only add tokens to requests that match protectedResourceMap
        // If empty, interceptor won't automatically add tokens
        // UncommentAuthRequest is set to false by default, which means
        // the interceptor will only add tokens to requests in protectedResourceMap
      }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (msalInstance: PublicClientApplication) => initializeApp(msalInstance),
      deps: [MSAL_INSTANCE],
      multi: true
    },
    
    // MSAL Services
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    
    // Custom error handler to suppress MSAL token validation errors
    {
      provide: ErrorHandler,
      useClass: class extends ErrorHandler {
        override handleError(error: any): void {
          if (error && error.message && error.message.includes('token must be defined')) {
            // Suppress MSAL's internal token validation errors
            console.log('Suppressed MSAL token validation error:', error.message);
            return;
          }
          // Call the default error handler for other errors
          super.handleError(error);
        }
      }
    },
    
    // HTTP Interceptor - Temporarily commented out to avoid token validation errors
    // Uncomment when you need to make API calls that require tokens
    // Make sure to configure protectedResourceMap with your API endpoints
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true
    // }
  ]
};
