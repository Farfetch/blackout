import type { Config } from '../../types';
import type { GetCheckoutOrderDeliveryBundleUpgradeProvisioningResponse } from '.';

export type GetCheckoutOrderDeliveryBundleUpgradeProvisioning = (
  id: number,
  deliveryBundleId: string,
  upgradeId: string,
  config?: Config,
) => Promise<GetCheckoutOrderDeliveryBundleUpgradeProvisioningResponse>;
