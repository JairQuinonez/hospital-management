import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin+'/role-selection',
    clientId: '',
    scope: 'openid profile email ',
    showDebugInformation: true,
    responseType: 'code',
    oidc: true,
    dummyClientSecret: ''
  };