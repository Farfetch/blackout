import type { CheckoutAddress, Config, Metadata } from '../../types/index.js';
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
  metadata?: Metadata;
};

export type PatchCheckoutOrder = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PatchCheckoutOrderData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
