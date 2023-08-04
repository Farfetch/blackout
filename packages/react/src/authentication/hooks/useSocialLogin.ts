import {
  type Config,
  type PostAccountLinkData,
  type PostSocialLoginData,
} from '@farfetch/blackout-client';
import {
  createAccountLink as createAccountLinkAction,
  socialLogin as socialLoginAction,
} from '@farfetch/blackout-redux';
import { useCallback } from 'react';
import useAction from '../../helpers/useAction.js';

function useSocialLogin() {
  const socialLogin = useAction(socialLoginAction);
  const accountLink = useAction(createAccountLinkAction);
  const login = useCallback(
    async (data: PostSocialLoginData, config?: Config) => {
      if (!data) {
        return Promise.reject(new Error('No data was specified.'));
      }

      return await socialLogin(data, config);
    },
    [socialLogin],
  );

  const createAccountLink = useCallback(
    async (data: PostAccountLinkData, config?: Config) => {
      if (!data) {
        return Promise.reject(new Error('No data was specified.'));
      }

      return await accountLink(data, config);
    },
    [accountLink],
  );

  return {
    actions: {
      login,
      createAccountLink,
    },
  };
}

export default useSocialLogin;
