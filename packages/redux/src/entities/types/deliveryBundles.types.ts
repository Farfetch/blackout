import type {
  DeliveryBundle,
  ItemDeliveryProvisioning,
} from '@farfetch/blackout-client';

export type DeliveryBundlesEntity = DeliveryBundle & {
  itemsIds?: Array<string>;
  itemDeliveryProvisioning: Array<
    Record<ItemDeliveryProvisioning['itemId'], ItemDeliveryProvisioning>
  >;
};
