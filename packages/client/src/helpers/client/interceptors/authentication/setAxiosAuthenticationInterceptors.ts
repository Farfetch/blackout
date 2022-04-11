import { defaultAuthorizationHeaderFormatter } from './defaults';
import { postGuestTokens, postTokens } from '../../../../authentication';
import AxiosAuthenticationTokenManager from './AxiosAuthenticationTokenManager';
import type { AxiosAuthenticationTokenManagerOptions } from './types/TokenManagerOptions.types';
import type { AxiosInstance } from 'axios';

const defaultOptions = {
  authorizationHeaderFormatter: defaultAuthorizationHeaderFormatter,
  guestTokenRequester: postGuestTokens,
  userTokenRequester: postTokens,
  clientCredentialsTokenRequester: postTokens,
};

/**
 * Installs the authentication axios interceptors on the passed in client by instantiating a new AxiosAuthenticationTokenManager
 * instance with some defaults, merged with the caller's options argument. The properties specified on
 * the passed in options object will override the default values.
 *
 * @see AxiosAuthenticationTokenManager constructor for more information about the available options.
 *
 * @param client - The axios instance where to install the authentication interceptors.
 * @param options - Options object to AxiosAuthenticationTokenManager constructor.
 *
 * @returns An AxiosAuthenticationTokenManager instance which contains methods to eject the interceptors installed and clear token data.
 */
export default function setAxiosAuthenticationInterceptors(
  client: AxiosInstance,
  options: AxiosAuthenticationTokenManagerOptions,
): AxiosAuthenticationTokenManager {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  return new AxiosAuthenticationTokenManager(client, finalOptions);
}
