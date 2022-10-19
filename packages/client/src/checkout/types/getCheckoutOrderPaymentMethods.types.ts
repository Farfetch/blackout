import type { CheckoutOrder } from '..';
import type { Config } from '../../types';
import type { PaymentMethods } from '../../payments/types';

export type GetCheckoutOrderPaymentMethods = (
  checkoutOrderId: CheckoutOrder['id'],
  config?: Config,
) => Promise<PaymentMethods>;
