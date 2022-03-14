import type { CombinedState } from 'redux';

type userTokenResult = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
};

type userToken = {
  result: userTokenResult | null;
  error: string | null;
  isLoading: boolean;
};

type userImpersonation = {
  result: string | null;
  error: string | null;
  isLoading: boolean;
};

export type UserData = {
  userToken: userToken;
  userImpersonation: userImpersonation;
};

export type Authentication = {
  login: {
    error: string | null;
    isLoading: boolean;
  };
  logout: {
    error: string | null;
    isLoading: boolean;
  };
  register: {
    error: string | null;
    isLoading: boolean;
  };
  changePassword: {
    error: string | null;
    isLoading: boolean;
  };
  recoverPassword: {
    error: string | null;
    isLoading: boolean;
  };
  resetPassword: {
    error: string | null;
    isLoading: boolean;
  };
  validateEmail: {
    error: string | null;
    isLoading: boolean;
  };
  refreshEmailToken: {
    error: string | null;
    isLoading: boolean;
  };
  userToken: userToken;
  userImpersonation: userImpersonation;
};

export type State = Authentication &
  CombinedState<{
    error: string | null;
    id: string;
    isLoading: boolean;
  }>;
