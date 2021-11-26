import type {
  CheckoutOrder,
  GetCheckoutDetailsResponse,
} from '@farfetch/blackout-client/checkout/types';

export type CheckoutDetailsEntity = GetCheckoutDetailsResponse & {
  id: CheckoutOrder['id'];
};
