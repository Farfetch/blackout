import type {
  CheckoutOrderDeliveryBundle,
  GetCheckoutOrderResponse,
} from '@farfetch/blackout-client';

export type CheckoutEntity = Omit<
  GetCheckoutOrderResponse,
  'checkoutOrder' | 'deliveryBundles'
> & {
  checkoutOrder: GetCheckoutOrderResponse['id'];
  deliveryBundles?: Array<CheckoutOrderDeliveryBundle['id']>;
};
