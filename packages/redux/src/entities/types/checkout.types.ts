import type {
  DeliveryBundle,
  GetCheckoutOrderResponse,
} from '@farfetch/blackout-client';

export type CheckoutEntity = Omit<
  GetCheckoutOrderResponse,
  'deliveryBundles'
> & {
  deliveryBundles?: Array<DeliveryBundle['id']>;
};
