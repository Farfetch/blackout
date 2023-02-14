import type { Return, UserReturns } from '@farfetch/blackout-client';

export type ReturnEntity = Omit<
  Return,
  | 'items'
  | 'availableDates'
  | 'pickupSchedule'
  | 'createdDate'
  | 'maximumDateForPickup'
> & {
  items: Array<Return['id']>;
  availableDates: number[];
  pickupSchedule?: {
    start: number;
    end: number;
  };
  createdDate: number;
  maximumDateForPickup?: number;
};

export type ReturnEntityDenormalized = Omit<ReturnEntity, 'items'> & {
  items: Return['items'];
};

export type UserReturnsResultNormalized = Omit<UserReturns, 'entries'> & {
  entries: Array<Return['id']>;
};

export type UserReturnsResultDenormalized = Omit<
  UserReturnsResultNormalized,
  'entries'
> & {
  entries: Array<ReturnEntityDenormalized>;
};
