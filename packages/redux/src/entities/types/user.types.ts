import type {
  User,
  UserContact,
  UserPreference,
} from '@farfetch/blackout-client';
import type {
  UserCreditEntity,
  UserCreditMovementsEntity,
} from './credit.types.js';

export type UserEntity = User & {
  credits?: UserCreditEntity;
  creditMovements?: UserCreditMovementsEntity;
  preferences?: Array<UserPreference['code']>;
  contacts?: Array<UserContact['id']>;
};
