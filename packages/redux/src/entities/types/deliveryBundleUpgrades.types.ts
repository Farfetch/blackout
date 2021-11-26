import type { GetDeliveryBundleUpgradesResponse } from '@farfetch/blackout-client/checkout/types';

export type DeliveryBundleUpgradesEntity = {
  [deliveryBundleId: string]: GetDeliveryBundleUpgradesResponse;
};
