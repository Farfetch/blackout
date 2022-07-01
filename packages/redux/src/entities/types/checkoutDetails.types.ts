import type {
  CheckoutOrder,
  GetCheckoutOrderDetailsResponse,
} from '@farfetch/blackout-client';

export type CheckoutDetailsEntity = GetCheckoutOrderDetailsResponse & {
  id: CheckoutOrder['id'];
};
