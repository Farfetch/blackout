import type {
  Return,
  ReturnItem,
} from '@farfetch/blackout-client/returns/types';

export type NormalizedReturns = Omit<Return, 'items'> & {
  items: Array<ReturnItem['Id']>;
};
