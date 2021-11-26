import type { Config } from '../../types';
import type { GetItemDeliveryProvisioningResponse } from '.';

export type GetItemDeliveryProvisioning = (
  id: number,
  deliveryBundleId: string,
  config?: Config,
) => Promise<GetItemDeliveryProvisioningResponse>;
