import {
  changePassword as changePasswordAction,
  fetchUser as fetchUserAction,
  getAuthenticationError,
  getChangePasswordError,
  getLoginError,
  getLogoutError,
  getRecoverPasswordError,
  getRegisterError,
  getResetPasswordError,
  getUser,
  getUserError,
  isAuthenticated as isAuthenticatedSelector,
  isChangePasswordLoading as isChangePasswordLoadingSelector,
  isLoginLoading as isLoginLoadingSelector,
  isLogoutLoading as isLogoutLoadingSelector,
  isRecoverPasswordLoading as isRecoverPasswordLoadingSelector,
  isRegisterLoading as isRegisterLoadingSelector,
  isResetPasswordLoading as isResetPasswordLoadingSelector,
  isUserLoading as isUserLoadingSelector,
  login as loginAction,
  logout as logoutAction,
  recoverPassword as recoverPasswordAction,
  register as registerAction,
  resetPassword as resetPasswordAction,
  setUser as setUserAction,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type {
  Config,
  PostPasswordChangeData,
  PutUserData,
} from '@farfetch/blackout-client';
import type { UseUserOptions } from './types';

function useUser(options: UseUserOptions = {}) {
  const { enableAutoFetch = false, fetchConfig } = options;
  // Selectors
  const user = useSelector(getUser);
  const isUserLoading = useSelector(isUserLoadingSelector);
  const isRegisterLoading = useSelector(isRegisterLoadingSelector);
  const isLoginLoading = useSelector(isLoginLoadingSelector);
  const isLogoutLoading = useSelector(isLogoutLoadingSelector);
  const isChangePasswordLoading = useSelector(isChangePasswordLoadingSelector);
  const isRecoverPasswordLoading = useSelector(
    isRecoverPasswordLoadingSelector,
  );
  const isResetPasswordLoading = useSelector(isResetPasswordLoadingSelector);
  const authenticationError = useSelector(getAuthenticationError);
  const userError = useSelector(getUserError);
  const registerError = useSelector(getRegisterError);
  const loginError = useSelector(getLoginError);
  const logoutError = useSelector(getLogoutError);
  const changePasswordError = useSelector(getChangePasswordError);
  const recoverPasswordError = useSelector(getRecoverPasswordError);
  const resetPasswordError = useSelector(getResetPasswordError);
  // Actions
  const login = useAction(loginAction);
  const register = useAction(registerAction);
  const changePasswordActionDispatcher = useAction(changePasswordAction);
  const resetPassword = useAction(resetPasswordAction);
  const recoverPassword = useAction(recoverPasswordAction);
  const fetch = useAction(fetchUserAction);
  const updateActionDispatcher = useAction(setUserAction);
  const logout = useAction(logoutAction);
  const userId = user?.id;
  const username = user?.username;
  // Custom logic
  const isFetched = !!user && !!user.id;
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const changePassword = useCallback(
    (
      data: Omit<PostPasswordChangeData, 'userId' | 'username'>,
      config?: Config,
    ) => {
      if (!isAuthenticated) {
        return Promise.reject(
          new Error('Only authenticated users can perform this operation'),
        );
      }

      // Both user id and username are guaranteed to be defined if isAuthenticated is true.
      const fullPostData: PostPasswordChangeData = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: userId!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        username: username!,
        ...data,
      };

      return changePasswordActionDispatcher(fullPostData, config);
    },
    [changePasswordActionDispatcher, isAuthenticated, userId, username],
  );

  const update = useCallback(
    (data: PutUserData, config?: Config) => {
      if (!isAuthenticated) {
        return Promise.reject(
          new Error('Only authenticated users can perform this operation'),
        );
      }

      // User id is guaranteed to be defined if isAuthenticated is true.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return updateActionDispatcher(userId!, data, config);
    },
    [isAuthenticated, updateActionDispatcher, userId],
  );

  useEffect(() => {
    if (enableAutoFetch && !isUserLoading && !userError) {
      fetch(fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isUserLoading, userError]);

  return {
    actions: {
      login,
      register,
      changePassword,
      resetPassword,
      recoverPassword,
      fetch,
      update,
      logout,
    },
    isFetched,
    isUserLoading,
    isRegisterLoading,
    isLoginLoading,
    isLogoutLoading,
    isChangePasswordLoading,
    isRecoverPasswordLoading,
    isResetPasswordLoading,
    authenticationError,
    userError,
    registerError,
    loginError,
    logoutError,
    changePasswordError,
    recoverPasswordError,
    resetPasswordError,
    data: user,
  };
}

export default useUser;
