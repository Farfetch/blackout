import type { GuestUser } from './guestUser.types';
import type { UserGender } from '../../../types';

export type User = Omit<GuestUser, 'isGuest'> & {
  dateOfBirth?: string;
  email?: string;
  gender?: UserGender;
  title?: {
    id: string;
    value: string;
  };
  name?: string;
  phoneNumber?: string;
  segments?: string[];
  username?: string;
  // isGuest needs to be boolean because the User type
  // will be used for the response of the users/me request
  // which can be a Guest or a Registered user.
  isGuest: boolean;
  lastName?: string;
  firstName?: string;
  personalShopperId?: number;
  createdDate?: string;
  updatedDate?: string;
};
