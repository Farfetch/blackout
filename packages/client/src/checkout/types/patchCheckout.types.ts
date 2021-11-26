import type { Config } from '../../types';
import type { FlatAddress, GetCheckoutResponse, ShippingOption } from '.';

export type ClickAndCollect = {
  collectPointId: number;
  merchantLocationId: number;
};

export type DeliveryBundleUpdate = {
  id: string;
  isSelected: boolean;
};

export type PatchCheckoutData = {
  shippingAddress?: FlatAddress;
  billingAddress?: FlatAddress;
  clickAndCollect?: ClickAndCollect;
  shippingOption?: ShippingOption;
  deliveryBundleUpdate?: DeliveryBundleUpdate;
  email?: string;
};

export type PatchCheckout = (
  id: number,
  data: PatchCheckoutData,
  config?: Config,
) => Promise<GetCheckoutResponse>;
