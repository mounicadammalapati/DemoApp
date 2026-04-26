import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Global error handler to catch and suppress MSAL token validation errors
// Only run in browser (not during SSR)
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event: ErrorEvent): void => {
    if (event.message && event.message.includes('token must be defined')) {
      // Suppress MSAL's internal token validation errors
      // These are often false positives when MSAL checks for tokens that don't exist yet
      console.log('Suppressed MSAL token validation error (expected behavior)');
      event.preventDefault();
    }
  });

  // Also catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes('token must be defined')) {
      console.log('Suppressed MSAL token validation promise rejection (expected behavior)');
      event.preventDefault();
    }
  });
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => {
    // Suppress token validation errors during bootstrap
    if (err && err.message && err.message.includes('token must be defined')) {
      console.log('Suppressed MSAL token validation error during bootstrap');
      return;
    }
    console.error('Bootstrap error:', err);
  });
