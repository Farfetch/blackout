import type { BlackoutError, Token } from '@farfetch/blackout-client';

export type TokenState = {
  result: Token | null;
  error: BlackoutError | null;
  isLoading: boolean;
};

export type AuthenticationState = {
  login: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  logout: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  register: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  changePassword: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  recoverPassword: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  resetPassword: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  validateEmail: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  refreshEmailToken: {
    error: BlackoutError | null;
    isLoading: boolean;
  };
  token: TokenState;
};
