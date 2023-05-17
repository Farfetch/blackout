import type { Title } from '../../../users/index.js';
import type { User } from './user.types.js';
import type { UserGenderLegacy } from '../../../types/index.js';

export enum UserStatusLegacy {
  Inactive,
  Disabled,
  Locked,
  PendingResetPassword,
  PendingEmailConfirmation,
  Active,
  Unknown,
}

export type UserLegacy = Omit<
  User,
  | 'dateOfBirth'
  | 'gender'
  | 'title'
  | 'phoneNumber'
  | 'segments'
  | 'status'
  | 'lastName'
  | 'firstName'
  | 'countryCode'
  | 'receiveNewsletters'
  | 'personalShopperId'
  | 'createdDate'
  | 'updatedDate'
> & {
  dateOfBirth: string | null;
  gender: UserGenderLegacy;
  title: Title | null;
  phoneNumber: string | null;
  segments: string[];
  status: UserStatusLegacy;
  lastName: string | null;
  firstName: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  loyalty: {
    membershipId: string;
    errorCode: string;
    errorMessage: string;
    succeeded: boolean;
  } | null;
};
