import { createContext } from 'react';
import type { Error } from './UserProfileProvider';
import type { GetUserResponse } from '@farfetch/blackout-client/users/types';

interface ContextProps {
  loadProfile: () => Promise<GetUserResponse> | null;
  isLoading: boolean;
  error: Error | null;
  userData: GetUserResponse | null;
}

export default createContext<ContextProps>({} as ContextProps);
