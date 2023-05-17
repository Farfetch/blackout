/**
 * Options that can be applied to the axios config object and will be used by the
 * interceptor.
 */
enum AuthenticationConfigOption {
  // This means do not add an access token to the Authorization header of the request.
  // Typically is used for requests to get access tokens which by definition do not need
  // authentication.
  NoAuthentication = '__noAuthentication',
  // This means use this access token instead of generating a new one.
  // Sometimes we might need to have a request use a different access token
  // instead of the current active one. For that case, use this option.
  AccessToken = '__accessToken',
  // This indicates that the current request is to refresh a user token.
  // Used internally to raise a different exception to the caller if the request fails.
  IsUserRefreshTokenRequest = '__isUserRefreshTokenRequest',
  // This indicates that the current request is to get a guest user token.
  // Used internally to raise a different exception to the caller if the request fails.
  IsGuestUserAccessTokenRequest = '__isGuestUserAccessTokenRequest',
  // This indicates that the current request is to get a client credentials token.
  // Used internally to raise a different exception to the caller if the request fails.
  IsClientCredentialsTokenRequest = '__isClientCredentialsTokenRequest',
  // This indicates a callback to be called with the access token used for the request.
  // Can be used to match request responses with the current active token.
  // This is useful when you do not have access to the axios's config object directly.
  UsedAccessTokenCallback = '__usedAccessTokenCallback',
  // This indicates that the current request is to get the current user's profile.
  // Used to set the user id to the current guest/user tokens.
  IsGetUserProfileRequest = '__isGetUserProfileRequest',
  // This indicates the access token used in the request.
  // Useful to query if the request is being done with a guest or authenticated user token.
  UsedAccessToken = '__usedAccessToken',
  // This indicates that the current request is a login request.
  // Used to change the tokens context.
  IsLoginRequest = '__isLoginRequest',
  // This indicates that the current request is a logout request.
  // Used to change the tokens context.
  IsLogoutRequest = '__isLogoutRequest',
  // This value is set on the request by the token manager
  // after it evaluated if the request is supposed to need
  // authentication or not.
  NeedsAuthentication = '__needsAuthentication',
  // This indicates the kind of the used access token for a request.
  UsedAccessTokenKind = '__usedAccessTokenKind',
}

export default AuthenticationConfigOption;
