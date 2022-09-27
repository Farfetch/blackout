import type { Return } from '@farfetch/blackout-client';

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
