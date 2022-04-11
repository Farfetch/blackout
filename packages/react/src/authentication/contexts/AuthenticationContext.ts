import { createContext } from 'react';
import type { ErrorData } from '../hooks/useUserAuthState';
import type {
  LoginData,
  PostTokenResponse,
} from '@farfetch/blackout-client/authentication/types';
import type { TokenContext } from '@farfetch/blackout-client/helpers/client/interceptors/authentication/token-providers/types/TokenContext.types';
import type AxiosAuthenticationTokenManager from '@farfetch/blackout-client/helpers/client/interceptors/authentication';
import type UserToken from '@farfetch/blackout-client/helpers/client/interceptors/authentication/types/UserToken.types';

export interface ContextProps {
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
  tokenManager?: AxiosAuthenticationTokenManager;
  login?: (data: LoginData) => Promise<PostTokenResponse>;
  logout?: () => Promise<void>;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  errorData?: ErrorData | null;
}

export default createContext<ContextProps>({} as ContextProps);
