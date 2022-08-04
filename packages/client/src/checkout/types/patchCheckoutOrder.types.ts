import type { CheckoutAddress, Config } from '../../types';
import type {
  ClickAndCollect,
  GetCheckoutOrderResponse,
  ShippingOption,
} from '.';

export type DeliveryBundleUpdate = {
  id: string;
  isSelected: boolean;
};

export type PatchCheckoutOrderData = {
  shippingAddress?: CheckoutAddress;
  billingAddress?: CheckoutAddress;
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
