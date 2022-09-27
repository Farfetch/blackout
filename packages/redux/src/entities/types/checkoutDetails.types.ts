import type {
  CheckoutOrder,
  CheckoutOrderDetails,
} from '@farfetch/blackout-client';

export type CheckoutDetailsEntity = Omit<
  CheckoutOrderDetails,
  'checkoutOrder'
> & {
  checkoutOrder: CheckoutOrder['id'];
};
