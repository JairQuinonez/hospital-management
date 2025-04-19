import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin+'/role-selection',
    clientId: '22704243115-do7761urr84aka6r54h4d9f4o47nq0id.apps.googleusercontent.com',
    scope: 'openid profile email ',
    showDebugInformation: true,
    responseType: 'code',
    oidc: true,
    dummyClientSecret: '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'
  };