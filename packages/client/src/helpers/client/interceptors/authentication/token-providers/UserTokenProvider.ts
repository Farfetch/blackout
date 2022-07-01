import AuthenticationConfigOptions from '../AuthenticationConfigOptions';
import TokenData from './TokenData';
import TokenKinds from './TokenKinds';
import TokenProvider from './TokenProvider';
import type { ITokenData } from './types';
import type {
  OptionsStorageProvider,
  OptionsStorageSerializer,
  UserTokenRequester,
} from '../types/TokenManagerOptions.types';

export const DEFAULT_STORAGE_KEY = 'UserToken';

/**
 * Token provider for authenticated users.
 */
class UserTokenProvider extends TokenProvider {
  currentGetAccessTokenPromise: Promise<string | undefined> | null;
  /**
   * Creates a new UserTokenProvider instance.
   *
   * @param requester           - A function that will be responsible to request new tokens. If async,
   *                              the call will be awaited.
   * @param storageProvider     - An object implementing the Storage API's methods getItem, setItem and
   *                              removeItem. If those methods are async, the calls will be awaited.
   * @param tokenDataSerializer - An object implementing the serializeTokenData and deserializeTokenData
   *                              methods. If storage provider is defined, tokenDataSerializer is
   *                              required.
   * @param storageKey          - The storage key that will be used on the calls to storageProvider's
   *                              methods as the key argument. If not provided, a default will be used.
   */
  constructor(
    requester: UserTokenRequester,
    storageProvider?: OptionsStorageProvider,
    tokenDataSerializer?: OptionsStorageSerializer,
    storageKey?: string,
  ) {
    super(
      requester,
      storageProvider,
      tokenDataSerializer,
      storageKey || DEFAULT_STORAGE_KEY,
    );

    this.currentGetAccessTokenPromise = null;
  }

  /**
   * Overrides TokenProvider's getSupportedTokenKind method. Returns the kind of
   * tokens that will be produced by this token provider.
   *
   * @returns User token kind.
   */
  override getSupportedTokenKind(): TokenKinds {
    return TokenKinds.User;
  }

  /**
   * Overrides TokenProvider's getAccessToken method. Will retrieve valid access
   * token from either the cache or through the requester.
   *
   * @param useCache - If cache should be used or not.
   *
   * @returns Promise that will be resolved with a valid access token to be used.
   */
  override getAccessToken(useCache = true): Promise<string | undefined> {
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

      this.currentGetAccessTokenPromise = this.requester(
        {
          refreshToken: this.tokenData?.refreshToken,
          grantType: 'refresh_token',
        },
        {
          [AuthenticationConfigOptions.NoAuthentication]: true,
          [AuthenticationConfigOptions.IsUserRefreshTokenRequest]: true,
        },
      ).then(
        async (response: ITokenData) => {
          this.currentGetAccessTokenPromise = null;

          const responseTokenData = new TokenData(response);

          if (!responseTokenData.userId && this.userId) {
            responseTokenData.userId = this.userId;
          }

          await this.setTokenData(responseTokenData);

          return this.tokenData?.accessToken;
        },
        error => {
          // Clear current get access token promise
          this.currentGetAccessTokenPromise = null;

          return Promise.reject(error);
        },
      );

      return this.currentGetAccessTokenPromise;
    }

    return Promise.resolve(this.tokenData.accessToken);
  }

  /**
   * Overrides TokenProvider's canRetrieveTokens method. Will return true if there is
   * a refresh token and a requester available and false otherwise.
   *
   * @returns - True if the instance is ready to retrieve tokens and false otherwise.
   */
  override canRetrieveTokens() {
    return !!this.tokenData?.refreshToken && !!this.requester;
  }
}

export default UserTokenProvider;
