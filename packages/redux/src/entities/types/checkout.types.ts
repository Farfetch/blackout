import type {
  DeliveryBundle,
  GetCheckoutResponse,
} from '@farfetch/blackout-client/checkout/types';

export type CheckoutEntity = Omit<GetCheckoutResponse, 'deliveryBundles'> & {
  deliveryBundles?: Array<DeliveryBundle['id']>;
};
