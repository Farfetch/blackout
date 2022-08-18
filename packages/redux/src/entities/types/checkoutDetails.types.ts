import type {
  CheckoutOrder,
  CheckoutOrderDetails,
} from '@farfetch/blackout-client';

export type CheckoutDetailsEntity = CheckoutOrderDetails & {
  id: CheckoutOrder['id'];
};
