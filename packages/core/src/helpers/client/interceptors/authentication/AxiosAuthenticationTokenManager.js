import {
  assertOption,
  assertOptionType,
  getRequestUrlWithoutBase,
} from './utils';
import {
  ClientCredentialsTokenProvider,
  GuestTokenProvider,
  TokenData,
  UserTokenProvider,
} from './token-providers';
import {
  MisconfiguredTokenProviderError,
  RefreshClientCredentialsAccessTokenError,
  RefreshGuestUserAccessTokenError,
  RefreshUserAccessTokenError,
  TokenManagerNotLoadedException,
  UserSessionExpiredError,
} from './errors';
import AuthenticationConfigOptions from './AuthenticationConfigOptions';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import isNil from 'lodash/isNil';

/**
 * Class responsible for installing an axios interceptor which will manage
 * authentication of any requests that require it with the correct
 * access token type (user or guest).
 */
class AxiosAuthenticationTokenManager {
  /**
   *
   * @param {AxiosInstance} client - The axios instance to apply the interceptors to.
   * @param {object} options - Options to configure this instance.
   * @param {Function} options.authorizationHeaderFormatter - Function that will be used to format the authorization header of a request with the access token.
   * @param {Function} [options.clientCredentialsTokenRequester] - A function that will produce a new client credentials token. This function can be async and will be awaited.
   * @param {Function} options.guestTokenRequester - A function that will produce a new guest token. This function can be async and will be awaited.
   * @param {number} [options.refreshTokenWindowOffset] - A value in milliseconds to advance the access token expiration time. Use this value if you want to make a refresh access token request before the access token expiration time. By default, it will be 30 seconds.
   * @param {object} [options.storage] - Storage options.
   * @param {object} options.storage.provider - An object implementing the Storage API methods getItem, setItem and removeItem. If these methods are async, they will be awaited. If not specified, the tokens will not be persisted.
   * @param {object} options.storage.serializer - An object implementing the methods serializeTokenData and deserializeTokenData. This option is required if a valid storage.provider value is provided. The methods provided by serializer must not be async.
   * @param {object} [options.storage.guestTokenStorageKey] - A string that defines the storage key where guest user tokens data will be stored and will be used as the argument to storage.provider methods as the key argument. If not provided a default value will be used.
   * @param {string} [options.storage.userTokenStorageKey] - A string that defines the storage key where user tokens data will be stored and will be used as the argument to storage.provider methods as the key argument. If not provided a default value will be used.
   * @param {string} [options.storage.clientCredentialsTokenStorageKey] - A string that defines the storage key where client credentials tokens data will be stored and will be used as the argument to storage.provider methods as the key argument. If not provided a default value will be used.
   * @param {Function} options.userTokenRequester - A function that will produce a new user token. This function can be async and will be awaited.
   */
  constructor(client, options) {
    this.initialize(client, options);
  }

  /**
   * Initializes the instance with the passed in options by validating them first
   * and then applying them.
   *
   * @param {AxiosInstance} client - The axios instance to apply the interceptors to.
   * @param {object} options - The options object passed to the constructor.
   */
  initialize(client, options) {
    this.validateOptions(client, options);

    this.applyOptions(client, options);
  }

  /**
   * Validates the passed options.
   *
   * @throws Will throw an error if an option does not contain a valid value.
   *
   * @param {AxiosInstance} client - The axios instance to apply the interceptors to.
   * @param {object} options - The options object passed to the constructor.
   */
  validateOptions(client, options) {
    if (!client) {
      throw new TypeError(
        "Missing 'client' parameter to 'AxiosAuthenticationTokenManager' constructor call",
      );
    }

    if (!options) {
      throw new TypeError(
        "Missing 'options' parameter to 'AxiosAuthenticationTokenManager' constructor call",
      );
    }

    const {
      authorizationHeaderFormatter,
      clientCredentialsTokenRequester,
      guestTokenRequester,
      refreshTokenWindowOffset,
      storage,
      userTokenRequester,
    } = options;

    assertOptionType(
      authorizationHeaderFormatter,
      'function',
      'authorizationHeaderFormatter',
    );

    assertOption(
      client,
      value =>
        value &&
        typeof value.interceptors === 'object' &&
        value.interceptors !== null,
      'client',
    );

    assertOption(
      clientCredentialsTokenRequester,
      value => value === undefined || typeof value === 'function',
      'clientCredentialsTokenRequester',
    );

    assertOptionType(guestTokenRequester, 'function', 'guestTokenRequester');

    assertOption(
      refreshTokenWindowOffset,
      value => value === undefined || (typeof value === 'number' && value >= 0),
      'refreshTokenWindowOffset',
    );

    // Storage validations
    assertOption(
      storage,
      value => value === undefined || typeof value === 'object',
      'storage',
      (_, optionName) =>
        `Invalid value for option '${optionName}'. Must be either undefined or an object`,
    );

    if (storage) {
      assertOption(
        storage.provider,
        value =>
          value &&
          typeof value.getItem === 'function' &&
          typeof value.setItem === 'function' &&
          typeof value.removeItem === 'function',
        'storage.provider',
        (_, optionName) =>
          `Invalid value for option '${optionName}'. Make sure the value specified is an object implementing the Storage API.`,
      );

      assertOption(
        storage.serializer,
        value =>
          value &&
          typeof value.deserializeTokenData === 'function' &&
          typeof value.serializeTokenData === 'function',
        'storage.serializer',
        (_, optionName) =>
          `Invalid value for option '${optionName}'. Make sure the value specified contains the methods 'deserializeTokenData' and 'serializeTokenData'.`,
      );

      assertOption(
        storage.guestTokenStorageKey,
        value => value === undefined || typeof value === 'string',
        'storage.guestTokenStorageKey',
      );

      assertOption(
        storage.userTokenStorageKey,
        value => value === undefined || typeof value === 'string',
        'storage.userTokenStorageKey',
      );

      assertOption(
        storage.clientCredentialsTokenStorageKey,
        value => value === undefined || typeof value === 'string',
        'storage.clientCredentialsTokenStorageKey',
      );
    }

    assertOptionType(userTokenRequester, 'function', 'userTokenRequester');
  }

  /**
   * Applies the options and makes the call to the function that will install the axios
   * interceptors to the axios instance.
   *
   * @param {AxiosInstance} client - The axios instance to apply the interceptors to.
   * @param {object} options - The options object passed to the constructor.
   */
  applyOptions(client, options) {
    const {
      authorizationHeaderFormatter,
      guestTokenRequester,
      refreshTokenWindowOffset,
      storage,
      userTokenRequester,
      clientCredentialsTokenRequester,
    } = options;

    if (!isNil(refreshTokenWindowOffset)) {
      TokenData.REFRESH_TOKEN_WINDOW_OFFSET = refreshTokenWindowOffset;
    }

    this.authorizationHeaderFormatter = authorizationHeaderFormatter;
    this.axiosInstance = client;

    let storageProvider;
    let tokenDataSerializer;
    let guestTokenStorageKey;
    let userTokenStorageKey;
    let clientCredentialsTokenStorageKey;

    if (storage) {
      storageProvider = storage.provider;
      tokenDataSerializer = storage.serializer;
      guestTokenStorageKey = storage.guestTokenStorageKey;
      userTokenStorageKey = storage.userTokenStorageKey;
      clientCredentialsTokenStorageKey =
        storage.clientCredentialsTokenStorageKey;
    }

    // Not used right now but might be interesting for the future, so do not remove it.
    this.clientCredentialsTokenProvider = new ClientCredentialsTokenProvider(
      clientCredentialsTokenRequester,
      storageProvider,
      tokenDataSerializer,
      clientCredentialsTokenStorageKey,
    );

    this.clientCredentialsTokenProvider.addTokenChangesListener(
      this.clientCredentialsTokenChangesListener,
    );

    this.guestTokenProvider = new GuestTokenProvider(
      guestTokenRequester,
      storageProvider,
      tokenDataSerializer,
      guestTokenStorageKey,
    );

    this.guestTokenProvider.addTokenChangesListener(
      this.guestTokenChangesListener,
    );

    this.userTokenProvider = new UserTokenProvider(
      userTokenRequester,
      storageProvider,
      tokenDataSerializer,
      userTokenStorageKey,
    );

    this.userTokenProvider.addTokenChangesListener(
      this.userTokenChangesListener,
    );

    this.currentTokenProvider = null;

    this.installInterceptors();
  }

  /**
   * Installs the interceptors to the axios instance.
   */
  installInterceptors() {
    this.onBeforeRequestInterceptor =
      this.onBeforeRequestInterceptor.bind(this);

    this.onRequestFailedInterceptor =
      this.onRequestFailedInterceptor.bind(this);

    this.requestInterceptor = this.axiosInstance.interceptors.request.use(
      this.onBeforeRequestInterceptor,
      undefined,
    );

    this.responseInterceptor = this.axiosInstance.interceptors.response.use(
      undefined,
      this.onRequestFailedInterceptor,
    );
  }

  /**
   * Ejects the added intersectors from the axios instance.
   */
  ejectInterceptors() {
    this.axiosInstance.interceptors.request.eject(this.requestInterceptor);
    this.axiosInstance.interceptors.response.eject(this.responseInterceptor);
  }

  /**
   * Clears token data from memory and storage if provided.
   *
   * @returns {Promise} Promise that will finish when both the guest and user tokens data are cleared.
   */
  clearData() {
    const clearDataPromises = [
      this.guestTokenProvider.clearData(),
      this.userTokenProvider.clearData(),
    ];

    return Promise.all(clearDataPromises);
  }

  /**
   * Select the guest token provider as the current token provider.
   * Used when performing a logout.
   */
  selectGuestTokenProvider() {
    this.selectTokenProvider(this.guestTokenProvider);
  }

  /**
   * Switches the current token provider to the new one.
   * This method is used internally to switch the current token
   * provider context from guest to authenticated users and vice-versa.
   * Make sure you know what you are doing before calling this method yourself.
   *
   * @param {TokenProvider} newTokenProvider - The token provider instance to select.
   */
  selectTokenProvider(newTokenProvider) {
    if (this.currentTokenProvider !== newTokenProvider) {
      const previousTokenProvider = this.currentTokenProvider;
      this.currentTokenProvider = newTokenProvider;

      this.raiseOnActiveTokenDataChangedEvent();

      if (previousTokenProvider === this.userTokenProvider) {
        this.userTokenProvider.clearData();
      }
    }
  }

  /**
   * Gets the token from the current token provider.
   *
   * @returns {(object|null)} Returns the token data from the current token provider or null if there is not a current token provider.
   */
  getActiveToken() {
    if (!this.currentTokenProvider) {
      return null;
    }

    return {
      kind: this.currentTokenProvider.getSupportedTokenKind(),
      data: this.currentTokenProvider.getTokenData(),
    };
  }

  /**
   * Raises on active token data changed event.
   */
  raiseOnActiveTokenDataChangedEvent() {
    const activeToken = this.getActiveToken();

    if (typeof this.activeTokenDataChangedListener === 'function') {
      this.activeTokenDataChangedListener(activeToken);
    }
  }

  /**
   * Sets the context for guest tokens retrieval.
   *
   * @param {object} newContext - Properties to set on the guest token context.
   */
  setGuestTokensContext(newContext) {
    this.guestTokenProvider.setTokenContext(newContext);
  }

  /**
   * Resets the guest tokens context to the default one.
   */
  resetGuestTokensContext() {
    this.guestTokenProvider.resetTokenContext();
  }

  /**
   * Retrieves the current guest tokens context.
   *
   * @returns {object} The current guest tokens context.
   */
  getCurrentGuestTokensContext() {
    return this.guestTokenProvider.getTokenContext();
  }

  /**
   * Returns an access token from the current token provider.
   * If useCache is false, a new create access token request
   * will be made.
   *
   * @async
   * @param {boolean} useCache - Returns an access token from the cache if available, if not a new create access token request will be made.
   * @returns {Promise<string>} Promise that will resolve with a renewed or cached access token from the current provider. If the renew request fails, the promise will reject with the error.
   */
  async getAccessToken(useCache) {
    return await this.currentTokenProvider?.getAccessToken(useCache);
  }

  /**
   * Listener for client credentials token data changes.
   * Will raise an active token data changed event if it is the current token provider.
   */
  // Ignore coverage for client credentials token data changes as it was
  // scrapped. We will leave the code here if it is necessary in the future.
  /* istanbul ignore next */
  clientCredentialsTokenChangesListener = () => {
    if (this.currentTokenProvider === this.clientCredentialsTokenProvider) {
      this.raiseOnActiveTokenDataChangedEvent();
    }
  };

  /**
   * Listener for guest token data changes.
   * Will raise an active token data changed event if it is the current token provider.
   */
  guestTokenChangesListener = () => {
    if (this.currentTokenProvider === this.guestTokenProvider) {
      this.raiseOnActiveTokenDataChangedEvent();
    }
  };

  /**
   * Listener for user token data changes.
   * Will raise an active token data changed event if it is the current token provider.
   */
  userTokenChangesListener = () => {
    if (this.currentTokenProvider === this.userTokenProvider) {
      this.raiseOnActiveTokenDataChangedEvent();
    }
  };

  /**
   * Sets the active token data changed events listener.
   *
   * @param {Function} listener - The new listener to apply.
   */
  setActiveTokenDataChangedEventListener(listener) {
    this.activeTokenDataChangedListener = listener;
  }

  /**
   * Sets the user forced logout events listener.
   *
   * @param {Function} listener - The new listener to apply.
   */
  setUserSessionTerminatedEventListener(listener) {
    this.userSessionTerminatedEventListener = listener;
  }

  /**
   * Sets the user info to the correct token.
   * The token data received by invoking an endpoint that creates tokens
   * do not return a userId but we need a userId to associate the tokens
   * with in order to persist sessions.
   * This function must be called after the user data is retrieved for
   * an access token.
   *
   * @async
   * @param {object} userData - The user data obtained from the get profile endpoint.
   * @returns {Promise} Promise that will be resolved when the user info is set on the appropriate token provider instance.
   */
  async setUserInfo(userData) {
    if (!userData) {
      return;
    }

    const { id: userId, isGuest } = userData;

    if (!userId) {
      return;
    }

    if (isGuest) {
      await this.guestTokenProvider.setUserId(userId);
    } else {
      await this.userTokenProvider.setUserId(userId);
    }
  }

  /**
   * Loads all token providers and sets the current provider
   * to the either the user token provider if it can retrieve tokens
   * (i.e. It has a refresh token field) or the client credentials
   * token provider if not.
   *
   * @throws Will throw when the load operation failed.
   * @returns {Promise} Promise that will be resolved when the load method completes.
   */
  load() {
    if (this.isLoading) {
      return this.loadPromise;
    }

    if (this.isLoaded) {
      return this.loadPromise;
    }

    this.isLoaded = false;
    this.isLoading = true;
    this.loadError = null;

    const tokenProviders = [this.guestTokenProvider, this.userTokenProvider];

    const providerLoadPromises = tokenProviders.map(provider =>
      provider.load(),
    );

    this.loadPromise = Promise.all(providerLoadPromises).finally(() => {
      tokenProviders.forEach(provider => {
        if (
          !provider.canRetrieveTokens() &&
          provider !== this.userTokenProvider
        ) {
          this.isLoading = false;
          this.loadError = new MisconfiguredTokenProviderError(
            provider.getSupportedTokenKind(),
          );
          throw this.loadError;
        }
      });

      if (this.userTokenProvider.canRetrieveTokens()) {
        this.selectTokenProvider(this.userTokenProvider);
      } else {
        this.selectTokenProvider(this.guestTokenProvider);
      }

      this.isLoading = false;
      this.isLoaded = true;
    });

    return this.loadPromise;
  }

  /**
   * Checks if a request needs an access token from the axios request config object.
   * It does it by checking if:
   *  1 - The config object contains an access token property. If it does, then that access token will be used.
   *  2 - The config object contains a no authentication property. If it does, no access token will be added to the request. This is necessary on certain requests that do not need an access token.
   *  3 - The config object already contains an authorization header.
   *
   * @param {AxiosRequestConfig} config - Axios request config object.
   * @returns {boolean} If the request needs an acess token or not.
   */
  requestNeedsAccessTokenMatcher(config) {
    if (config[AuthenticationConfigOptions.AccessToken]) {
      return true;
    }

    if (config[AuthenticationConfigOptions.NoAuthentication]) {
      return false;
    }

    if (config.headers?.Authorization) {
      return false;
    }

    return true;
  }

  /**
   * Installed request fulfilled axios interceptor which will be called before every request that is dispatched.
   * Will add an access token if the request is flagged as needing it.
   *
   * @param {AxiosRequestConfig} config - Axios request config object.
   *
   * @async
   * @returns {Promise} Promise that will be resolved with the final config object.
   */
  async onBeforeRequestInterceptor(config) {
    const needsAuthentication = this.requestNeedsAccessTokenMatcher(config);

    if (needsAuthentication) {
      let accessToken;

      if (config[AuthenticationConfigOptions.AccessToken]) {
        accessToken = config[AuthenticationConfigOptions.AccessToken];
      } else {
        if (this.isLoading) {
          await this.loadPromise;
        }

        if (this.loadError) {
          throw this.loadError;
        }

        if (!this.isLoaded) {
          throw new TokenManagerNotLoadedException();
        }

        accessToken = await this.currentTokenProvider.getAccessToken();
      }

      config.headers.Authorization =
        this.authorizationHeaderFormatter(accessToken);

      const usedAccessTokenCallback =
        config[AuthenticationConfigOptions.UsedAccessTokenCallback];
      if (typeof usedAccessTokenCallback === 'function') {
        usedAccessTokenCallback(accessToken);
      }
    }

    return config;
  }

  /**
   * Called when the currently logged in user's refresh token
   * expires. Will set the guest token provider as the current
   * and raise the on user forced logout event.
   */
  forceLogout() {
    if (this.currentTokenProvider !== this.userTokenProvider) {
      return;
    }

    const expiredUserToken = this.getActiveToken();

    this.selectGuestTokenProvider();

    this.raiseOnUserSessionTerminatedEvent(expiredUserToken);
  }

  /**
   * Raises the user forced logout event.
   *
   * @param {(object|null)} expiredUserToken - The expired user token data.
   */
  raiseOnUserSessionTerminatedEvent(expiredUserToken) {
    if (typeof this.userSessionTerminatedEventListener === 'function') {
      this.userSessionTerminatedEventListener(expiredUserToken);
    }
  }

  /**
   * Response rejected axios interceptor which will be called after a request has failed.
   * This method will look for 401 errors and retry the original request one more time with a new access token.
   * If after that the method still fails, the original error will be returned to the caller.
   *
   * @param {AxiosError} error - Axios error object.
   *
   * @async
   * @returns {Promise} Promise that will be rejected with the original error if the retry for the 401 error was not successfull or resolved with the data from the request if the retry is successfull.
   */
  async onRequestFailedInterceptor(error) {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const { config } = error;

    if (!config._originalError) {
      config._originalError = error;
    }

    const responseStatus = error.response?.status;

    // Assume the refresh token expired if the response status is within the 400 range.
    // If not, throw a refresh access token error which will avoid the error recovery path and enter in a loop.
    if (config[AuthenticationConfigOptions.IsUserRefreshTokenRequest]) {
      if (responseStatus >= 400 && responseStatus < 500) {
        this.forceLogout();
        throw new UserSessionExpiredError(error);
      }

      throw new RefreshUserAccessTokenError(error);
    }

    // As guest tokens cannot be refreshed, just throw an error to identify
    // this case and not enter in the 401 error recovery path and enter in a loop.
    if (config[AuthenticationConfigOptions.IsGuestUserAccessTokenRequest]) {
      throw new RefreshGuestUserAccessTokenError(error);
    }

    // Ignore coverage for client credentials token request as it was
    // scrapped. We will leave the code here if it is necessary in the future.
    /* istanbul ignore next */
    if (config[AuthenticationConfigOptions.IsClientCredentialsTokenRequest]) {
      throw new RefreshClientCredentialsAccessTokenError(error);
    }

    // If the request failed with a 401 (this should happen only if the refresh token time window is
    // too low or the token was manually removed from the server), try to fetch a new access token and
    // , if successful, retry the request with the new access token obtained.
    // If the get access token request fails, throw the original request error to the caller.
    if (
      responseStatus === 401 &&
      !config.currentRetry &&
      !config[AuthenticationConfigOptions.AccessToken]
    ) {
      try {
        await this.currentTokenProvider.getAccessToken(false);
      } catch {
        throw config._originalError;
      }

      config.currentRetry = 1;

      const { baseURL, url, method } = config;
      // Remove the baseURL from the request url
      // to avoid axios re-appending it when requesting again.
      const requestUrl = getRequestUrlWithoutBase(baseURL, url);

      // Re-execute the request, which will be intercepted
      // by our interceptor and apply the header with the new access token
      // to the request.
      if (method === 'post' || method === 'put' || method === 'patch') {
        return this.axiosInstance[method](requestUrl, config.data, config);
      }

      // For requests that are not post/put/patch, we just need to invoke with url and config
      return this.axiosInstance[method](requestUrl, config);
    }

    return Promise.reject(error);
  }

  /**
   * Sets if the user token provider can persist user tokens on the storage.
   * Note: Guest tokens are always preserved, ignoring this value.
   *
   * @param {boolean} rememberMe
   */
  setRememberMe(rememberMe) {
    this.userTokenProvider.setCanSaveTokenData(rememberMe);
  }

  /**
   * Sets user token data and optionally switches the current token provider
   * to the user token provider.
   *
   * @param {object} tokenData - The new user token data.
   * @param {boolean} forceSwitch - If 'true' will switch the current token provider to the user token provider after setting the user token data.
   * @async
   * @returns {Promise} Promise that will be resolved when the token data is successfully applied to the user token provider and the switch to it is performed if forceSwitch parameter is true.
   */
  async setUserTokenData(tokenData, forceSwitch) {
    const newTokenData = new TokenData(tokenData);
    await this.userTokenProvider.setTokenData(newTokenData);

    if (forceSwitch) {
      this.selectTokenProvider(this.userTokenProvider);
    }
  }
}

export default AxiosAuthenticationTokenManager;
