import { createContext } from 'react';
import type { Error } from './UserProfileProvider';
import type { GuestUserNormalized, User } from '@farfetch/blackout-client';

export interface UserProfileContextProps {
  loadProfile: () => Promise<User | GuestUserNormalized> | null;
  isLoading: boolean;
  error: Error | null;
  userData: User | GuestUserNormalized | null;
}

export default createContext<UserProfileContextProps>(
  {} as UserProfileContextProps,
);
