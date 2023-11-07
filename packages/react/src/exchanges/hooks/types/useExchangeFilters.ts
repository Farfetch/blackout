import type {
  ExchangeFilterItem,
  OrderItem,
  PostExchangeFilterData,
} from '@farfetch/blackout-client';

export type PostExchangeFilterDataHook = PostExchangeFilterData & {
  exchangeFilterItems: Array<ExchangeFilterItemWithOptionalUuid>;
};

export type ExchangeFilterItemWithOptionalUuid = Omit<
  ExchangeFilterItem,
  'orderItemUuid'
> & {
  orderItemUuid?: OrderItem['shippingOrderLineId'];
};
