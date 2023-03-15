import type { Config } from '../../index.js';
import type { Exchange } from './exchange.types.js';
import type { ExchangeBookRequest } from './exchangeBookRequest.types.js';

export type PostExchangeBookRequestData = Omit<
  ExchangeBookRequest,
  'id' | 'status' | 'faults'
>;

export type PostExchangeBookRequest = (
  id: Exchange['id'],
  data: PostExchangeBookRequestData,
  config?: Config,
) => Promise<ExchangeBookRequest>;
