import type {
  CheckoutOrder,
  CheckoutOrderItem,
  CollectPoint,
} from '@farfetch/blackout-client';
import type { CheckoutOrderItemEntityDenormalized } from './checkoutOrderItem.types';

export type CheckoutOrderEntity = Omit<CheckoutOrder, 'items'> & {
  items: Array<CheckoutOrderItem['id']>;
  collectpoints?: Array<CollectPoint>;
};

export type CheckoutOrderEntityDenormalized = Omit<
  CheckoutOrderEntity,
  'items'
> & {
  items: CheckoutOrderItemEntityDenormalized[] | undefined;
};
