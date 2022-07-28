import { createContext } from 'react';
import type { Error } from './UserProfileProvider';
import type { GuestUser, User } from '@farfetch/blackout-client';

export interface UserProfileContextProps {
  loadProfile: () => Promise<User | GuestUser> | null;
  isLoading: boolean;
  error: Error | null;
  userData: User | GuestUser | null;
}

export default createContext<UserProfileContextProps>(
  {} as UserProfileContextProps,
);
