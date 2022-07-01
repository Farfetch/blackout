export type UserTokenResult = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
};

export type UserToken = {
  result: UserTokenResult | null;
  error: string | null;
  isLoading: boolean;
};

export type UserImpersonation = {
  result: string | null;
  error: string | null;
  isLoading: boolean;
};

export type UserData = {
  userToken: UserToken;
  userImpersonation: UserImpersonation;
};

export type AuthenticationState = {
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
  userToken: UserToken;
  userImpersonation: UserImpersonation;
};
