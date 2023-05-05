import type { AxiosResponse } from 'axios';
import type { CheckoutOrder, CheckoutOrderContext } from './index.js';
import type { Config } from '../../types/index.js';
import type { HypermediaLink } from '../../index.js';

export type PostCheckoutOrderContextResponse =
  AxiosResponse<CheckoutOrderContext> & {
    '@controls'?: {
      [key: string]: HypermediaLink;
    };
  };

export type PostCheckoutOrderContextData = {
  context: string;
  value: string;
};

export type PostCheckoutOrderContext = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PostCheckoutOrderContextData,
  config?: Config,
) => Promise<PostCheckoutOrderContextResponse>;
