export const environment ={
    production:false,
    azure: {
    clientId: '2e046691-8e98-42d5-a6a5-54ebca729ba0',
    tenantId:'c072d818-f08c-42ea-a1c6-3a7af4c0ad02',
    authority: 'https://login.microsoftonline.com/c072d818-f08c-42ea-a1c6-3a7af4c0ad02',
    redirectUri: 'https://localhost:4200/profile',
    postLogoutRedirectUri: 'https://localhost:4200/profile',
    scopes: ['user.read'] // or your API scope
  }
}