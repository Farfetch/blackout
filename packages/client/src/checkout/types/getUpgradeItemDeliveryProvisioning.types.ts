import type { Config } from '../../types';
import type { GetItemDeliveryProvisioningResponse } from '.';

export type GetUpgradeItemDeliveryProvisioning = (
  id: number,
  deliveryBundleId: string,
  upgradeId: string,
  config?: Config,
) => Promise<GetItemDeliveryProvisioningResponse>;
