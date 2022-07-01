import type {
  CheckoutOrder,
  CheckoutOrderItem,
  CollectPoint,
} from '@farfetch/blackout-client';

export type CheckoutOrderEntity = Omit<CheckoutOrder, 'items'> & {
  items: Array<CheckoutOrderItem['id']>;
  collectpoints: Array<CollectPoint>;
};
