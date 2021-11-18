export class AuthenticationManagerBaseError extends Error {
  constructor(message, originalError = {}) {
    super(message);
    this.originalError = originalError;
  }
}

export class UserSessionExpiredError extends AuthenticationManagerBaseError {
  constructor(originalError) {
    super('User session has expired.', originalError);
  }
}

export class RefreshAccessTokenError extends AuthenticationManagerBaseError {
  constructor(message, originalError) {
    super(message, originalError);
  }
}

export class RefreshGuestUserAccessTokenError extends RefreshAccessTokenError {
  constructor(originalError) {
    super('Unable to refresh guest user access token.', originalError);
  }
}

export class RefreshUserAccessTokenError extends RefreshAccessTokenError {
  constructor(originalError) {
    super('Unable to refresh user access token.', originalError);
  }
}

export class RefreshClientCredentialsAccessTokenError extends RefreshAccessTokenError {
  constructor(originalError) {
    super('Unable to refresh client credentials access token.', originalError);
  }
}

export class MisconfiguredTokenProviderError extends AuthenticationManagerBaseError {
  constructor(tokenProviderKind) {
    super(`'${tokenProviderKind}' token provider not configured correctly.`);
  }
}

export class TokenManagerNotLoadedException extends AuthenticationManagerBaseError {
  constructor() {
    super(
      "Token manager not loaded. Please call 'tokenManager.load()' method before making any requests to the configured client",
    );
  }
}
