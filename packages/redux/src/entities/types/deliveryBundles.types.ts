import type {
  CheckoutOrderDeliveryBundle,
  CheckoutOrderItemDeliveryProvisioning,
} from '@farfetch/blackout-client';

export type CheckoutOrderDeliveryBundleEntity = CheckoutOrderDeliveryBundle & {
  itemsIds?: Array<string>;
  itemDeliveryProvisioning: Array<
    Record<
      CheckoutOrderItemDeliveryProvisioning['itemId'],
      CheckoutOrderItemDeliveryProvisioning
    >
  >;
};
