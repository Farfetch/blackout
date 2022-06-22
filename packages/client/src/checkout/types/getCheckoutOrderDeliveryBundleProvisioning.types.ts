import type { Config } from '../../types';
import type { GetCheckoutOrderDeliveryBundleProvisioningResponse } from '.';

export type GetCheckoutOrderDeliveryBundleProvisioning = (
  id: number,
  deliveryBundleId: string,
  config?: Config,
) => Promise<GetCheckoutOrderDeliveryBundleProvisioningResponse>;
