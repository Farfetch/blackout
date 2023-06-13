import type { Config } from '../../index.js';
import type { ExchangeFilter } from './exchangeFilter.types.js';

export type PostExchangeFilterData = Omit<
  ExchangeFilter,
  'id' | 'logicOperator' | 'filters'
>;

export type PostExchangeFilter = (
  data: PostExchangeFilterData,
  config?: Config,
) => Promise<ExchangeFilter>;
