import { createContext } from 'react';
import type {
  AuthenticationTokenManager,
  LoginData,
  PostTokenResponse,
  TokenContext,
  UserToken,
} from '@farfetch/blackout-client';
import type { ErrorData } from '../hooks/useUserAuthState';
export interface AuthenticationContextProps {
  activeTokenData?: UserToken | null;
  clearTokenData?: () => void;
  getAccessToken?: (useCache: boolean) => Promise<string | undefined>;
  getCurrentGuestTokensContext?: () => TokenContext;
  resetGuestTokensContext?: () => void;
  setGuestTokensContext?: (context: TokenContext) => void;
  setGuestUserClaims?: (
    claims: TokenContext,
    useCache: boolean,
  ) => Promise<string | undefined>;
  tokenManager?: AuthenticationTokenManager;
  login?: (data: LoginData) => Promise<PostTokenResponse>;
  logout?: () => Promise<void>;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  errorData?: ErrorData | null;
}

export default createContext<AuthenticationContextProps>(
  {} as AuthenticationContextProps,
);
