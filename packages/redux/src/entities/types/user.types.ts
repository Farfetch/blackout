import type {
  User,
  UserContact,
  UserLegacy,
  UserPreference,
} from '@farfetch/blackout-client';
import type {
  UserCreditEntity,
  UserCreditMovementsEntity,
} from './credit.types.js';

export type UserEntity = (User | UserLegacy) & {
  credits?: Array<UserCreditEntity>;
  creditMovements?: UserCreditMovementsEntity;
  preferences?: Array<UserPreference['code']>;
  contacts?: Array<UserContact['id']>;
};
