/* istanbul ignore file */
// The coverage for this file is ignored because client credentials flow was scrapped
// but it might be useful in the future, so we do not remove the implementation
// and only ignore coverage in tests.
import AuthenticationConfigOptions from '../AuthenticationConfigOptions';
import TokenData from './TokenData';
import TokenKinds from './TokenKinds';
import TokenProvider from './TokenProvider';
import type { AxiosResponse } from 'axios';
import type {
  ClientCredentialsTokenRequester,
  OptionsStorageProvider,
  OptionsStorageSerializer,
} from '../types/TokenManagerOptions.types';

export const DEFAULT_STORAGE_KEY = 'ClientCredentialsToken';

/**
 * Token provider for client credentials.
 */
class ClientCredentialsTokenProvider extends TokenProvider {
  requester: ClientCredentialsTokenRequester;
  tokenData: TokenData | null;
  storageProvider?: OptionsStorageProvider;
  /**
   * Creates a new ClientCredentialsTokenProvider instance.
   *
   * @param requester - A function that will be responsible to request new tokens. If async, the call will be awaited.
   * @param storageProvider - An object implementing the Storage API's methods getItem, setItem and removeItem. If those methods are async, the calls will be awaited.
   * @param tokenDataSerializer - An object implementing the serializeTokenData and deserializeTokenData methods. If storage provider is defined, tokenDataSerializer is required.
   * @param storageKey - The storage key that will be used on the calls to storageProvider's methods as the key argument. If not provided, a default will be used.
   */
  constructor(
    requester: ClientCredentialsTokenRequester,
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

    this.requester = requester;
    this.tokenData = null;
  }

  /**
   * Overrides TokenProvider's getSupportedTokenKind method.
   * Returns the kind of tokens that will be produced by this token provider.
   *
   * @override
   * @returns ClientCredentials token kind.
   */
  getSupportedTokenKind() {
    return TokenKinds.ClientCredentials;
  }

  /**
   * Overrides TokenProvider's getAccessToken method.
   * Will retrieve valid access token from either the cache or through the requester.
   *
   * @override
   *
   * @param useCache - If cache should be used or not.
   *
   * @returns Promise that will be resolved with a valid access token to be used.
   */
  getAccessToken(useCache = true) {
    if (
      !this.tokenData ||
      !this.tokenData.accessToken ||
      this.tokenData.needsRefresh() ||
      !useCache
    ) {
      let requestArgs;
      if (this.tokenData && this.tokenData.refreshToken) {
        requestArgs = {
          refreshToken: this.tokenData.refreshToken,
          grantType: 'refresh_token',
        };
      } else {
        requestArgs = {
          grantType: 'client_credentials',
        };
      }

      return this.requester(requestArgs, {
        [AuthenticationConfigOptions.NoAuthentication]: true,
        [AuthenticationConfigOptions.IsClientCredentialsTokenRequest]: true,
      }).then(async (response: AxiosResponse['data']) => {
        const responseTokenData = new TokenData(response);

        await this.setTokenData(responseTokenData);

        return this.tokenData?.accessToken;
      });
    }

    return Promise.resolve(this.tokenData.accessToken);
  }

  /**
   * Overrides TokenProvider's canRetrieveTokens method.
   * Will return true if there is a requester available and false otherwise.
   *
   * @override
   *
   * @returns - True if the instance is ready to retrieve tokens and false otherwise.
   */
  canRetrieveTokens() {
    return !!this.requester;
  }
}

export default ClientCredentialsTokenProvider;
