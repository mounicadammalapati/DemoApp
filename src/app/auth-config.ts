import { Configuration, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '97e2632a-12bf-45c7-a609-53069a7d90e2',
    authority: 'https://mounicademoapp.ciamlogin.com/',
    redirectUri: 'https://localhost:4200/profile',
    postLogoutRedirectUri: 'http://localhost:4200'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
};

export const loginRequest = {
  scopes: ['User.Read']
};
