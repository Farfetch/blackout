import type {
  CheckoutOrder,
  CollectPoint,
  Item,
} from '@farfetch/blackout-client/checkout/types';

export type CheckoutOrderEntity = Omit<CheckoutOrder, 'items'> & {
  items: Array<Item['id']>;
  collectpoints: Array<CollectPoint>;
};
