import type { CheckoutOrderDetails } from '.';
import type { Config } from '../../types';

export type GetCheckoutOrderDetails = (
  id: number,
  config?: Config,
) => Promise<CheckoutOrderDetails>;
