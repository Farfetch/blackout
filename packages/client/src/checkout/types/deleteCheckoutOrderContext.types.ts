import type { CheckoutOrder, CheckoutOrderContext } from './index.js';
import type { Config } from '../../types/index.js';
import type { HypermediaLink } from '../../index.js';

export type DeleteCheckoutOrderContextResponse = {
  '@controls'?: {
    [key: string]: HypermediaLink;
  };
};

export type DeleteCheckoutOrderContext = (
  checkoutOrderId: CheckoutOrder['id'],
  contextId: CheckoutOrderContext['id'],
  config?: Config,
) => Promise<DeleteCheckoutOrderContextResponse>;
