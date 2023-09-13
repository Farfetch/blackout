import {
  type Config,
  type PostAccountLinkData,
  type PostSocialLoginData,
} from '@farfetch/blackout-client';
import {
  createAccountLink as createAccountLinkAction,
  socialLogin as socialLoginReduxAction,
} from '@farfetch/blackout-redux';
import { useCallback } from 'react';
import useAction from '../../helpers/useAction.js';

function useSocialLogin() {
  const socialLoginAction = useAction(socialLoginReduxAction);
  const accountLink = useAction(createAccountLinkAction);
  const socialLogin = useCallback(
    async (data: PostSocialLoginData, config?: Config) => {
      if (!data) {
        return Promise.reject(new Error('No data was specified.'));
      }

      return await socialLoginAction(data, config);
    },
    [socialLoginAction],
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
      socialLogin,
      createAccountLink,
    },
  };
}

export default useSocialLogin;
