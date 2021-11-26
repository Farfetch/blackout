import type {
  DeliveryBundle,
  ItemDeliveryProvisioning,
} from '@farfetch/blackout-client/checkout/types';

export type DeliveryBundlesEntity = DeliveryBundle & {
  itemsIds?: Array<string>;
  itemDeliveryProvisioning: Array<
    Record<ItemDeliveryProvisioning['itemId'], ItemDeliveryProvisioning>
  >;
};
