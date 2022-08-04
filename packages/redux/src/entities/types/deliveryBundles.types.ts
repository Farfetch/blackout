import type {
  DeliveryBundle,
  ItemDeliveryProvisioning,
} from '@farfetch/blackout-client';

export type DeliveryBundleEntity = DeliveryBundle & {
  itemsIds?: Array<string>;
  itemDeliveryProvisioning: Array<
    Record<ItemDeliveryProvisioning['itemId'], ItemDeliveryProvisioning>
  >;
};
