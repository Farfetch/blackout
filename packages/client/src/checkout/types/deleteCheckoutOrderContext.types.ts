import type { CheckoutOrder, CheckoutOrderContext } from './index.js';
import type { Config } from '../../types/index.js';
import type { Controls } from '../../types/common/controls.types.js';

export type DeleteCheckoutOrderContext = (
  checkoutOrderId: CheckoutOrder['id'],
  contextId: CheckoutOrderContext['id'],
  config?: Config,
) => Promise<number | Controls>;
