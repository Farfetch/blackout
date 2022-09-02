import type { Return } from '@farfetch/blackout-client';

export type ReturnEntity = Omit<
  Return,
  'items' | 'availableDates' | 'pickupSchedule'
> & {
  items: Array<Return['id']>;
  availableDates: number[];
  pickupSchedule?: {
    start: number;
    end: number;
  };
};
