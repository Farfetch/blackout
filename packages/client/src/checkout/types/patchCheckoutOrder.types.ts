import type { CheckoutAddress, Config } from '../../types/index.js';
import type {
  CheckoutOrder,
  CheckoutOrderShippingOption,
  ClickAndCollect,
  GetCheckoutOrderResponse,
} from './index.js';

export type CheckoutOrderDeliveryBundleUpdate = {
  id: string;
  isSelected: boolean;
};

export type PatchCheckoutOrderData = {
  shippingAddress?: CheckoutAddress;
  billingAddress?: CheckoutAddress;
  clickAndCollect?: ClickAndCollect;
  shippingOption?: CheckoutOrderShippingOption;
  deliveryBundleUpdate?: CheckoutOrderDeliveryBundleUpdate;
  email?: string;
};

export type PatchCheckoutOrder = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PatchCheckoutOrderData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
