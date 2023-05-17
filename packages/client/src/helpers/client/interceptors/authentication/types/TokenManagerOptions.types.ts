import type { ITokenData } from '../token-providers/types/TokenData.types.js';
import type { RequestConfig } from './AuthenticationTokenManager.types.js';
import type { TokenContext } from '../token-providers/types/TokenContext.types.js';

export type OptionsStorageProvider = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

export type OptionsStorageSerializer = {
  serializeTokenData(tokenData: ITokenData | null): string;
  deserializeTokenData(rawData: string): ITokenData;
};

export type UserParams = {
  username?: string;
  password?: string;
  grantType?: string;
  refreshToken?: string;
};

// This type is not used right now
type ClientCredentialsParams = {
  username?: string;
  password?: string;
  grantType?: string;
  refreshToken?: string;
};

export type GuestTokenRequester = (
  data: TokenContext,
  config?: Partial<RequestConfig>,
) => Promise<ITokenData>;

export type UserTokenRequester = (
  data: UserParams,
  config?: Partial<RequestConfig>,
) => Promise<ITokenData>;

// This type is not used right now
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ClientCredentialsTokenRequester = (
  data: ClientCredentialsParams,
  config?: RequestConfig,
) => Promise<ITokenData>;

type Headers = {
  'Accept-Language'?: string;
  'FF-Country'?: string;
  'FF-Currency'?: string;
  'x-api-key'?: string;
} & Record<string, string>;

export type AxiosAuthenticationTokenManagerOptions = {
  storage?: {
    provider: OptionsStorageProvider;
    serializer: OptionsStorageSerializer;
    guestTokenStorageKey?: string;
    userTokenStorageKey?: string;
  };
  baseUrl?: string;
  callBacks?: {
    onUserSessionTerminated(expiredUserToken: string): void;
  };
  headers?: Headers;
  authorizationHeaderFormatter: (accessToken?: string) => string | null;
  guestTokenRequester: GuestTokenRequester;
  userTokenRequester: UserTokenRequester;
  refreshTokenWindowOffset: number;
};
