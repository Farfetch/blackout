import type { CheckoutAddress, Config } from '../../types/index.js';
import type { CheckoutSession } from './checkoutSession.types.js';
import type { ClickAndCollect } from './checkoutOrder.types.js';

export type PatchCheckoutSessionData = {
  shippingAddress?: CheckoutAddress;
  billingAddress?: CheckoutAddress;
  clickAndCollect?: ClickAndCollect;
  email?: string;
};

export type PatchCheckoutSession = (
  checkoutSessionId: CheckoutSession['id'],
  data: PatchCheckoutSessionData,
  config?: Config,
) => Promise<CheckoutSession>;
