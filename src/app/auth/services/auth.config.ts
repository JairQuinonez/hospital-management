import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin,
    clientId: '22704243115-r7ucempd9v5c6vhipuq0ju54imaig9m4.apps.googleusercontent.com',
    scope: 'openid profile email ',
    showDebugInformation: true,
  };