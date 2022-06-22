import type { Config } from '../../types';
import type { FlatAddress, GetCheckoutOrderResponse, ShippingOption } from '.';

export type ClickAndCollect = {
  collectPointId: number;
  merchantLocationId: number;
};

export type DeliveryBundleUpdate = {
  id: string;
  isSelected: boolean;
};

export type PatchCheckoutOrderData = {
  shippingAddress?: FlatAddress;
  billingAddress?: FlatAddress;
  clickAndCollect?: ClickAndCollect;
  shippingOption?: ShippingOption;
  deliveryBundleUpdate?: DeliveryBundleUpdate;
  email?: string;
};

export type PatchCheckoutOrder = (
  id: number,
  data: PatchCheckoutOrderData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
