import {
  assertOption,
  assertOptionType,
  getRequestUrlWithoutBase,
} from './utils.js';
import {
  GuestTokenProvider,
  TokenData,
  type TokenKinds,
  UserTokenProvider,
} from './token-providers/index.js';
import { isNil } from 'lodash-es';
import {
  MisconfiguredTokenProviderError,
  RefreshClientCredentialsAccessTokenError,
  RefreshGuestUserAccessTokenError,
  RefreshUserAccessTokenError,
  TokenManagerNotLoadedException,
  UserSessionExpiredError,
} from './errors.js';
import AuthenticationConfigOptions from './AuthenticationConfigOptions.js';
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import type {
  AxiosAuthenticationTokenManagerOptions,
  OptionsStorageProvider,
  OptionsStorageSerializer,
} from './types/TokenManagerOptions.types.js';
import type { ITokenData } from './token-providers/types/TokenData.types.js';
import type { RequestConfig } from './types/AuthenticationTokenManager.types.js';
import type { TokenContext } from './token-providers/types/TokenContext.types.js';
import type { UserToken } from './types/index.js';

type TokenDataChangedListener = (
  activeToken: { kind: TokenKinds; data: ITokenData | null } | null,
) => void;

type UserSessionTerminatedEventListener = (value: UserToken | null) => void;

/**
 * Class responsible for installing an axios interceptor which will manage
 * authentication of any requests that require it with the correct access token
 * type (user or guest).
 */
class AuthenticationTokenManager {
  activeTokenDataChangedListener: TokenDataChangedListener | null;
  authorizationHeaderFormatter!: AxiosAuthenticationTokenManagerOptions['authorizationHeaderFormatter'];
  axiosInstance!: AxiosInstance;
  currentTokenProvider: UserTokenProvider | GuestTokenProvider | null;
  guestTokenProvider!: GuestTokenProvider;
  isLoaded: boolean;
  isLoading: boolean;
  loadError: MisconfiguredTokenProviderError | null;
  loadPromise: Promise<unknown> | null;
  requestInterceptor!: number;
  responseInterceptor!: number;
  userSessionTerminatedEventListener: UserSessionTerminatedEventListener | null;
  userTokenProvider!: UserTokenProvider;
  /**
   * @param client  - The axios instance to apply the interceptors to.
   * @param options - Options to configure this instance.
   */
  constructor(
    client: AxiosInstance,
    options: AxiosAuthenticationTokenManagerOptions,
  ) {
    this.activeTokenDataChangedListener = null;
    this.currentTokenProvider = null;
    this.isLoaded = false;
    this.isLoading = false;
    this.loadError = null;
    this.loadPromise = null;
    this.userSessionTerminatedEventListener = null;
    this.initialize(client, options);
  }

  /**
   * Initializes the instance with the passed in options by validating them first and
   * then applying them.
   *
   * @param client  - The axios instance to apply the interceptors to.
   * @param options - The options object passed to the constructor.
   */
  initialize(
    client: AxiosInstance,
    options: AxiosAuthenticationTokenManagerOptions,
  ) {
    this.validateOptions(client, options);

    this.applyOptions(client, options);
  }

  /**
   * Validates the passed options.
   *
   * @throws
   * Will throw an error if an option does not contain a valid value.
   *
   * @param client  - The axios instance to apply the interceptors to.
   * @param options - The options object passed to the constructor.
   */
  validateOptions(
    client: AxiosInstance,
    options: AxiosAuthenticationTokenManagerOptions,
  ) {
    if (!client) {
      throw new TypeError(
        "Missing 'client' parameter to 'AuthenticationTokenManager' constructor call",
      );
    }

    if (!options) {
      throw new TypeError(
        "Missing 'options' parameter to 'AuthenticationTokenManager' constructor call",
      );
    }

    const {
      authorizationHeaderFormatter,
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
      (value: AxiosInstance) =>
        value &&
        typeof value.interceptors === 'object' &&
        value.interceptors !== null,
      'client',
    );

    assertOptionType(guestTokenRequester, 'function', 'guestTokenRequester');

    assertOption(
      refreshTokenWindowOffset,
      (
        value: AxiosAuthenticationTokenManagerOptions['refreshTokenWindowOffset'],
      ) => value === undefined || (typeof value === 'number' && value >= 0),
      'refreshTokenWindowOffset',
    );

    // Storage validations
    assertOption(
      storage,
      (value: Storage) => value === undefined || typeof value === 'object',
      'storage',
      (_: string, optionName: string) =>
        `Invalid value for option '${optionName}'. Must be either undefined or an object`,
    );

    if (storage) {
      assertOption(
        storage.provider,
        (value: OptionsStorageProvider) =>
          value &&
          typeof value.getItem === 'function' &&
          typeof value.setItem === 'function' &&
          typeof value.removeItem === 'function',
        'storage.provider',
        (_: string, optionName: string) =>
          `Invalid value for option '${optionName}'. Make sure the value specified is an object implementing the Storage API.`,
      );

      assertOption(
        storage.serializer,
        (value: OptionsStorageSerializer) =>
          value &&
          typeof value.deserializeTokenData === 'function' &&
          typeof value.serializeTokenData === 'function',
        'storage.serializer',
        (_: string, optionName: string) =>
          `Invalid value for option '${optionName}'. Make sure the value specified contains the methods 'deserializeTokenData' and 'serializeTokenData'.`,
      );

      assertOption(
        storage.guestTokenStorageKey,
        (value?: string) => value === undefined || typeof value === 'string',
        'storage.guestTokenStorageKey',
      );

      assertOption(
        storage.userTokenStorageKey,
        (value?: string) => value === undefined || typeof value === 'string',
        'storage.userTokenStorageKey',
      );
    }

    assertOptionType(userTokenRequester, 'function', 'userTokenRequester');
  }

  /**
   * Applies the options and makes the call to the function that will install the
   * axios interceptors to the axios instance.
   *
   * @param client  - The axios instance to apply the interceptors to.
   * @param options - The options object passed to the constructor.
   */
  applyOptions(
    client: AxiosInstance,
    options: AxiosAuthenticationTokenManagerOptions,
  ) {
    const {
      authorizationHeaderFormatter,
      guestTokenRequester,
      refreshTokenWindowOffset,
      storage,
      userTokenRequester,
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

    if (storage) {
      storageProvider = storage.provider;
      tokenDataSerializer = storage.serializer;
      guestTokenStorageKey = storage.guestTokenStorageKey;
      userTokenStorageKey = storage.userTokenStorageKey;
    }

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

    this.onRequestSuccessfulInterceptor =
      this.onRequestSuccessfulInterceptor.bind(this);

    this.requestInterceptor = this.axiosInstance.interceptors.request.use(
      this.onBeforeRequestInterceptor,
      undefined,
    );

    this.responseInterceptor = this.axiosInstance.interceptors.response.use(
      this.onRequestSuccessfulInterceptor,
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
   * @returns Promise that will finish when both the guest and user tokens data are cleared.
   */
  clearData() {
    const clearDataPromises = [
      this.guestTokenProvider.clearData(),
      this.userTokenProvider.clearData(),
    ];

    return Promise.all(clearDataPromises);
  }

  /**
   * Select the guest token provider as the current token provider. Used when
   * performing a logout.
   */
  selectGuestTokenProvider() {
    this.selectTokenProvider(this.guestTokenProvider);
  }

  /**
   * Switches the current token provider to the new one. This method is used
   * internally to switch the current token provider context from guest to
   * authenticated users and vice-versa. Make sure you know what you are doing before
   * calling this method yourself.
   *
   * @param newTokenProvider - The token provider instance to select.
   */
  selectTokenProvider(
    newTokenProvider: UserTokenProvider | GuestTokenProvider,
  ) {
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
   * @returns Returns the token data from the current token provider or null if there is not a current
   * token provider.
   */
  getActiveToken(): UserToken | null {
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
   * @param newContext - Properties to set on the guest token context.
   */
  setGuestTokensContext(newContext: TokenContext) {
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
   * @returns The current guest tokens context.
   */
  getCurrentGuestTokensContext(): TokenContext {
    return this.guestTokenProvider.getTokenContext();
  }

  /**
   * Returns an access token from the current token provider. If useCache is false, a
   * new create access token request will be made.
   *
   * @param useCache - Returns an access token from the cache if available, if not a new create access
   *                   token request will be made.
   *
   * @returns Promise that will resolve with a renewed or cached access token from the current provider.
   * If the renew request fails, the promise will reject with the error.
   */
  async getAccessToken(useCache = true) {
    return await this.currentTokenProvider?.getAccessToken(useCache);
  }

  /**
   * Listener for guest token data changes. Will raise an active token data changed
   * event if it is the current token provider.
   */
  guestTokenChangesListener = () => {
    if (this.currentTokenProvider === this.guestTokenProvider) {
      this.raiseOnActiveTokenDataChangedEvent();
    }
  };

  /**
   * Listener for user token data changes. Will raise an active token data changed
   * event if it is the current token provider.
   */
  userTokenChangesListener = () => {
    if (this.currentTokenProvider === this.userTokenProvider) {
      this.raiseOnActiveTokenDataChangedEvent();
    }
  };

  /**
   * Sets the active token data changed events listener.
   *
   * @param listener - The new listener to apply.
   */
  setActiveTokenDataChangedEventListener(
    listener: TokenDataChangedListener | null,
  ) {
    this.activeTokenDataChangedListener = listener;
  }

  /**
   * Sets the user forced logout events listener.
   *
   * @param listener - The new listener to apply.
   */
  setUserSessionTerminatedEventListener(
    listener: UserSessionTerminatedEventListener | null,
  ) {
    this.userSessionTerminatedEventListener = listener;
  }

  /**
   * Sets the user info to the correct token. The token data received by invoking an
   * endpoint that creates tokens do not return a userId but we need a userId to
   * associate the tokens with in order to persist sessions. This function must be
   * called after the user data is retrieved for an access token.
   *
   * @param userData - The user data obtained from the get profile endpoint.
   *
   * @returns Promise that will be resolved when the user info is set on the appropriate token provider
   * instance.
   */
  async setUserInfo(userData: { id: number; isGuest: boolean } | null) {
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
   * Loads all token providers and sets the current provider to the either the user
   * token provider if it can retrieve tokens (i.e. It has a refresh token field) or
   * the client credentials token provider if not.
   *
   * @throws
   * MisconfiguredTokenProviderError.
   *
   * @returns Promise that will be resolved when the load method completes.
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
   * It does it by checking if: 1 - The config object contains an access token
   * property. If it does, then that access token will be used. 2 - The config object
   * contains a no authentication property. If it does, no access token will be added
   * to the request. This is necessary on certain requests that do not need an access
   * token. 3 - The config object already contains an authorization header.
   *
   * @param config - Axios request config object.
   *
   * @returns If the request needs an access token or not.
   */
  requestNeedsAccessTokenMatcher(config: RequestConfig) {
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
   * Installed request fulfilled axios interceptor which will be called before every
   * request that is dispatched. Will add an access token if the request is flagged
   * as needing it.
   *
   * @param config - Axios request config object.
   *
   * @returns Promise that will be resolved with the final config object.
   */
  async onBeforeRequestInterceptor(config: InternalAxiosRequestConfig) {
    const configAsRequestConfig = config as RequestConfig;
    const needsAuthentication = this.requestNeedsAccessTokenMatcher(
      configAsRequestConfig,
    );

    configAsRequestConfig[AuthenticationConfigOptions.NeedsAuthentication] =
      needsAuthentication;

    if (needsAuthentication) {
      let accessToken;

      if (configAsRequestConfig[AuthenticationConfigOptions.AccessToken]) {
        accessToken =
          configAsRequestConfig[AuthenticationConfigOptions.AccessToken];
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

        if (
          !configAsRequestConfig[
            AuthenticationConfigOptions.UsedAccessTokenKind
          ]
        ) {
          configAsRequestConfig[
            AuthenticationConfigOptions.UsedAccessTokenKind
          ] = this.currentTokenProvider?.getSupportedTokenKind();
        }

        accessToken = await this.currentTokenProvider?.getAccessToken();
      }

      (
        configAsRequestConfig as InternalAxiosRequestConfig
      ).headers.Authorization = this.authorizationHeaderFormatter(accessToken);

      configAsRequestConfig[AuthenticationConfigOptions.UsedAccessToken] =
        accessToken;

      const usedAccessTokenCallback =
        configAsRequestConfig[
          AuthenticationConfigOptions.UsedAccessTokenCallback
        ];

      if (typeof usedAccessTokenCallback === 'function') {
        usedAccessTokenCallback(accessToken);
      }
    }

    return configAsRequestConfig as InternalAxiosRequestConfig;
  }

  /**
   * Called when the currently logged in user's refresh token expires. Will set the
   * guest token provider as the current and raise the on user forced logout event.
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
   * @param expiredUserToken - The expired user token data.
   */
  raiseOnUserSessionTerminatedEvent(expiredUserToken: UserToken | null) {
    if (typeof this.userSessionTerminatedEventListener === 'function') {
      this.userSessionTerminatedEventListener(expiredUserToken);
    }
  }

  async onRequestSuccessfulInterceptor(result: AxiosResponse) {
    const { config } = result;
    const configAsRequestConfig = config as RequestConfig;

    if (
      configAsRequestConfig[AuthenticationConfigOptions.IsGetUserProfileRequest]
    ) {
      // HACK: On a get profile request success response, we need to retrieve the user id
      //       from the response and set it on the current token provider, so that it can
      //       be persisted on the storage and reused later. This should be addressed by
      //       the server-side on the tokens/guestTokens endpoints, that could reply with the user id
      //       associated with the access token.
      await this.setUserInfo(result.data);
    } else if (
      configAsRequestConfig[AuthenticationConfigOptions.IsLoginRequest]
    ) {
      // On a login successful request, set user token data and change the tokens context
      // to authenticated user context.
      await this.setUserTokenData(result.data, true);
    } else if (
      configAsRequestConfig[AuthenticationConfigOptions.IsLogoutRequest]
    ) {
      // On a logout successful request, change the tokens context to
      // guest user context.
      this.selectGuestTokenProvider();
    }

    return result;
  }

  /**
   * Response rejected axios interceptor which will be called after a request has
   * failed. This method will look for 401 errors and retry the original request one
   * more time with a new access token. If after that the method still fails, the
   * original error will be returned to the caller.
   *
   * @param error - Axios error object.
   *
   * @returns Promise that will be rejected with the original error if the retry for the 401 error was
   * not successful or resolved with the data from the request if the retry is successful.
   */
  // Due to a bug with axios' types, we had to change the output of this function
  // to `Promise<unknown>` to avoid having a typescript
  async onRequestFailedInterceptor(error: AxiosError): Promise<unknown> {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const { config } = error;

    if (!config) {
      return Promise.reject(error);
    }

    const configAsRequestConfig = config as RequestConfig;
    const responseStatus = error.response?.status;
    let forceRetry = false;

    // Assume the refresh token expired if the response status is within the 400 range.
    // If not, throw a refresh access token error which will avoid the error recovery path and enter in a loop.
    if (
      configAsRequestConfig[
        AuthenticationConfigOptions.IsUserRefreshTokenRequest
      ]
    ) {
      if (responseStatus && responseStatus >= 400 && responseStatus < 500) {
        this.forceLogout();
        throw new UserSessionExpiredError(error);
      }

      throw new RefreshUserAccessTokenError(error);
    }

    if (
      configAsRequestConfig[
        AuthenticationConfigOptions.IsGuestUserAccessTokenRequest
      ]
    ) {
      throw new RefreshGuestUserAccessTokenError(error);
    }

    // Ignore coverage for client credentials token request as it was
    // scrapped. We will leave the code here if it is necessary in the future.
    /* istanbul ignore next */
    if (
      configAsRequestConfig[
        AuthenticationConfigOptions.IsClientCredentialsTokenRequest
      ]
    ) {
      throw new RefreshClientCredentialsAccessTokenError(error);
    }

    // If it is a delete token request (i.e. a logout) and the token is not found
    // return success. The token might already have been deleted.
    if (
      configAsRequestConfig[AuthenticationConfigOptions.IsLogoutRequest] &&
      ((responseStatus === 400 &&
        error.response?.data?.errors?.[0]?.code === '17') ||
        responseStatus === 404)
    ) {
      this.selectGuestTokenProvider();

      // Return a 200 response in this case
      return Promise.resolve({
        ...error.response,
        status: 200,
      });
    }

    const needsAuthentication =
      configAsRequestConfig[AuthenticationConfigOptions.NeedsAuthentication];

    if (!needsAuthentication) {
      return Promise.reject(error);
    }

    const usedAccessTokenKind =
      configAsRequestConfig[AuthenticationConfigOptions.UsedAccessTokenKind];

    if (
      usedAccessTokenKind !== this.currentTokenProvider?.getSupportedTokenKind()
    ) {
      return Promise.reject(error);
    }

    const usedAccessToken =
      configAsRequestConfig[AuthenticationConfigOptions.UsedAccessToken];

    // HACK: Temporary fix to the case where the guest user id expired
    // although we got a valid user token for it. This will be fixed
    // on server-side later. So, we set the user id to null, set the forceRetry
    // flag to true and let the retry get access token code give it a go.
    // this.guestTokenProvider.clearData();
    if (
      configAsRequestConfig[
        AuthenticationConfigOptions.IsGetUserProfileRequest
      ] &&
      responseStatus === 400
    ) {
      const guestTokenData = this.guestTokenProvider.getTokenData();

      // If the request access token is equal to the current guest token
      // and the user id is set, refresh the guest token data as the guest user
      // might have expired.
      if (
        usedAccessToken === guestTokenData?.accessToken &&
        guestTokenData?.userId
      ) {
        try {
          await this.guestTokenProvider.clearData();
        } catch (e) {
          // Just log this error, it is not critical to stop the retry process
          console.log(
            '[Error]: An error occurred when trying to clear guest token data: ',
            e,
          );
        }

        forceRetry = true;
      }
    }

    // If the request failed with a 401 (this should happen only if the refresh token time window is
    // too low or the token was manually removed from the server), try to fetch a new access token and
    // ,if successful, retry the request with the new access token obtained.
    // If the get access token request fails, throw the original request error to the caller.
    if (
      (responseStatus === 401 || forceRetry) &&
      !configAsRequestConfig.currentRetry &&
      !configAsRequestConfig[AuthenticationConfigOptions.AccessToken]
    ) {
      try {
        const currentAccessToken =
          this.currentTokenProvider?.getTokenData()?.accessToken;

        const hasToRefreshToken =
          usedAccessToken &&
          currentAccessToken &&
          usedAccessToken === currentAccessToken;

        if (hasToRefreshToken) {
          await this.currentTokenProvider?.invalidateCurrentAccessToken();
        }
      } catch {
        throw error;
      }

      configAsRequestConfig.currentRetry = 1;

      // Clear used access token values of the request so they can be
      // refreshed.
      delete (configAsRequestConfig as InternalAxiosRequestConfig).headers
        .Authorization;
      delete configAsRequestConfig[AuthenticationConfigOptions.UsedAccessToken];
      delete configAsRequestConfig[
        AuthenticationConfigOptions.NeedsAuthentication
      ];

      const { baseURL, url, method } = config;
      // Remove the baseURL from the request url
      // to avoid axios re-appending it when requesting again.
      const requestUrl = getRequestUrlWithoutBase(url, baseURL);
      // According to the AxiosRequestConfig declaration the methods could be uppercased
      // making the rest of the code useless since AxiosInstance only accepts lowered case
      // methods.
      const loweredCaseMethod = method?.toLowerCase();

      // Re-execute the request, which will be intercepted
      // by our interceptor and apply the header with the new access token
      // to the request.
      if (
        loweredCaseMethod === 'post' ||
        loweredCaseMethod === 'put' ||
        loweredCaseMethod === 'patch'
      ) {
        return (
          loweredCaseMethod &&
          this.axiosInstance[loweredCaseMethod](requestUrl, config.data, config)
        );
      } else if (
        loweredCaseMethod === 'get' ||
        loweredCaseMethod === 'delete' ||
        loweredCaseMethod === 'head' ||
        loweredCaseMethod === 'options'
      ) {
        // For requests that are not post/put/patch, we just need to invoke with url and config
        return (
          loweredCaseMethod &&
          this.axiosInstance[loweredCaseMethod](requestUrl, config)
        );
      }
    }

    return Promise.reject(error);
  }

  /**
   * Sets if the user token provider can persist user tokens on the storage. Note:
   * Guest tokens are always preserved, ignoring this value.
   *
   * @param rememberMe - The new remember me value.
   */
  setRememberMe(rememberMe: boolean) {
    this.userTokenProvider.setCanSaveTokenData(rememberMe);
  }

  /**
   * Sets user token data and optionally switches the current token provider to the
   * user token provider.
   *
   * @param tokenData   - The new user token data.
   * @param forceSwitch - If 'true' will switch the current token provider to the user token provider
   *                      after setting the user token data.
   *
   * @returns Promise that will be resolved when the token data is successfully applied to the user token
   * provider and the switch to it is performed if forceSwitch parameter is true.
   */
  async setUserTokenData(tokenData: TokenData, forceSwitch: boolean) {
    const newTokenData = new TokenData(tokenData);

    await this.userTokenProvider.setTokenData(newTokenData);

    if (forceSwitch) {
      this.selectTokenProvider(this.userTokenProvider);
    }
  }
}

export default AuthenticationTokenManager;
