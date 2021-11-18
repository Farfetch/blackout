import { AxiosInstance } from 'axios';
import { defaultAuthorizationHeaderFormatter } from './defaults';
import { postGuestTokens, postTokens } from '../../../../authentication/client';
import AxiosAuthenticationTokenManager from './AxiosAuthenticationTokenManager';

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
 * @param {AxiosInstance} client - The axios instance where to install the authentication interceptors.
 * @param {object} options - Options object to AxiosAuthenticationTokenManager constructor.
 *
 * @returns {AxiosAuthenticationTokenManager} An AxiosAuthenticationTokenManager instance which contains methods to eject the interceptors installed and clear token data.
 */
export default function setAxiosAuthenticationInterceptors(client, options) {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  return new AxiosAuthenticationTokenManager(client, finalOptions);
}
