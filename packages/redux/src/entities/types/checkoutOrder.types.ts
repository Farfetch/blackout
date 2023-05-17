import type {
  CheckoutOrder,
  CheckoutOrderItem,
} from '@farfetch/blackout-client';
import type { CheckoutOrderItemEntityDenormalized } from './checkoutOrderItem.types.js';

export type CheckoutOrderEntity = Omit<CheckoutOrder, 'items'> & {
  items: Array<CheckoutOrderItem['id']>;
};

export type CheckoutOrderEntityDenormalized = Omit<
  CheckoutOrderEntity,
  'items'
> & {
  items: CheckoutOrderItemEntityDenormalized[] | undefined;
};
