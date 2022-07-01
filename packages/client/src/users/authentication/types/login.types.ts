import type { Title } from '../../../users';
import type { User } from './user.types';
import type { UserGenderLogin } from '../../../types';

export enum UserStatusLogin {
  Inactive,
  Disabled,
  Locked,
  PendingResetPassword,
  PendingEmailConfirmation,
  Active,
  Unknown,
}

export type LoginResponse = Omit<
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
  gender: UserGenderLogin;
  title: Title | null;
  phoneNumber: string | null;
  segments: string[];
  status: UserStatusLogin;
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
