/**
 * Contain login method types to be used when tracking the login (or sign-up)
 * events.
 */
const loginMethodParameterTypes = {
  TENANT: 'Tenant',
  FACEBOOK: 'Facebook',
  GOOGLE: 'Google',
  TWITTER: 'Twitter',
  APPLE: 'Apple',
  OTHER: 'Other',
} as const;

export default loginMethodParameterTypes;
