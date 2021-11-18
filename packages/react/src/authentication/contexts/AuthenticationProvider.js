import { setAxiosAuthenticationInterceptors } from '@farfetch/blackout-core/helpers/client/interceptors/authentication';
import { usePrevious } from '../../utils';
import AuthenticationContext from './AuthenticationContext';
import client from '@farfetch/blackout-core/helpers/client';
import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useUserAuthState from '../hooks/useUserAuthState';

export const CallbackNames = {
  OnUserSessionTerminated: 'onUserSessionTerminated',
};

/**
 * Provides support for transparent authentication to apps with access tokens by installing
 * an interceptor on the default @farfetch/blackout-core axios instance used by all clients. It also provides
 * functions to login/logout a user through the useAuthentication hook that must be called
 * in order for the interceptor to know when to use guest/authenticated user tokens
 * for subsequent requests. See the options below for more information on how you can configure this provider.
 *
 * @example <caption>Adding the AuthenticationProvider to your app</caption>
 *
 * import { AuthenticationProvider } from '@farfetch/blackout-react/authentication/contexts';
 *
 * const App = () => {
 * return (<AuthenticationProvider><MyComponent /></AuthenticationProvider>);
 * }
 * @param {object} [props] - Props to configure AuthenticationProvider.
 * @param {string} [props.baseURL] - The baseURL to apply to the axios instance in @farfetch/blackout-core.
 * @param {ReactNode} [props.children] - The children to be rendered by the provider.
 * @param {object} [props.headers] - An object containing header values to be added on each request.
 * @param {object} [props.callbacks] - An object containing callbacks for events that the provider will trigger.
 *
 * @returns {ReactElement} - The authentication context provider element wrapping the passed in children.
 */
function AuthenticationProvider({
  baseURL,
  children,
  headers,
  callbacks,
  ...tokenManagerOptions
}) {
  const [activeTokenData, setActiveTokenData] = useState(null);
  const baseURLRef = useRef(null);
  const headersRef = useRef(null);

  if (baseURLRef.current !== baseURL) {
    client.defaults.baseURL = baseURL;
    baseURLRef.current = baseURL;
  }

  if (headersRef.current !== headers) {
    client.defaults.headers.common = headers;
    headersRef.current = headers;
  }

  const invokeCallback = useCallback(
    (callbackName, ...args) => {
      /* istanbul ignore else */
      if (callbacks && typeof callbacks[callbackName] === 'function') {
        callbacks[callbackName](...args);
      }
    },
    [callbacks],
  );

  const tokenManager = useMemo(() => {
    const tokenManagerInstance = setAxiosAuthenticationInterceptors(
      client,
      tokenManagerOptions,
    );

    return tokenManagerInstance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authState = useUserAuthState({ activeTokenData, tokenManager });

  const clearTokenData = useCallback(() => {
    tokenManager.clearData();
  }, [tokenManager]);

  const setGuestTokensContext = useCallback(
    context => {
      tokenManager.setGuestTokensContext(context);
    },
    [tokenManager],
  );

  const resetGuestTokensContext = useCallback(() => {
    tokenManager.resetGuestTokensContext();
  }, [tokenManager]);

  const getCurrentGuestTokensContext = useCallback(() => {
    return tokenManager.getCurrentGuestTokensContext();
  }, [tokenManager]);

  const setGuestUserClaims = useCallback(
    async (claims, useCache) => {
      await tokenManager.setGuestTokensContext(claims);
      return tokenManager.getAccessToken(useCache);
    },
    [tokenManager],
  );

  const getAccessToken = useCallback(
    useCache => {
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

  const previousTokenManager = usePrevious(tokenManager);

  useEffect(() => {
    if (previousTokenManager === tokenManager) {
      return;
    }

    /* istanbul ignore if */
    if (previousTokenManager !== tokenManager && previousTokenManager) {
      previousTokenManager.setActiveTokenDataChangedEventListener(null);
      previousTokenManager.setUserSessionTerminatedEventListener(null);
    }

    /* istanbul ignore else */
    if (tokenManager) {
      tokenManager.setActiveTokenDataChangedEventListener(
        onActiveTokenChangedEventListener,
      );

      tokenManager.setUserSessionTerminatedEventListener(
        onUserSessionTerminatedEventListener,
      );

      /* istanbul ignore else */
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

  return (
    <AuthenticationContext.Provider
      value={{
        activeTokenData,
        clearTokenData,
        getAccessToken,
        getCurrentGuestTokensContext,
        resetGuestTokensContext,
        setGuestTokensContext,
        setGuestUserClaims,
        tokenManager, // Remove tokenManager when the post guestTokens endpoint returns the userId in the response
        ...authState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
