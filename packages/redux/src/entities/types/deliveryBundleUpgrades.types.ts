import type { GetCheckoutOrderDeliveryBundleUpgradesResponse } from '@farfetch/blackout-client';

export type DeliveryBundleUpgradesEntity = {
  [deliveryBundleId: string]: GetCheckoutOrderDeliveryBundleUpgradesResponse;
};
