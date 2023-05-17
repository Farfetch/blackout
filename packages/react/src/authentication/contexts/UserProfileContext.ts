import { createContext } from 'react';
import type { BlackoutError, GuestUser, User } from '@farfetch/blackout-client';

export type UserProfileContextProps = {
  loadProfile: () => Promise<User | GuestUser> | null;
  isLoading: boolean;
  error: BlackoutError | null;
  userData: User | GuestUser | null;
};

export default createContext<UserProfileContextProps>(
  {} as UserProfileContextProps,
);
