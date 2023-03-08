import type { Config, IndexSignature } from '../../types/index.js';
import type { PaymentTokens } from './index.js';

export type GetPaymentTokensQuery = IndexSignature<
  number | boolean | undefined
> & {
  orderId?: number;
  showExpiredCards?: boolean;
};

export type GetPaymentTokens = (
  query?: GetPaymentTokensQuery,
  config?: Config,
) => Promise<PaymentTokens>;
