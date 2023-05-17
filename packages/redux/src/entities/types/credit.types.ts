import type {
  PagedResponse,
  UserCredit,
  UserCreditMovement,
} from '@farfetch/blackout-client';

export type UserCreditEntity = UserCredit;
export type UserCreditMovementsEntity = PagedResponse<UserCreditMovement>;
