import { usePrevious } from '../../helpers';
import AuthenticationContext from './AuthenticationContext';
import AxiosAuthenticationTokenManager, {
  setAxiosAuthenticationInterceptors,
} from '@farfetch/blackout-client/helpers/client/interceptors/authentication';
import client from '@farfetch/blackout-client/helpers/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useUserAuthState from '../hooks/useUserAuthState';
import type { AxiosAuthenticationTokenManagerOptions } from '@farfetch/blackout-client/helpers/client/interceptors/authentication/types/TokenManagerOptions.types';
import type { TokenContext } from '@farfetch/blackout-client/helpers/client/interceptors/authentication/token-providers/types/TokenContext.types';
import type UserToken from '@farfetch/blackout-client/helpers/client/interceptors/authentication/types/UserToken.types';

export enum CallbackNames {
  OnUserSessionTerminated = 'onUserSessionTerminated',
}

interface Props extends AxiosAuthenticationTokenManagerOptions {
  baseURL: string;
  children: React.ReactNode;
  headers: { [k: string]: string };
  callbacks: {
    onUserSessionTerminated: (expiredUserToken: string) => void;
  };
  storage: AxiosAuthenticationTokenManagerOptions['storage'];
}

/**
 * Provides support for transparent authentication to apps with access tokens by installing
 * an interceptor on the default \@farfetch/blackout-client axios instance used by all clients. It also provides
 * functions to login/logout a user through the useAuthentication hook that must be called
 * in order for the interceptor to know when to use guest/authenticated user tokens
 * for subsequent requests. See the options below for more information on how you can configure this provider.
 *
 * @example <caption>Adding the AuthenticationProvider to your app</caption>
 *
 * import \{ AuthenticationProvider \} from '\@farfetch/blackout-react/authentication/contexts';
 *
 * const App = () =\> \{
 * return (<AuthenticationProvider><MyComponent /></AuthenticationProvider>);
 * \}
 * @param props - Props to configure AuthenticationProvider.
 *
 * @returns - The authentication context provider element wrapping the passed in children.
 */
function AuthenticationProvider({
  baseURL,
  children,
  headers,
  callbacks,
  ...tokenManagerOptions
}: Props) {
  const [activeTokenData, setActiveTokenData] = useState<UserToken | null>(
    null,
  );
  const baseURLRef = useRef<null | string>(null);
  const headersRef = useRef<null | { [k: string]: string }>(null);

  if (baseURLRef.current !== baseURL) {
    client.defaults.baseURL = baseURL;
    baseURLRef.current = baseURL;
  }

  if (headersRef.current !== headers) {
    client.defaults.headers.common = headers;
    headersRef.current = headers;
  }

  const invokeCallback = useCallback(
    (callbackName: CallbackNames, expiredUserToken: string) => {
      /* istanbul ignore else */
      if (callbacks && typeof callbacks[callbackName] === 'function') {
        callbacks[callbackName](expiredUserToken);
      }
    },
    [callbacks],
  );

  const [tokenManager] = useState(() => {
    const tokenManagerInstance = setAxiosAuthenticationInterceptors(
      client,
      tokenManagerOptions,
    );

    return tokenManagerInstance;
  });

  const authState = useUserAuthState({ activeTokenData, tokenManager });

  const clearTokenData = useCallback(() => {
    tokenManager.clearData();
  }, [tokenManager]);

  const setGuestTokensContext = useCallback(
    (context: TokenContext) => {
      tokenManager.setGuestTokensContext(context);
    },
    [tokenManager],
  );

  const resetGuestTokensContext = useCallback(() => {
    tokenManager.resetGuestTokensContext();
  }, [tokenManager]);

  const getCurrentGuestTokensContext = useCallback((): TokenContext => {
    return tokenManager.getCurrentGuestTokensContext();
  }, [tokenManager]);

  const getAccessToken = useCallback(
    useCache => {
      return tokenManager.getAccessToken(useCache);
    },
    [tokenManager],
  );

  const setGuestUserClaims = useCallback(
    async (claims: TokenContext, useCache: boolean) => {
      await tokenManager.setGuestTokensContext(claims);
      return tokenManager.getAccessToken(useCache);
    },
    [tokenManager],
  );

  const onUserSessionTerminatedEventListener = useCallback(
    expiredUserToken => {
      invokeCallback(CallbackNames.OnUserSessionTerminated, expiredUserToken);
    },
    [invokeCallback],
  );

  const onActiveTokenChangedEventListener = useCallback(newActiveTokenData => {
    setActiveTokenData(newActiveTokenData);
  }, []);

  const previousTokenManager: AxiosAuthenticationTokenManager =
    usePrevious(tokenManager);

  useEffect(() => {
    if (previousTokenManager === tokenManager) {
      return;
    }

    if (!!previousTokenManager) {
      previousTokenManager.setActiveTokenDataChangedEventListener(null);
      previousTokenManager.setUserSessionTerminatedEventListener(null);
    }

    if (tokenManager) {
      tokenManager.setActiveTokenDataChangedEventListener(
        onActiveTokenChangedEventListener,
      );

      tokenManager.setUserSessionTerminatedEventListener(
        onUserSessionTerminatedEventListener,
      );

      if (!tokenManager.isLoaded) {
        tokenManager.load();
      }
    }
  }, [
    onActiveTokenChangedEventListener,
    onUserSessionTerminatedEventListener,
    previousTokenManager,
    tokenManager,
  ]);

  const values = {
    activeTokenData,
    clearTokenData,
    getAccessToken,
    getCurrentGuestTokensContext,
    resetGuestTokensContext,
    setGuestTokensContext,
    setGuestUserClaims,
    tokenManager, // Remove tokenManager when the post guestTokens endpoint returns the userId in the response
    ...authState,
  };

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
