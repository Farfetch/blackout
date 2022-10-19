import type { CheckoutAddress, Config } from '../../types';
import type {
  CheckoutOrder,
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
  checkoutOrderId: CheckoutOrder['id'],
  data: PatchCheckoutOrderData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
