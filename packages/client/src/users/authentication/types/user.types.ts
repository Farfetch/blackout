import type { GuestUserNormalized } from './guestUser.types';
import type { UserGender } from '../../../types';

export type User = Omit<GuestUserNormalized, 'isGuest'> & {
  dateOfBirth?: string;
  email: string;
  gender?: UserGender;
  title?: {
    id: string;
    value: string;
  };
  name: string;
  phoneNumber?: string;
  segments?: string[];
  username: string;
  isGuest: false;
  lastName?: string;
  firstName?: string;
  personalShopperId?: number;
  createdDate?: string;
  updatedDate?: string;
};
