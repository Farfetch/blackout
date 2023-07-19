import type { AxiosResponse } from 'axios';
import type { CheckoutOrder, CheckoutOrderContext } from './index.js';
import type { Config, Controls } from '../../types/index.js';

export type PostCheckoutOrderContextResponse =
  AxiosResponse<CheckoutOrderContext> & Controls;

export type PostCheckoutOrderContextData = {
  context: string;
  value: string;
};

export type PostCheckoutOrderContext = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PostCheckoutOrderContextData,
  config?: Config,
) => Promise<PostCheckoutOrderContextResponse>;
