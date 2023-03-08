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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseUserOptions } from './types/index.js';

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
  const changePassword = useAction(changePasswordAction);
  const resetPassword = useAction(resetPasswordAction);
  const recoverPassword = useAction(recoverPasswordAction);
  const fetch = useAction(fetchUserAction);
  const update = useAction(setUserAction);
  const logout = useAction(logoutAction);
  // Custom logic
  const isFetched = !!user && !!user.id;

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
