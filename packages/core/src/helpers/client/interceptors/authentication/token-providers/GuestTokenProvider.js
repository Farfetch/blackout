import AuthenticationConfigOptions from '../AuthenticationConfigOptions';
import isEqual from 'lodash/isEqual';
import TokenData from './TokenData';
import TokenKinds from './TokenKinds';
import TokenProvider from './TokenProvider';

export const DEFAULT_STORAGE_KEY = 'GuestToken';

/**
 * Token provider for guest users.
 *
 * @augments TokenProvider
 */
class GuestTokenProvider extends TokenProvider {
  /**
   * Creates a new GuestTokenProvider instance.
   *
   * @param {Function} requester - A function that will be responsible to request new tokens. If async, the call will be awaited.
   * @param {object} [storageProvider] - An object implementing the Storage API's methods getItem, setItem and removeItem. If those methods are async, the calls will be awaited.
   * @param {object} [tokenDataSerializer] - An object implementing the serializeTokenData and deserializeTokenData methods. If storage provider is defined, tokenDataSerializer is required.
   * @param {string} [storageKey] - The storage key that will be used on the calls to storageProvider's methods as the key argument. If not provided, a default will be used.
   */
  constructor(requester, storageProvider, tokenDataSerializer, storageKey) {
    super(
      requester,
      storageProvider,
      tokenDataSerializer,
      storageKey || DEFAULT_STORAGE_KEY,
    );

    this.tokenContext = null;
    this.currentGetAccessTokenPromise = null;
  }

  /**
   * Overrides TokenProvider's getSupportedTokenKind method.
   * Returns the kind of tokens that will be produced by this token provider.
   *
   * @override
   * @returns {TokenKinds} Guest token kind.
   */
  getSupportedTokenKind() {
    return TokenKinds.Guest;
  }

  /**
   * Overrides TokenProvider's getAccessToken method.
   * Will retrieve valid access token from either the cache or through the requester.
   * If using the requester, will pass an object with a guestUserId property indicating
   * either a guestUserId if available or null if not available.
   *
   * @override
   *
   * @param {boolean} useCache - If cache should be used or not.
   *
   * @returns {Promise} Promise that will be resolved with a valid access token to be used.
   */
  getAccessToken(useCache = true) {
    if (
      !this.tokenData ||
      !this.tokenData.accessToken ||
      this.tokenData.needsRefresh() ||
      !useCache
    ) {
      // First check if we have a pending get access token request.
      // If we do, have the caller await on the same promise.
      if (this.currentGetAccessTokenPromise) {
        return this.currentGetAccessTokenPromise;
      }

      const usedTokenContext = this.getTokenContext();

      this.currentGetAccessTokenPromise = this.requester(usedTokenContext, {
        [AuthenticationConfigOptions.NoAuthentication]: true,
        [AuthenticationConfigOptions.IsGuestUserAccessTokenRequest]: true,
      }).then(
        async response => {
          this.currentGetAccessTokenPromise = null;

          const responseTokenData = new TokenData(response);

          if (!responseTokenData.userId && this.userId) {
            responseTokenData.userId = this.userId;
          }

          // Only set this token as the current if the token context
          // has not been changed while the request was going on.
          // If the context has changed, return the retrieved token
          // for the caller so he can complete the request and return.
          if (!isEqual(usedTokenContext, this.getTokenContext())) {
            return responseTokenData.accessToken;
          }

          await this.setTokenData(responseTokenData);

          return this.tokenData.accessToken;
        },
        error => {
          // We can only clean the currentGetAccessTokenPromise when it is
          // an error from the current token context.
          if (isEqual(usedTokenContext, this.getTokenContext())) {
            this.currentGetAccessTokenPromise = null;
          }

          return Promise.reject(error);
        },
      );

      return this.currentGetAccessTokenPromise;
    }

    return Promise.resolve(this.tokenData.accessToken);
  }

  /**
   * Gets the token context object to use as the argument for requests to get new guest user tokens.
   *
   * @returns {object} The token context to be used on requests to get new guest user tokens.
   */
  getTokenContext() {
    return {
      ...this.tokenContext,
      guestUserId: this.getUserId() || null,
    };
  }

  /**
   * Sets the token context to be used as the argument for future requests to get new guest user tokens.
   * Will override any previously set contexts.
   *
   * @param {object} newContext - The new context to be set to.
   */
  setTokenContext(newContext) {
    if (isEqual(this.tokenContext, newContext)) {
      return;
    }

    // Invalidate the current get access token promise
    // as we do not want to reuse the promise to a get
    // access token request that was made with another token
    // context.
    this.currentGetAccessTokenPromise = null;

    this.tokenContext = newContext;

    let newTokenData = null;

    // If there is a userId, set the tokenData
    // to a new instance with only the userId.
    // This is because for guest users we need to keep the userId
    // around.
    if (this.userId) {
      newTokenData = new TokenData({ userId: this.userId });
    }

    this.setTokenData(newTokenData);
  }

  /**
   * Resets the token context to the default one.
   */
  resetTokenContext() {
    this.setTokenContext(null);
  }

  /**
   * Overrides TokenProvider's canRetrieveTokens method.
   * Will return true if there is a requester available and false otherwise.
   *
   * @override
   *
   * @returns {boolean} - True if the instance is ready to retrieve tokens and false otherwise.
   */
  canRetrieveTokens() {
    return !!this.requester;
  }

  /**
   * Overrides TokenProvider's canSaveTokenData method.
   * This ensures that for guest tokens, only when there is a user id
   * associated with the token and the token does not have a context
   * it can then be persisted.
   * There is not much value in saving the guest token without
   * a user id associated or if the token is for a specific context.
   *
   * @override
   */
  canSaveTokenData() {
    return (
      super.canSaveTokenData() && !!this.tokenData?.userId && !this.tokenContext
    );
  }
}

export default GuestTokenProvider;
