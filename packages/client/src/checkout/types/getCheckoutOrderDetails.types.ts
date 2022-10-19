import type { CheckoutOrder, CheckoutOrderDetails } from '.';
import type { Config } from '../../types';

export type GetCheckoutOrderDetails = (
  checkoutOrderId: CheckoutOrder['id'],
  config?: Config,
) => Promise<CheckoutOrderDetails>;
