import type {
  GuestUser,
  GuestUserNormalized,
  User,
  UserContact,
  UserPreference,
} from '@farfetch/blackout-client';
import type {
  UserCreditEntity,
  UserCreditMovementsEntity,
} from './credit.types';

export type UserEntity = (User | GuestUserNormalized | GuestUser) & {
  credit?: UserCreditEntity;
  creditMovements?: UserCreditMovementsEntity;
  preferences?: Array<UserPreference['code']>;
  contacts?: Array<UserContact['id']>;
};
