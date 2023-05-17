import type { Config } from '../../index.js';
import type {
  Exchange,
  ExchangeGroup,
  ExchangeReturnItem,
} from './exchange.types.js';

export type PostExchangeGroupsData = Pick<ExchangeGroup, 'exchangeItems'> & {
  exchangeReturnItems: Array<Omit<ExchangeReturnItem, 'id'>>;
};

export type PostExchangeData = {
  exchangeGroups: Array<PostExchangeGroupsData>;
};

export type PostExchange = (
  data: PostExchangeData,
  config?: Config,
) => Promise<Exchange>;
