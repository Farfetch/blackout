import {
  AuthenticationTokenManager,
  AxiosAuthenticationTokenManagerOptions,
  defaultAuthorizationHeaderFormatter,
  postGuestToken,
  postToken,
} from '@farfetch/blackout-client';
import type { AxiosInstance } from 'axios';

const defaultOptions = {
  authorizationHeaderFormatter: defaultAuthorizationHeaderFormatter,
  guestTokenRequester: postGuestToken,
  userTokenRequester: postToken,
  clientCredentialsTokenRequester: postToken,
};

/**
 * Installs the authentication axios interceptors on the passed in client by
 * instantiating a new AuthenticationTokenManager instance with some defaults,
 * merged with the caller's options argument. The properties specified on the
 * passed in options object will override the default values.
 *
 * @see AuthenticationTokenManager constructor for more information about the available options.
 *
 * @param client  - The axios instance where to install the authentication interceptors.
 * @param options - Options object to AuthenticationTokenManager constructor.
 *
 * @returns An AuthenticationTokenManager instance which contains methods to eject the
 * interceptors installed and clear token data.
 */
export default function setAuthenticationInterceptors(
  client: AxiosInstance,
  options: AxiosAuthenticationTokenManagerOptions,
): AuthenticationTokenManager {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  return new AuthenticationTokenManager(client, finalOptions);
}
