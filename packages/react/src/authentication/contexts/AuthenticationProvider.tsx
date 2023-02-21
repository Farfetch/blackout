import {
  type AuthenticationTokenManager,
  type AxiosAuthenticationTokenManagerOptions,
  client,
  type TokenContext,
  type UserToken,
} from '@farfetch/blackout-client';
import { usePrevious } from '../../helpers';
import AuthenticationContext from './AuthenticationContext';
import React, {
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import setAuthenticationInterceptors from './helpers/setAuthenticationInterceptors';
import useUserAuthState from '../hooks/useUserAuthState';

export enum CallbackNames {
  OnUserSessionTerminated = 'onUserSessionTerminated',
}

interface Props extends AxiosAuthenticationTokenManagerOptions {
  baseURL: string;
  children: React.ReactNode;
  headers: { [k: string]: string };
  callbacks: {
    onUserSessionTerminated: (expiredUserToken: UserToken | null) => void;
  };
  storage: AxiosAuthenticationTokenManagerOptions['storage'];
}

/**
 * Provides support for transparent authentication to apps with access tokens by
 * installing an interceptor on the default \@farfetch/blackout-client axios
 * instance used by all clients. It also provides functions to login/logout a user
 * through the useAuthentication hook that must be called in order for the
 * interceptor to know when to use guest/authenticated user tokens for subsequent
 * requests. See the options below for more information on how you can configure
 * this provider.
 *
 * @example <caption>Adding the AuthenticationProvider to your app</caption>
 * ```
 *
 * import \{ AuthenticationProvider \} from '\@farfetch/blackout-react/authentication/contexts';
 *
 * const App = () =\> \{
 * return (<AuthenticationProvider><MyComponent /></AuthenticationProvider>);
 * \}
 * ```
 *
 * @param props - Props to configure AuthenticationProvider.
 *
 * @returns The authentication context provider element wrapping the passed in children.
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

  const [tokenManager] = useState(() => {
    const tokenManagerInstance = setAuthenticationInterceptors(
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
    (useCache: boolean) => {
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
    (expiredUserToken: UserToken | null) => {
      const onUserSessionTerminatedCallback =
        callbacks[CallbackNames.OnUserSessionTerminated];

      if (typeof onUserSessionTerminatedCallback === 'function') {
        onUserSessionTerminatedCallback(expiredUserToken);
      }
    },
    [callbacks],
  );

  const onActiveTokenChangedEventListener = useCallback(
    (newActiveTokenData: SetStateAction<UserToken | null>) => {
      setActiveTokenData(newActiveTokenData);
    },
    [],
  );

  const previousTokenManager: AuthenticationTokenManager | undefined =
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
