import type { CheckoutOrder } from '../index.js';
import type { Config } from '../../types/index.js';
import type { PaymentMethods } from '../../payments/types/index.js';

export type GetCheckoutOrderPaymentMethods = (
  checkoutOrderId: CheckoutOrder['id'],
  config?: Config,
) => Promise<PaymentMethods>;
