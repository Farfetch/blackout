import type { Config } from '../../index.js';
import type { Exchange } from './exchange.types.js';
import type { ExchangeBookRequest } from './exchangeBookRequest.types.js';

export type GetExchangeBookRequest = (
  id: Exchange['id'],
  bookRequestId: ExchangeBookRequest['id'],
  config?: Config,
) => Promise<ExchangeBookRequest>;
