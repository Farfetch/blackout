import type { Config, IndexSignature } from '../../types';
import type { PaymentTokens } from '.';

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
